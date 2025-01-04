import { ExpandMore } from '@mui/icons-material';
import { Box, InputLabel, MenuItem, Pagination as PaginationM, TextField, Typography } from '@mui/material';

type Props = {
  options: number[];
  count: number;
  rowsPerPage: number;
  page: number;
  onPageChange(page: number): void;
  onRowsPerPageChange(rows: number): void;
};
const Pagination = (props: Props) => {
  const { options, rowsPerPage, page, count, onPageChange, onRowsPerPageChange } = props;

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Box display="flex" alignItems="center" gap={2}>
        <InputLabel htmlFor="table-pagination" sx={{ textTransform: 'capitalize' }}>
          Rows
        </InputLabel>

        <TextField
          id="table-pagination"
          size="small"
          color="primary"
          value={rowsPerPage}
          SelectProps={{
            IconComponent: props => <ExpandMore {...props} />,
          }}
          onChange={event => {
            onRowsPerPageChange(Number(event.target.value));
          }}
          sx={{
            fieldset: {
              border: 'none',
            },
          }}
          InputProps={{
            sx: {
              backgroundColor: 'grey.200',
              border: 'none',
            },
          }}
          select>
          {options.map(option => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        <Typography variant="body1" textTransform="lowercase">
          per page
        </Typography>
      </Box>

      <Typography variant="body1">{`${page + 1} — ${Math.ceil(count / rowsPerPage)}`}</Typography>

      <PaginationM
        count={Math.ceil(count / rowsPerPage)}
        shape="rounded"
        page={page + 1}
        onChange={(_, page) => onPageChange(page - 1)}
        sx={{
          '.Mui-selected': {
            backgroundColor: 'grey.300',
          },
        }}
      />
    </Box>
  );
};

export default Pagination;
