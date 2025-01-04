import { Close, OpenInNew } from '@mui/icons-material';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Typography } from '@mui/material';
import { useMutation, useQueryClient } from 'react-query';
import { fetchWrap } from '../../../common/HttpClient/client';
import IconButton from '../../../common/IconButton';
import type { Job as JobType } from '../../types/job';

type Props = JobType & {
  onCancel(): void;
};
function Job({ id, url, note, improvements, onCancel }: Props) {
  const client = useQueryClient();
  const open = useMutation({
    mutationFn() {
      return fetchWrap(`jobs/applied/${id}`, { method: 'PUT' });
    },
    onSuccess() {
      client.invalidateQueries('jobs');
    },
  });

  function onOpen() {
    window.open(url, '_blank');
    open.mutateAsync();
  }

  return (
    <Dialog maxWidth="sm" fullWidth open>
      <DialogTitle display="flex" alignItems="center">
        <Typography flex="1 1 auto" display="flex" justifyContent="center" align="center" variant="inherit">
          Job #{id}
        </Typography>

        <div>
          <IconButton onClick={onCancel}>
            <Close />
          </IconButton>
        </div>
      </DialogTitle>

      <Divider />

      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2}>
          <div>
            <Typography component="a" href={url}>
              {url}
            </Typography>
            <IconButton sx={{ mx: 1 }} size="small" onClick={onOpen}>
              <OpenInNew fontSize="small" />
            </IconButton>
          </div>

          <div>
            <Typography variant="h6">Remark</Typography>
            <Typography>{note}</Typography>
          </div>

          <div>
            <Typography variant="h6">Improvements</Typography>
            <Typography>{improvements}</Typography>
          </div>
        </Box>
      </DialogContent>

      <Divider />

      <DialogActions
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}>
        <Button variant="outlined" onClick={onCancel}>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Job;
