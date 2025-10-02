import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Box,
  Divider,
  Chip,
} from '@mui/material';
import { map, size } from 'lodash/fp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBuilding, faEnvelope, faLocationDot, faPhone, faPaperPlane, faMapMarkerAlt,
} from '@fortawesome/free-solid-svg-icons';
import ContactForm from '#components/ContactForm/ContactForm';
import toast from 'react-hot-toast';
import { useCreateEnquiryMutation } from '#api/colombusLogisticsApi';
import type { TEnquiry } from '#domain/models/TEnquiry';

type Branch = {
  branch: string;
  address: string;
  phone: string[];
  email: string[];
};

const branches: Branch[] = [
  {
    branch: 'Head Office - Tirupur',
    address:
      '141-C, Colombus Building, Iswarya Garden, Ammapalayam, Tirupur, Tamil Nadu',
    phone: ['9442602332'],
    email: ['tirupur@colombusfreight.com', 'customercare@colombusfreight.com'],
  },
  {
    branch: 'Corporate Office - Chennai',
    address: 'Chennai (Manali, Pammal) - Warehouse & Port Movements',
    phone: ['9442645332', '9952845332'],
    email: ['chennai@colombusfreight.com'],
  },
  {
    branch: 'Coimbatore',
    address: 'Branch Office, Coimbatore, Tamil Nadu',
    phone: ['9442647332', '7305025406'],
    email: ['coimbatore@colombusfreight.com'],
  },
  {
    branch: 'Tuticorin',
    address: 'Branch Office, Tuticorin, Tamil Nadu',
    phone: ['7339419991', '7339419992'],
    email: [],
  },
];

