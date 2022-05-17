import React, { forwardRef } from "react";
import ReactDOM from "react-dom";
// import { VariableSizeList as List } from "react-window";
import { FixedSizeList as List } from "react-window";

import data from "./data";
import "./styles.css";

const { totalColumnCount, totalRowCount, paginationNeeded, rows, columns } =
  data;

const getItemSize = () => 60;

const outerElement = forwardRef(({ children, ...rest }, ref) => {
  console.log("🚀 ~ file: index.js ~ line 45 ~ outerElement ~ rest", rest);
  return (
    <section ref={ref} {...rest}>
      {children}
    </section>
  );
});

const innerElement = ({ children, ...rest }) => {
  return (
    <table
      // style={{ top, position: "absolute", width: "100%", borderSpacing: 0 }}
      {...rest}
      style={{
        ...rest.style,
        tableLayout: "fixed",
        borderCollapse: "collapse",
      }}
    >
      <thead>
        <tr>
          {columns.map((column, columnIndex) => {
            const value = column.label;
            return (
              <th
                style={{
                  top: 0,
                  position: "sticky",
                  height: "79px",
                  zIndex: 2,
                  border: "1px solid #d9dddd",
                  width: "100px",
                  padding: "0px",
                }}
                // style={{ height: "20px" }}
                key={columnIndex}
              >
                {value}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};

const Row = ({ index, style }) => {
  const row = rows[index];

  return (
    <tr
    // style={style}
    >
      {columns.map((column, columnIndex) => {
        const cell = row[column.id];
        const value = cell.qText;

        return (
          <th
            className={index % 2 ? "ListItemOdd" : "ListItemEven"}
            style={{
              ...style,
              top: `${80 * (index + 1)}px`,
              // border: "1px solid #d9dddd",
              width: "101px",
              textAlign: "center",
              verticalAlign: "middle",
              left: `${101 * columnIndex}px`,
              padding: "0px",
              border: "0px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              // height: 200px;
            }}
            key={columnIndex}
          >
            <div>{value}</div>
          </th>
        );
      })}
    </tr>
  );
};

const Example = () => {
  return (
    <List
      outerElementType={outerElement}
      innerElementType={innerElement}
      className="List"
      height={350}
      itemCount={totalRowCount}
      // itemSize={getItemSize}
      itemSize={80}
      width={600}
    >
      {Row}
    </List>
  );
};

ReactDOM.render(<Example />, document.getElementById("root"));
