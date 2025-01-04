import { Add, Search } from '@mui/icons-material';
import { Box, Button, InputBase, Paper, Tooltip, Typography } from '@mui/material';
import { isFunction } from 'lodash';
import { ReactNode, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

interface Props {
  title: ReactNode;
  addText?: ReactNode;
  description?: ReactNode;
  searchTerm?: string;
  placeholder?: string;
  tooltip?: ReactNode;
  withLoading?: boolean;
  banner?: ReactNode;
  onSearchChange?(value: string): void;
  onAddClick?(): void;
}
function TableHeader(props: Props) {
  const { title, addText, searchTerm, placeholder, tooltip = '', description, banner, onSearchChange, onAddClick } = props;

  const { reset, control, handleSubmit } = useForm({
    defaultValues: {
      searchTerm: '',
    },
  });

  useEffect(
    function () {
      reset({ searchTerm });
    },
    [reset, searchTerm]
  );

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Box display="flex" alignItems="center" gap={2}>
        <Typography variant="h4" flex="1 1 auto">
          {title}
        </Typography>

        <Paper
          elevation={0}
          sx={{
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: 'grey.300',
            flex: '1 1 auto',
            maxWidth: 'sm',
          }}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            component="form"
            onSubmit={handleSubmit(function ({ searchTerm }) {
              if (isFunction(onSearchChange)) {
                onSearchChange(searchTerm);
              }
            })}>
            <Button
              type="submit"
              sx={{
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                pl: 2,
                minWidth: 0,
                flex: '0 0 auto',
              }}>
              <Search />
            </Button>

            <Controller
              name="searchTerm"
              control={control}
              render={function ({ field }) {
                return <InputBase placeholder={placeholder} {...field} sx={{ mr: 2, flex: '1 1 auto' }} />;
              }}
            />
          </Box>
        </Paper>

        {onAddClick && (
          <Tooltip title={tooltip}>
            <Button variant="contained" startIcon={<Add />} onClick={onAddClick}>
              {addText}
            </Button>
          </Tooltip>
        )}
      </Box>

      {description && <Typography variant="body2">{description}</Typography>}

      {banner && <div>{banner}</div>}
    </Box>
  );
}

export default TableHeader;
