import React, { useCallback, useState } from 'react';
import {
  Stack,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

type FAQItem = {
  question: string;
  answer: string;
};

const faqData: FAQItem[] = [
  {
    question: 'What services do you offer?',
    answer: `We provide comprehensive transportation solutions including long-haul freight,
    industrial goods delivery, warehousing, and more.`,
  },
  {
    question: 'Do you operate outside Tamil Nadu?',
    answer: 'Yes, we cater to clients across India depending on their requirements.',
  },
  {
    question: 'How can I request a quote?',
    answer: `You can contact us via our website or customer care number for a
    free, no-obligation quote.`,
  },
  {
    question: 'Are my goods insured during transport?',
    answer:
      'Yes, all goods are insured to ensure complete safety and peace of mind.',
  },
  {
    question: 'Do you offer tracking for shipments?',
    answer: `Absolutely. We provide real-time tracking updates so you can monitor
    your shipment’s progress anytime.`,
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept bank transfers, UPI payments, and all major credit and debit cards.',
  },
];

const FAQSection = () => {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = useCallback((panel: string) => (
    _event: React.SyntheticEvent,
    isExpanded: boolean,
  ) => {
    setExpanded(isExpanded ? panel : false);
  }, []);

  return (
    <Stack
      spacing={3}
      sx={{
        backgroundColor: '#fff',
        maxWidth: '1400px',
        margin: '0 auto',
        padding: '1rem',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          px: 2,
        }}
      >
        <Stack
          spacing={1}
          sx={{
            textAlign: 'center',
            maxWidth: 750,
            width: '100%',
          }}
        >
          <Typography
            variant="h5"
            sx={{ color: 'green', fontWeight: 'bold', mt: 2 }}
          >
            Frequently Asked Questions
          </Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Find answers to common queries about our services, pricing, delivery
            timelines, and more. Our FAQ section is designed to give you quick, clear,
            and reliable information so you can make informed decisions.
          </Typography>
        </Stack>
      </Box>

      <Stack spacing={2}>
        {faqData.map((faq, index) => (
          <Accordion
            key={faq.question}
            expanded={expanded === `panel${index}`}
            onChange={handleChange(`panel${index}`)}
            sx={{
              borderRadius: 2,
              boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
              '&:before': { display: 'none' },
              overflow: 'hidden',
            }}
          >
            <AccordionSummary
              expandIcon={(
                <FontAwesomeIcon icon={faChevronDown} style={{ color: 'green' }} />
              )}
            >
              <Typography sx={{ fontWeight: 500 }}>
                {faq.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={{ color: 'text.secondary' }}>
                {faq.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Stack>
    </Stack>
  );
};

export default FAQSection;
