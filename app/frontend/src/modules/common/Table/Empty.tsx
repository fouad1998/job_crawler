import EmptyIllustation from '../Empty';

import { Container, TableCell, TableRow } from '@mui/material';

function Empty() {
  return (
    <TableRow>
      <TableCell padding="none" colSpan={1000}>
        <Container maxWidth="xs" sx={{ p: 3 }}>
          <EmptyIllustation />
        </Container>
      </TableCell>
    </TableRow>
  );
}

export default Empty;
