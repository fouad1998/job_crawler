import { Paper, Stack } from '@mui/material';
import { useState } from 'react';
import { useQuery } from 'react-query';
import ErrorHelper from '../../common/ErrorHelper';
import { fetchWrap } from '../../common/HttpClient/client';
import Layout from '../../common/Layout/Layout';
import TableHeader from '../../common/TableHeader';
import Job from '../components/Job';
import JobTable from '../components/JobTable/JobTable';
import { Job as JobType, Jobs } from '../types/job';

function JobList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [job, setJob] = useState<JobType | null>(null);

  const {
    data: jobs,
    isLoading,
    isError,
    refetch,
  } = useQuery('jobs', function () {
    return fetchWrap<Jobs>('jobs');
  });

  if (isError) {
    return (
      <Paper elevation={0}>
        <ErrorHelper handler={() => refetch()} />
      </Paper>
    );
  }

  return (
    <Layout>
      <Stack gap={2}>
        <TableHeader title="Jobs" searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <Paper elevation={0}>
          <JobTable jobs={jobs || []} searchTerm={searchTerm} loading={isLoading} onRow={setJob} />
        </Paper>

        {job && <Job {...job} onCancel={() => setJob(null)} />}
      </Stack>
    </Layout>
  );
}

export default JobList;
