import { Navigate, useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';

interface ProtectedRouteProps {
  element: JSX.Element;
  allowedRoles: string[];
  userRole: string | null;
}

const ProtectedRoute = ({
  element,
  allowedRoles,
  userRole,
}: ProtectedRouteProps) => {
  const navigate = useNavigate();

  if (!userRole) {
    return <Navigate to="/" replace />;
  }
  const normalizedRole = userRole?.toUpperCase().trim() ?? '';

  if (!allowedRoles.includes(normalizedRole)) {
    return (
      <Box
        sx={{
          minHeight: '52vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: '#f9f9f9',
        }}
      >
        <Box
          sx={{
            p: 4,
            textAlign: 'center',
            borderRadius: 2,
            maxWidth: 400,
          }}
        >
          <Typography variant="h5" gutterBottom color="error">
            Access Denied
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Please login with an admin account to view this page.
          </Typography>
          <Button
            variant="contained"
            color="success"
            sx={{
              mt: 2,
              px: 3,
              py: 1.2,
              borderRadius: '8px',
              fontWeight: 600,
              textTransform: 'none',
              boxShadow: '0px 3px 6px rgba(0,0,0,0.15)',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: '#1b5e20',
                transform: 'translateY(-2px)',
                boxShadow: '0px 6px 12px rgba(0,0,0,0.25)',
              },
            }}
            onClick={() => navigate('/')}
          >
            Go to Home
          </Button>
        </Box>
      </Box>
    );
  }

  return element;
};

export default ProtectedRoute;
