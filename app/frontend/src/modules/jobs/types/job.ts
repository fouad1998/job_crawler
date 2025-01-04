export type Job = {
  id: number;
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
  created_at: string;
};

export type Jobs = Job[];