const ContactPage = () => {
  const [createEnquiry] = useCreateEnquiryMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (data: TEnquiry) => {
    try {
      setIsSubmitting(true);
      await createEnquiry(data).unwrap();
      toast.success('Enquiry submitted successfully');
    } catch (err) {
      toast.error('Failed to submit enquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'white',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: -100,
          right: -100,
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(22, 163, 74, 0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: -150,
          left: -150,
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(22, 163, 74, 0.03) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <Stack
        spacing={6}
        sx={{
          maxWidth: 1400,
          margin: '0 auto',
          px: { xs: 2, md: 4, lg: 6 },
          py: { xs: 5, md: 7 },
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Stack spacing={2} alignItems="center">
          <Chip
            label="Contact & Support"
            sx={{
              bgcolor: 'success.50',
              color: 'success.dark',
              fontWeight: 600,
              fontSize: '0.875rem',
              px: 1,
              height: 32,
            }}
          />
          <Typography
            variant="h2"
            fontWeight={700}
            color="text.primary"
            textAlign="center"
            sx={{
              fontSize: { xs: '2rem', md: '3rem' },
              letterSpacing: '-0.03em',
              lineHeight: 1.2,
            }}
          >
            Let&apos;s Start a Conversation
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            textAlign="center"
            fontWeight={400}
            sx={{
              maxWidth: 700,
              fontSize: { xs: '1rem', md: '1.125rem' },
              lineHeight: 1.6,
            }}
          >
            Have questions about our logistics services? Our experienced team is ready
            to provide personalized solutions for your business needs.
          </Typography>
        </Stack>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: 'minmax(450px, 1fr) minmax(600px, 1.2fr)' },
            gap: 5,
            alignItems: 'start',
          }}
        >
          <Box
            sx={{
              position: { lg: 'sticky' },
              top: { lg: 24 },
            }}
          >
            <Card
              elevation={0}
              sx={{
                borderRadius: 4,
                overflow: 'hidden',
                border: '1px solid',
                borderColor: 'divider',
                transition: 'all 0.3s ease',
                '&:hover': {
                  boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                },
              }}
            >
              <Box
                sx={{
                  background: 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)',
                  px: 4,
                  py: 4,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: -20,
                    right: -20,
                    width: 120,
                    height: 120,
                    borderRadius: '50%',
                    bgcolor: 'rgba(255,255,255,0.1)',
                  }}
                />
                <Stack spacing={1.5} position="relative" zIndex={1}>
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: 2.5,
                      bgcolor: 'rgba(255,255,255,0.2)',
                      backdropFilter: 'blur(10px)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <FontAwesomeIcon icon={faPaperPlane} color="white" size="xl" />
                  </Box>
                  <Typography variant="h5" fontWeight={700} color="white">
                    Send Us a Message
                  </Typography>
                  <Typography variant="body2" color="rgba(255,255,255,0.9)">
                    Fill out the form and we&apos;ll be in touch as soon as possible
                  </Typography>
                </Stack>
              </Box>

              <CardContent sx={{ p: 4 }}>
                <ContactForm onSubmit={handleFormSubmit} isSubmitting={isSubmitting} />
              </CardContent>
            </Card>
          </Box>

          <Stack spacing={3}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              flexWrap="wrap"
              gap={2}
            >
              <Stack spacing={0.5}>
                <Typography variant="h4" fontWeight={700} color="text.primary">
                  Our Office Locations
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Visit us at any of our
                  {' '}
                  {branches.length}
                  {' '}
                  strategically located offices
                </Typography>
              </Stack>
              <Chip
                icon={<FontAwesomeIcon icon={faMapMarkerAlt} size="sm" />}
                label={`${branches.length} Locations`}
                variant="outlined"
                sx={{
                  borderColor: 'success.main',
                  color: 'success.dark',
                  fontWeight: 600,
                }}
              />
            </Stack>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                gap: 3,
              }}
            >
              {map((branch: Branch, index: number) => (
                <Card
                  key={branch.branch}
                  elevation={0}
                  sx={{
                    borderRadius: 3,
                    border: '2px solid',
                    borderColor: index === 0 ? 'success.main' : 'divider',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      borderColor: 'success.main',
                      transform: 'translateY(-4px)',
                      boxShadow: '0 12px 24px rgba(22, 163, 74, 0.15)',
                    },
                  }}
                >
                  {index === 0 && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        zIndex: 2,
                      }}
                    >
                      <Chip
                        label="Main"
                        size="small"
                        sx={{
                          bgcolor: 'success.main',
                          color: 'white',
                          fontWeight: 600,
                          height: 24,
                          fontSize: '0.75rem',
                        }}
                      />
                    </Box>
                  )}

                  <CardContent sx={{ p: 3.5 }}>
                    <Stack spacing={3}>
                      <Stack direction="row" alignItems="flex-start" spacing={2}>
                        <Box
                          sx={{
                            width: 48,
                            height: 48,
                            borderRadius: 2,
                            bgcolor: index === 0 ? 'success.main' : 'success.50',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            transition: 'all 0.3s ease',
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faBuilding}
                            color={index === 0 ? 'white' : '#16a34a'}
                            size="lg"
                          />
                        </Box>
                        <Stack flex={1}>
                          <Typography
                            variant="h6"
                            fontWeight={700}
                            color="text.primary"
                            sx={{ fontSize: '1.125rem', lineHeight: 1.3, pr: index === 0 ? 5 : 0 }}
                          >
                            {branch.branch}
                          </Typography>
                        </Stack>
                      </Stack>

                      <Divider />

                      <Stack direction="row" spacing={1.5} alignItems="flex-start">
                        <Box
                          sx={{
                            mt: 0.3,
                            width: 18,
                            height: 18,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                          }}
                        >
                          <FontAwesomeIcon icon={faLocationDot} size="sm" color="#16a34a" />
                        </Box>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ flex: 1, lineHeight: 1.6, fontSize: '0.875rem' }}
                        >
                          {branch.address}
                        </Typography>
                      </Stack>

                      <Stack spacing={2}>
                        {size(branch.phone) > 0 && (
                          <Stack spacing={1}>
                            <Stack direction="row" alignItems="center" spacing={1}>
                              <Box
                                sx={{
                                  width: 18,
                                  height: 18,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}
                              >
                                <FontAwesomeIcon icon={faPhone} size="xs" color="#6b7280" />
                              </Box>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                                fontWeight={600}
                                textTransform="uppercase"
                                letterSpacing={0.5}
                              >
                                Phone
                              </Typography>
                            </Stack>
                            <Stack spacing={0.5} pl={3.5}>
                              {map((ph: string) => (
                                <Typography
                                  key={ph}
                                  variant="body2"
                                  color="text.primary"
                                  fontWeight={500}
                                  sx={{ fontSize: '0.9rem' }}
                                >
                                  {ph}
                                </Typography>
                              ))(branch.phone)}
                            </Stack>
                          </Stack>
                        )}

                        {size(branch.email) > 0 && (
                          <Stack spacing={1}>
                            <Stack direction="row" alignItems="center" spacing={1}>
                              <Box
                                sx={{
                                  width: 18,
                                  height: 18,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}
                              >
                                <FontAwesomeIcon icon={faEnvelope} size="xs" color="#6b7280" />
                              </Box>
                              <Typography
                                variant="caption"
                                color="text.secondary"
                                fontWeight={600}
                                textTransform="uppercase"
                                letterSpacing={0.5}
                              >
                                Email
                              </Typography>
                            </Stack>
                            <Stack spacing={0.5} pl={3.5}>
                              {map((em: string) => (
                                <Typography
                                  key={em}
                                  variant="body2"
                                  color="success.dark"
                                  fontWeight={500}
                                  sx={{
                                    wordBreak: 'break-word',
                                    fontSize: '0.85rem',
                                  }}
                                >
                                  {em}
                                </Typography>
                              ))(branch.email)}
                            </Stack>
                          </Stack>
                        )}
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              ))(branches)}
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default ContactPage;
