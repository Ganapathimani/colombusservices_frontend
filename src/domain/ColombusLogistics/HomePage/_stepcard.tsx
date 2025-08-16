import React from 'react';
import { Stack, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';

type StepCardProps = {
  icon: IconDefinition;
  title: string;
  description: string;
};

const StepCard = ({ icon, title, description }: StepCardProps) => (
  <Stack
    spacing={2}
    alignItems="center"
    sx={{
      flex: '1 1 300px',
      borderRadius: 3,
      textAlign: 'center',
      backgroundColor: '#ffffff',
      borderTop: '4px solid #2e7d32',
      p: 2,
      transition: 'transform 0.3s ease',
    }}
  >
    <FontAwesomeIcon
      icon={icon}
      size="2x"
      style={{ color: '#2e7d32' }}
    />
    <Typography
      variant="h6"
      sx={{ fontWeight: 'bold', color: '#2e7d32' }}
    >
      {title}
    </Typography>
    <Typography
      variant="body2"
      sx={{ color: '#555', lineHeight: 1.6 }}
    >
      {description}
    </Typography>
  </Stack>
);

export default StepCard;
