import Body from "./Body";
import Footer from "./Footer";
import Head, { ITableHeader } from "./Head";

import { TableContainer, TableHeadProps, Table as TableM } from "@mui/material";
import { isFunction } from "lodash";
import { FC, ReactNode, useCallback, useEffect, useState } from "react";
import { Path } from "./path";

type SortDir = "asc" | "desc";

interface TableProps<T extends object> {
  items: T[];
  cells: ITableHeader<T>[];

  orderedCells?: Path<T>[];
  page?: number;
  rows?: number;
  total?: number;

  headProps?: TableHeadProps;
  emptyRow?: ReactNode;
  order?: Path<T>;
  direction?: SortDir;
  components: FC<T>[];

  withCheckbox?: boolean;
  withPagination?: boolean;
  isLoading?: boolean;

  onCellOrder?(cell: Path<T>, dir: SortDir): void;
  onChangeRows?(rows: number): void;
  onChangePage?(page: number): void;
  onRow?(item: T): void;
}

function Table<T extends object>(props: TableProps<T>) {
  const {
    items,
    cells,
    orderedCells = [],
    page = 0,
    rows = 0,
    total = 0,
    emptyRow,
    order,
    direction,
    withPagination = false,
    withCheckbox = false,
    isLoading = false,
    headProps,
    components,
    onRow,
    onCellOrder,
    onChangePage,
    onChangeRows,
  } = props;

  const [selected, setSelected] = useState<T[]>([]);
  const [orderCell, setOrderCell] = useState<Path<T>>();
  const [orderDir, setOrderDir] = useState<SortDir>("asc");

  const onOrderHandler = useCallback(
    (cell: Path<T>) => {
      if (orderCell === cell) {
        const nextOrder = orderDir === "asc" ? "desc" : "asc";
        setOrderDir(nextOrder);
        if (isFunction(onCellOrder)) {
          onCellOrder(cell, nextOrder);
        }

        return;
      }

      setOrderCell(cell);
      if (isFunction(onCellOrder)) {
        onCellOrder(cell, orderDir);
      }
    },
    [onCellOrder, orderCell, orderDir]
  );

  const onSelectHandler = useCallback(function (i: T) {
    setSelected((state) => {
      if (state.includes(i)) {
        return state.filter((e) => e !== i);
      }

      return [...state, i];
    });
  }, []);

  const onSelectAllHandler = useCallback(
    function () {
      setSelected((state) => {
        if (state.length === 0) {
          return [...items];
        }

        return [];
      });
    },
    [items]
  );

  useEffect(
    function () {
      setOrderDir(direction || "asc");
    },
    [direction]
  );

  useEffect(
    function () {
      setOrderCell(order);
    },
    [order]
  );

  return (
    <TableContainer sx={{ maxHeight: "80vh" }}>
      <TableM stickyHeader>
        <Head
          cells={cells}
          orderCell={order}
          orderDirection={direction}
          withCheckbox={withCheckbox}
          orderedCells={orderedCells}
          isAllSelected={selected.length === items.length}
          isSelection={selected.length !== 0}
          isLoading={isLoading}
          headProps={headProps}
          onCellOrder={onOrderHandler}
          onSelectAll={onSelectAllHandler}
        />

        <Body
          items={items}
          cells={cells}
          selected={selected}
          withCheckbox={withCheckbox}
          isLoading={isLoading}
          components={components}
          emptyRow={emptyRow}
          onRow={onRow}
          onSelect={onSelectHandler}
        />

        {withPagination && (
          <Footer
            count={total}
            page={page}
            rowsPerPage={rows}
            isLoading={isLoading}
            onChangePage={onChangePage}
            onChangePerPage={onChangeRows}
          />
        )}
      </TableM>
    </TableContainer>
  );
}

export default Table;
