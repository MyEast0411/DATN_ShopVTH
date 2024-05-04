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

  const mensSizes = generateNumbers(24, 30, 0.5);
  const womensSizes = generateNumbers(38.5, 46, 0.5);

  const mensSizes2 = generateNumbers(20, 27, 0.5);
  const womensSizes2 = generateNumbers(34.5, 42, 0.5);

  return (
    <>
      <InfoTop />
      <Header />
      <div className="main-size-guide">
        <h2 className="main-size-guide-title">Nike Size</h2>
        <div className="main-foot-wear-size-chart">
          <h2 className="main-foot-wear-size-chart-title">Size giày Nam</h2>

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
                <TableColumn>Centimet</TableColumn>
                <TableColumn>Size VN</TableColumn>
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
        <div className="main-foot-wear-size-chart pt-2">
          <h2 className="main-foot-wear-size-chart-title">Size giày Nữ</h2>

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
                <TableColumn>Centimet</TableColumn>
                <TableColumn>Size VN</TableColumn>
              </TableHeader>
              <TableBody isLoading={isLoading}>
                {mensSizes2.map((size, index) => (
                  <TableRow key={index + 1}>
                    <TableCell>{size}</TableCell>
                    <TableCell>{womensSizes2[index]}</TableCell>
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
