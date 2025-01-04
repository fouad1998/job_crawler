import { LoadingButton } from '@mui/lab';
import { Container, Stack, Typography } from '@mui/material';
import React from 'react';

type Props = {
  title: React.ReactNode;
  illustration: React.ReactNode;
  buttonText: React.ReactNode;
  loading?: boolean;
  onClick?(): void;
};
function DisplayError({ title, illustration, buttonText, loading, onClick }: Props) {
  return (
    <Stack gap={2} p={2} alignItems="center">
      <Container maxWidth="xs">{illustration}</Container>

      <Typography variant="body2" align="center">
        {title}
      </Typography>

      <LoadingButton variant="outlined" color="primary" sx={{ px: 3 }} loading={loading} onClick={onClick}>
        {buttonText}
      </LoadingButton>
    </Stack>
  );
}

export default DisplayError;
