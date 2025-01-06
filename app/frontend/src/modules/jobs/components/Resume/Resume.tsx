import { Close } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";
import { Fragment, useState } from "react";
import IconButton from "../../../common/IconButton";
import Core from "./Core";

function Resume() {
  const [open, setOpen] = useState(false);

  function onClose() {
    setOpen(false);
  }

  return (
    <Fragment>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Update my resume
      </Button>

      <Dialog maxWidth="md" onClose={onClose} fullWidth open={open}>
        <DialogTitle display="flex" alignItems="center">
          <Typography
            flex="1 1 auto"
            display="flex"
            justifyContent="center"
            align="center"
            variant="inherit"
          >
            Resume
          </Typography>

          <div>
            <IconButton onClick={onClose}>
              <Close />
            </IconButton>
          </div>
        </DialogTitle>

        <Divider />

        <DialogContent>
          <Core />
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}

export default Resume;
