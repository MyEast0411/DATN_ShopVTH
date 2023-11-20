import React from "react";
import InfoTop from "../layout/InfoTop";
import Header from "../layout/Header";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

export default function SizeGuide() {
  const [isLoading, setIsLoading] = React.useState(true);
  const generateNumbers = (start, end, step) => {
    const result = [];
    for (let i = start; i <= end; i += step) {
      result.push(i);
    }
    return result;
  };

  const mensSizes = generateNumbers(1, 40.5, 0.5);
  const womensSizes = generateNumbers(2.5, 40.5, 0.5);

  return (
    <>
      <InfoTop />
      <Header />
      <div className="main-size-guide">
        <h2 className="main-size-guide-title">Nike Size Charts</h2>
        <div className="main-foot-wear-size-chart">
          <h2 className="main-foot-wear-size-chart-title">
            Men's Footwear Size Chart
          </h2>

          <div className="size-chart">
            <Table
              isStriped
              aria-label="Example static collection table"
              classNames={{
                base: "max-h-[450px] overflow-scroll",
                table: "min-h-[420px]",
              }}
            >
              <TableHeader>
                <TableColumn>Men's</TableColumn>
                <TableColumn>Women's</TableColumn>
              </TableHeader>
              <TableBody isLoading={isLoading}>
                {mensSizes.map((size, index) => (
                  <TableRow key={index + 1}>
                    <TableCell>{size}</TableCell>
                    <TableCell>{womensSizes[index]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}
