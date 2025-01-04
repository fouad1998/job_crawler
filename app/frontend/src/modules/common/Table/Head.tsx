import {
  Checkbox,
  Skeleton,
  styled,
  TableCell,
  TableHead,
  TableHeadProps,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import { Path } from "./path";

export interface ITableHeader<T extends object> {
  id: Path<T> | "CUSTOM";
  label: string;
  center?: boolean;
  numeric?: boolean;
  disablePadding?: boolean;
}

interface HeadProps<T extends object> {
  cells: ITableHeader<T>[];
  orderedCells: Path<T>[];
  withCheckbox: boolean;
  isSelection: boolean;
  isAllSelected: boolean;
  isLoading: boolean;
  orderCell?: Path<T>;
  headProps?: TableHeadProps;
  orderDirection?: "asc" | "desc";
  onCellOrder(cell: Path<T>): void;
  onSelectAll(): void;
}

const Label = styled(Typography)({
  fontWeight: 600,
  fontSize: 14,
});

function Head<T extends object>(props: HeadProps<T>) {
  const {
    cells,
    orderedCells,
    withCheckbox,
    isSelection,
    isAllSelected,
    isLoading,
    orderDirection,
    orderCell,
    headProps = {},
    onCellOrder,
    onSelectAll,
  } = props;

  const direction =
    orderDirection === "asc"
      ? "asc"
      : orderDirection === "desc"
      ? "desc"
      : undefined;

  return (
    <TableHead {...headProps}>
      <TableRow>
        {withCheckbox && (
          <TableCell padding="checkbox">
            {isLoading ? (
              <Skeleton width={40} />
            ) : (
              <Checkbox
                size="small"
                onChange={onSelectAll}
                onClick={function (event) {
                  event.stopPropagation();
                }}
                checked={isSelection}
                indeterminate={!isAllSelected && isSelection}
              />
            )}
          </TableCell>
        )}

        {cells.map(({ id, ...cell }, index) => (
          <TableCell
            key={index}
            sx={{ padding: cell.disablePadding ? "10px" : "10px" }}
          >
            {isLoading ? (
              <Skeleton />
            ) : (
              <>
                {id !== "CUSTOM" && orderedCells.includes(id) && (
                  <TableSortLabel
                    active={orderCell === id}
                    direction={direction}
                    sx={{ textAlign: cell.center ? "center" : "left" }}
                    onClick={function () {
                      onCellOrder(id);
                    }}
                  >
                    <Label>{cell.label}</Label>
                  </TableSortLabel>
                )}

                {(id === "CUSTOM" || !orderedCells.includes(id)) && (
                  <Label
                    sx={{
                      textAlign: cell.center ? "center" : "left",
                    }}
                  >
                    {cell.label}
                  </Label>
                )}
              </>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default Head;
