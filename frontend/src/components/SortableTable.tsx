import { SortableTableHead } from "./SortableTableHead";
import { Data, MovieCompanyData, Order } from "../App";
import { getComparator } from "../helpers/MUI";
import { Checkbox, Table, TableBody, TableCell, TableRow } from "@mui/material";
import { giveAverage } from "../helpers/maths";

interface SortableTableProps {
  rows: Data[];
  categories: { id: string; name: string }[] | null;
  selected: string | null;
  handleClick: (event: React.MouseEvent<unknown>, id: string) => void;
  order: Order;
  orderBy: keyof Data;
  handleSort: (property: keyof Data) => void;
}

export const SortableTable = ({
  rows,
  categories,
  selected,
  handleClick,
  order,
  orderBy,
  handleSort,
}: SortableTableProps) => {
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    handleSort(property);
  };

  const sortedRows = rows.sort((a: Data, b: Data) => {
    if (orderBy === "reviews") {
      const avgA = giveAverage(a.reviews);
      const avgB = giveAverage(b.reviews);
      return order === "asc" ? avgA - avgB : avgB - avgA;
    }
    return getComparator(order, orderBy)(a, b);
  });

  return (
    <Table>
      <SortableTableHead
        order={order}
        orderBy={orderBy}
        onRequestSort={handleRequestSort}
      />
      <TableBody>
        {sortedRows.map((row: Data) => {
          const isItemSelected = selected === row.id;
          return (
            <TableRow
              hover
              role="checkbox"
              aria-checked={isItemSelected}
              tabIndex={-1}
              key={row.id}
              selected={isItemSelected}
              onClick={(event) => handleClick(event, row.id)}
              className="table-row"
            >
              <TableCell>
                <Checkbox checked={isItemSelected} />
              </TableCell>
              <TableCell>{row.title}</TableCell>
              <TableCell>{giveAverage(row.reviews).toFixed(1)}</TableCell>
              <TableCell>
                {
                  categories?.find(
                    (f: MovieCompanyData) => f.id === row.filmCompanyId
                  )?.name
                }
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
