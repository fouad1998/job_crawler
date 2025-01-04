import { OpenInNew } from '@mui/icons-material';
import { Box } from '@mui/material';
import { useMutation, useQueryClient } from 'react-query';
import { fetchWrap } from '../../../common/HttpClient/client';
import IconButton from '../../../common/IconButton';
import { Job } from '../../types/job';

function Actions({ id, url }: Job) {
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
    <Box display="flex" justifyContent="center">
      <IconButton onClick={onOpen}>
        <OpenInNew />
      </IconButton>
    </Box>
  );
}

export default Actions;
