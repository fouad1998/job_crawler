import Rows from "./Rows";

import { Skeleton, TableBody, TableCell, TableRow } from "@mui/material";
import { FC, ReactNode } from "react";
import { ITableHeader } from "./Head";

interface BodyProps<T extends object> {
  items: T[];
  cells: ITableHeader<T>[];
  selected: T[];
  withCheckbox: boolean;
  isLoading: boolean;
  components: FC<T>[];
  emptyRow?: ReactNode;
  onRow?(item: T): void;
  onSelect(item: T): void;
}

function Body<T extends object>(props: BodyProps<T>) {
  const { items, isLoading, emptyRow, ...other } = props;

  return (
    <TableBody>
      {isLoading && (
        <>
          {new Array(7).fill(undefined).map(function (_, index) {
            return (
              <TableRow key={index}>
                {emptyRow
                  ? emptyRow
                  : new Array(props.cells.length + (props.withCheckbox ? 1 : 0))
                      .fill(undefined)
                      .map(function (_, index) {
                        return (
                          <TableCell key={index}>
                            <Skeleton />
                          </TableCell>
                        );
                      })}
              </TableRow>
            );
          })}
        </>
      )}

      {/** @ts-ignore */}
      {!isLoading && <Rows {...other} items={items} />}
    </TableBody>
  );
}

export default Body;
