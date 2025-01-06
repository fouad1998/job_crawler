import { useEffect, useState } from "react";
import Table from "../../../common/Table";
import { Job, Jobs } from "../../types/job";
import Actions from "./Actions";
import { tableCells } from "./const";
import DataDisplay from "./DataDisplay";

type Props = {
  jobs: Jobs;
  searchTerm?: string;
  loading?: boolean;
  onRow(job: Job): void;
};
function JobTable({ jobs, searchTerm, loading, onRow }: Props) {
  const [state, setState] = useState({
    page: 0,
    rows: 25,
  });

  function filter() {
    return jobs.filter((job) =>
      [
        job.title,
        job.url,
        job.mark,
        job.qualified,
        job.devops,
        job.dev,
        job.tech,
        job.note,
        job.improvements,
        job.visited,
        job.checked,
        job.created_at,
      ].some((field) =>
        (field || "")
          .toString()
          .toLowerCase()
          .includes(searchTerm?.toLowerCase() || "")
      )
    );
  }

  useEffect(
    function () {
      setState({ page: 0, rows: 25 });
    },
    [searchTerm]
  );

  return (
    <Table
      cells={tableCells}
      items={filter().slice(
        state.page * state.rows,
        (state.page + 1) * state.rows
      )}
      components={[
        DataDisplay("id"),
        DataDisplay("title"),
        DataDisplay("url"),
        DataDisplay("mark"),
        DataDisplay("qualified"),
        DataDisplay("devops"),
        DataDisplay("dev"),
        DataDisplay("tech"),
        DataDisplay("note"),
        DataDisplay("improvements"),
        DataDisplay("visited"),
        DataDisplay("checked"),
        DataDisplay("created_at"),
        Actions,
      ]}
      isLoading={loading}
      total={filter().length}
      page={state.page}
      rows={state.rows}
      onChangePage={(page) => setState({ ...state, page })}
      onChangeRows={(rows) => setState({ ...state, rows })}
      onRow={onRow}
      withPagination
    />
  );
}

export default JobTable;
