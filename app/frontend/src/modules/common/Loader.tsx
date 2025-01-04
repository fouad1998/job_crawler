import { Box, CircularProgress } from '@mui/material';

function Loader() {
  return (
    <Box display="flex" py={5} justifyContent="center" alignItems="center" minWidth={60}>
      <CircularProgress color="primary" size={50} />
    </Box>
  );
}

export default Loader;
