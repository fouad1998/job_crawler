import { Container, Stack, Typography } from '@mui/material';
import { ReactNode } from 'react';

type Props = {
  title?: string;
  children: ReactNode;
};
function Layout({ title, children }: Props) {
  return (
    <Container
      maxWidth="xl"
      sx={{ py: 3, position: 'relative', display: 'flex', flexDirection: 'column', gap: 5, backgroundColor: 'rgb(240, 247, 251)' }}>
      <Stack gap={1}>
        <Typography variant="h4" component="h1" gutterBottom>
          Job Board
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          This is a job board application where you can view and apply to job offers. Those jobs list are filtred by your skills and resume
          informations. According to Chatgpt you have ordered list which is sorted by the best match to your skills.
        </Typography>
      </Stack>

      <Stack gap={2}>
        {title && (
          <Typography variant="h5" component="h2" gutterBottom>
            {title}
          </Typography>
        )}
        <main>{children}</main>
      </Stack>
    </Container>
  );
}

export default Layout;
