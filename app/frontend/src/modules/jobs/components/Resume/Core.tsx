import { LoadingButton } from "@mui/lab";
import { Skeleton, Stack, Typography } from "@mui/material";
import ReactCodeMirror from "@uiw/react-codemirror";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import ErrorHelper from "../../../common/ErrorHelper";
import { fetchWrap } from "../../../common/HttpClient/client";
import type { Resume as ResumeType } from "../../types/job";

function Core() {
  const [resume, setResume] = useState("");

  const { data, isLoading, isError, refetch } = useQuery(
    ["resume"],
    async function () {
      return fetchWrap<ResumeType>("resume");
    }
  );

  const updateResume = useMutation(
    function () {
      return fetchWrap<ResumeType>("resume/update", {
        method: "POST",
        body: JSON.stringify({ content: resume }),
      });
    },
    {
      onSuccess() {
        refetch();
      },
    }
  );

  useEffect(
    function () {
      if (data) {
        setResume(data.content);
      }
    },
    [data]
  );

  if (isLoading) {
    return <Skeleton variant="rectangular" width="100%" height={100} />;
  }

  if (isError) {
    return <ErrorHelper handler={() => refetch()} />;
  }

  return (
    <Stack gap={2}>
      <Typography variant="h5">Resume</Typography>
      <ReactCodeMirror
        value={resume}
        height="500px"
        extensions={[]} // No extensions for plain text
        onChange={setResume}
      />
      <Stack direction="row" justifyContent="flex-end">
        <LoadingButton
          loading={updateResume.isLoading}
          onClick={() => updateResume.mutateAsync()}
          variant="contained"
        >
          Update
        </LoadingButton>
      </Stack>
    </Stack>
  );
}

export default Core;
