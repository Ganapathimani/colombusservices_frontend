import React, { useCallback, useState } from 'react';
import {
  Stack,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useDropzone } from 'react-dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import type { TEnquiry } from '#domain/models/TEnquiry';

type ContactFormProps = {
  onSubmit: (data: TEnquiry) => Promise<void> | void;
  isSubmitting?: boolean;
};

const MAX_FILE_SIZE = 1024 * 1024;

type ContactInputs = {
  company: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  file?: string | null;
};

const ContactForm = ({ onSubmit, isSubmitting }: ContactFormProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const user = localStorage.getItem('user');
  const role = user ? JSON.parse(user) : 'guest';

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ContactInputs>({
    defaultValues: {
      company: '',
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const f = acceptedFiles[0];
    if (f && f.size > MAX_FILE_SIZE) {
      setError('File size must be less than 1 MB');
      setFile(null);
      return;
    }
    setError(null);
    setFile(f);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false,
  });

  const fileToBase64 = (f: File): Promise<string> => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(f);
    reader.onload = () => (typeof reader.result === 'string'
      ? resolve(reader.result)
      : reject(new Error('Failed to convert file to base64')));
    reader.onerror = () => reject(new Error('File reading has failed'));
  });

  const handleFormSubmit = async (data: ContactInputs) => {
    if (file && file.size > MAX_FILE_SIZE) {
      setError('File size must be less than 1 MB');
      return;
    }

    let base64File: string | null = null;
    if (file) {
      try {
        base64File = await fileToBase64(file);
      } catch {
        setError('Failed to process the file');
        return;
      }
    }

    const enquiry: TEnquiry = {
      ...data,
      file: base64File,
      role: role.value?.role ?? 'guest',
      status: 'pending',
    };

    try {
      await onSubmit(enquiry);
      reset();
      setFile(null);
      setError(null);
    } catch {
      setError('Submission failed, please try again.');
    }
  };

  return (
    <Stack spacing={3}>
      {error && <Alert severity="error">{error}</Alert>}

      <Controller
        name="company"
        control={control}
        rules={{ required: 'Company name is required' }}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            label="Company Name"
            error={!!errors.company}
            helperText={errors.company?.message}
          />
        )}
      />

      <Controller
        name="name"
        control={control}
        rules={{ required: 'Name is required' }}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            label="Name"
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        )}
      />

      <Controller
        name="email"
        control={control}
        rules={{
          required: 'Email is required',
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Please enter a valid email address',
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            label="Email Address"
            type="email"
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        )}
      />

      <Controller
        name="phone"
        control={control}
        rules={{
          required: 'Phone number is required',
          pattern: {
            value: /^[0-9]{10}$/,
            message: 'Please enter a valid 10-digit phone number',
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            label="Phone Number"
            type="tel"
            error={!!errors.phone}
            helperText={errors.phone?.message}
          />
        )}
      />

      <Controller
        name="message"
        control={control}
        rules={{ required: 'Message is required' }}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            label="Message"
            multiline
            rows={4}
            error={!!errors.message}
            helperText={errors.message?.message}
          />
        )}
      />

      <Paper
        {...getRootProps()}
        sx={{
          p: 3,
          textAlign: 'center',
          border: '2px dashed #14532D',
          borderRadius: 2,
          bgcolor: isDragActive ? '#f0fdf4' : 'transparent',
          cursor: 'pointer',
        }}
      >
        <input {...getInputProps()} />
        <Typography variant="body1" color={isDragActive ? 'green' : 'text.secondary'}>
          <FontAwesomeIcon icon={faUpload} />
          {' '}
          Drag & drop an image here, or click to select
        </Typography>
        {file && (
          <Stack mt={2} spacing={1}>
            <Typography variant="body2">{file.name}</Typography>
            <Typography variant="caption" color="text.secondary">
              {(file.size / 1024).toFixed(2)}
              {' '}
              KB
            </Typography>
          </Stack>
        )}
      </Paper>

      <Stack direction="row" justifyContent="flex-end">
        <Button
          variant="contained"
          size="large"
          disabled={isSubmitting}
          sx={{
            bgcolor: '#14532D',
            '&:hover': { bgcolor: '#15803d' },
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: 2,
            px: 4,
            py: 1.2,
            boxShadow: '0px 4px 14px rgba(20,83,45,0.3)',
          }}
          onClick={handleSubmit(handleFormSubmit)}
        >
          Submit
        </Button>
      </Stack>
    </Stack>
  );
};

export default ContactForm;
