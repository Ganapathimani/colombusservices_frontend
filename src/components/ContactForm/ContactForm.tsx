import React, { useCallback, useState } from 'react';
import {
  Stack,
  TextField,
  MenuItem,
  Button,
  Typography,
  Paper,
} from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

type ContactFormProps = {
  onSubmit: (data: any) => void;
};

const ContactForm = ({ onSubmit }: ContactFormProps) => {
  const [company, setCompany] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [pickupId, setPickupId] = useState('');
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false,
  });

  const handleSubmit = () => {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const jsonData = {
          company,
          name,
          email,
          phone,
          pickupId,
          role,
          message,
          file: reader.result,
        };
        onSubmit(jsonData);
      };
    } else {
      const jsonData = {
        company, name, email, phone, pickupId, role, message, file: null,
      };
      onSubmit(jsonData);
    }
  };

  return (
    <Stack spacing={3}>
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
      <TextField select fullWidth label="Which best describes you?" value={role} onChange={(e) => setRole(e.target.value)}>
        <MenuItem value="customer">Customer</MenuItem>
        <MenuItem value="partner">Partner</MenuItem>
        <MenuItem value="investor">Investor</MenuItem>
      </TextField>
      <TextField fullWidth label="Message" multiline rows={4} value={message} onChange={(e) => setMessage(e.target.value)} />

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
          </Stack>
        )}
      </Paper>

      <Stack direction="row" justifyContent="flex-end">
        <Button
          variant="contained"
          size="large"
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
