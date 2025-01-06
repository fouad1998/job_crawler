import { Check, OpenInNew } from "@mui/icons-material";
import { Box } from "@mui/material";
import { MouseEvent } from "react";
import { useMutation, useQueryClient } from "react-query";
import { fetchWrap } from "../../../common/HttpClient/client";
import IconButton from "../../../common/IconButton";
import { Job } from "../../types/job";

function Actions({ id, url }: Job) {
  const client = useQueryClient();
  const open = useMutation({
    mutationFn() {
      return fetchWrap(`jobs/applied/${id}`, { method: "PUT" });
    },
    onSuccess() {
      client.invalidateQueries("jobs");
    },
  });

  function onCheck(event: MouseEvent) {
    event.stopPropagation();
    open.mutateAsync();
  }

  function onOpen(event: MouseEvent) {
    event.stopPropagation();
    window.open(url, "_blank");
  }

  return (
    <Box display="flex" justifyContent="center" gap={1}>
      <IconButton onClick={onCheck}>
        <Check />
      </IconButton>
      <IconButton onClick={onOpen}>
        <OpenInNew />
      </IconButton>
    </Box>
  );
}

export default Actions;
