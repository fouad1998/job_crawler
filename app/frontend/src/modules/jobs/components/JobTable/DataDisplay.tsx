import { Typography } from "@mui/material";
import { Job } from "../../types/job";

type Keys = keyof Job;
function DataDisplay(key: Keys) {
  return function (job: Job) {
    let data =
      typeof job[key] === "boolean"
        ? job[key]
          ? "Yes"
          : "No"
        : key === "created_at"
        ? Intl.DateTimeFormat("fr-fr", {
            year: "numeric",
            month: "short",
            day: "2-digit",
          }).format(new Date(job[key] as string))
        : (job[key] || "").toString();
    data = data.length > 80 ? data.slice(0, 80) + "..." : data;
    if (key === "url") {
      return (
        <Typography
          variant="inherit"
          component="a"
          target="_blank"
          href={job["url"]}
        >
          {data}
        </Typography>
      );
    }

    return <Typography variant="inherit">{data || "—"}</Typography>;
  };
}

export default DataDisplay;
