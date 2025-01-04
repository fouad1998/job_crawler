import Empty from "./Empty";

import { Checkbox, TableCell, TableRow } from "@mui/material";
import { isFunction, isNumber, isString } from "lodash";
import { FC } from "react";
import { ITableHeader } from "./Head";

interface RowsProps<T extends object> {
  items: T[];
  cells: ITableHeader<T>[];
  selected: T[];
  components: FC<T>[];
  withCheckbox: boolean;

  onRow?(item: T): void;
  onSelect(item: T): void;
}

function Rows<T extends object>(props: RowsProps<T>) {
  const { items, cells, withCheckbox, selected, components, onRow, onSelect } =
    props;

  if (items.length === 0) {
    return <Empty />;
  }

  return (
    <>
      {items.map(function (item, index) {
        return (
          <TableRow
            key={
              "id" in item && (isString(item.id) || isNumber(item.id))
                ? item.id
                : index
            }
            onClick={function (event) {
              event.stopPropagation();
              if (isFunction(onRow)) {
                onRow(item);
              }
            }}
            sx={{ cursor: "pointer" }}
            hover
          >
            {withCheckbox && (
              <TableCell padding="checkbox">
                <Checkbox
                  size="small"
                  onClick={function (event) {
                    event.stopPropagation();
                    if (typeof item === "undefined") {
                      return;
                    }

                    onSelect(item);
                  }}
                  checked={
                    typeof item !== "undefined" && selected.includes(item)
                  }
                />
              </TableCell>
            )}

            {components.map((Component, index) => (
              <TableCell
                key={index}
                align={
                  cells[index].center
                    ? "center"
                    : cells[index].numeric
                    ? "right"
                    : "left"
                }
                sx={{ padding: cells[index].disablePadding ? "8px" : "15px" }}
              >
                <Component {...item} />
              </TableCell>
            ))}
          </TableRow>
        );
      })}
    </>
  );
}

export default Rows;
