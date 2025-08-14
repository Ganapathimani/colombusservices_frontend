import React from 'react';
import { Stack } from '@mui/material';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { map } from 'lodash/fp';
import StepCard from './_stepcard';

type Step = {
  icon: IconDefinition;
  title: string;
  description: string;
};

interface StepRowProps {
  steps: Step[];
  reverse?: boolean;
}

const StepRow = ({ steps, reverse }: StepRowProps) => (
  <Stack
    direction={reverse ? 'row-reverse' : 'row'}
    spacing={4}
    justifyContent="center"
    flexWrap="wrap"
  >

    {map(
      (step) => (
        <StepCard
          key={step.title}
          icon={step.icon}
          title={step.title}
          description={step.description}
        />
      ),
      steps,
    )}
  </Stack>
);

export default StepRow;
