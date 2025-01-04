import { ITableHeader } from '../../../common/Table/Head';
import { Job } from '../../types/job';

export const tableCells: ITableHeader<Job>[] = [
  { id: 'id', label: 'ID' },
  { id: 'url', label: 'URL' },
  { id: 'mark', label: 'Mark' },
  { id: 'qualified', label: 'Qualified' },
  { id: 'devops', label: 'DevOps' },
  { id: 'dev', label: 'Dev' },
  { id: 'tech', label: 'Tech' },
  { id: 'note', label: 'Note' },
  { id: 'improvements', label: 'Improvements' },
  { id: 'visited', label: 'Visited' },
  { id: 'checked', label: 'Applied' },
  { id: 'created_at', label: 'Created At' },
  { id: 'CUSTOM', label: 'Actions' },
] as const;
