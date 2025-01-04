import { TableCell, TableFooter, TableRow } from "@mui/material";
import { isFunction } from "lodash";
import Pagination from "./Pagination";

interface FooterProps {
  count: number;
  page: number;
  rowsPerPage: number;
  isLoading?: boolean;
  onChangePage?(p: number): void;
  onChangePerPage?(p: number): void;
}

function Footer(props: FooterProps) {
  const { count, page, rowsPerPage, isLoading, onChangePage, onChangePerPage } =
    props;

  if (count === 0 || isLoading) {
    return null;
  }

  return (
    <TableFooter>
      <TableRow>
        <TableCell colSpan={1000}>
          <Pagination
            options={[10, 25, 50]}
            count={count}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={function (p) {
              if (isFunction(onChangePage)) {
                onChangePage(p);
              }
            }}
            onRowsPerPageChange={function (p) {
              if (isFunction(onChangePerPage)) {
                onChangePerPage(p);
              }
            }}
          />
        </TableCell>
      </TableRow>
    </TableFooter>
  );
}

export default Footer;
