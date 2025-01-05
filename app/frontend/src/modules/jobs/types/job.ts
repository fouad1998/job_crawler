export type Job = {
  id: number;
  title?: string;
  url: string;
  mark: number;
  qualified: boolean;
  devops: boolean;
  dev: boolean;
  tech: boolean;
  note: string;
  improvements: string;
  visited: boolean;
  checked: boolean;
  cover_letter?: string;
  created_at: string;
};

export type Jobs = Job[];
export type Resume = {
  id: number;
  content: string;
};
