import React, { useCallback, useState } from 'react';
import {
  Stack,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
} from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import type { TEnquiry } from '#domain/models/TEnquiry';

type ContactFormProps = {
  onSubmit: (data: TEnquiry) => Promise<void> | void;
  isSubmitting?: boolean;
};

const MAX_FILE_SIZE = 1024 * 1024;

const ContactForm = ({ onSubmit, isSubmitting }: ContactFormProps) => {
  const [company, setCompany] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [pickupId, setPickupId] = useState('');
  const [message, setMessage] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const user = localStorage.getItem('user');
  const role = user ? JSON.parse(user) : 'guest';

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

    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to convert file to base64'));
      }
    };

    reader.onerror = () => {
      reject(new Error('File reading has failed'));
    };
  });

  const handleSubmit = async () => {
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
      company,
      name,
      email,
      phone,
      pickupId,
      message,
      file: base64File,
      role: role.value?.role ?? 'guest',
      status: 'pending',
    };

    try {
      await onSubmit(enquiry);

      setCompany('');
      setName('');
      setEmail('');
      setPhone('');
      setPickupId('');
      setMessage('');
      setFile(null);
      setError(null);
    } catch (err) {
      setError('Submission failed, please try again.');
    }
  };

  return (
    <Stack spacing={3}>
      {error && <Alert severity="error">{error}</Alert>}
      <TextField
        fullWidth
        label="Company Name"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      <TextField
        fullWidth
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        fullWidth
        label="Email Address"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        fullWidth
        label="Phone Number"
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <TextField
        fullWidth
        label="Pickup ID"
        value={pickupId}
        onChange={(e) => setPickupId(e.target.value)}
      />
      <TextField
        fullWidth
        label="Message"
        multiline
        rows={4}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
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
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Stack>
    </Stack>
  );
};

export default ContactForm;
