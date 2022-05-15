import React, {
  forwardRef,
  useRef,
  useState,
  createContext,
  useContext,
} from "react";
import ReactDOM from "react-dom";
// import { VariableSizeList as List } from "react-window";
import { FixedSizeList as List } from "react-window";

import data from "./data";
import "./styles.css";

const { totalColumnCount, totalRowCount, paginationNeeded, rows, columns } =
  data;

const VirtualTableContext = createContext({ top: 0 });

const getItemSize = () => 60;

const innerElement = forwardRef(({ children, ...rest }, ref) => {
  const { top } = useContext(VirtualTableContext);
  console.log("🚀 ~ file: index.js ~ line 23 ~ innerElement ~ top", top);

  return (
    <div {...rest} ref={ref}>
      <table
        style={{ top, position: "absolute", width: "100%", borderSpacing: 0 }}
      >
        <thead>
          <tr>
            {columns.map((column, columnIndex) => {
              const value = column.label;
              return (
                <th
                  style={{ top: 0, position: "sticky", height: "78px" }}
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
    </div>
  );
});

const Row = ({ index, style }) => {
  const row = rows[index];
  const { height } = style;

  return (
    <tr className={index % 2 ? "ListItemOdd" : "ListItemEven"}>
      {columns.map((column, columnIndex) => {
        const cell = row[column.id];
        const value = cell.qText;

        return (
          <th style={{ height: height - 2 }} key={columnIndex}>
            {value}
          </th>
        );
      })}
    </tr>
  );
};

const Example = () => {
  const listRef = useRef();
  const [top, setTop] = useState(0);

  return (
    <VirtualTableContext.Provider value={{ top }}>
      <List
        innerElementType={innerElement}
        className="List"
        height={350}
        itemCount={totalRowCount}
        // itemSize={getItemSize}
        itemSize={80}
        width="100%"
        onItemsRendered={(props) => {
          const style =
            listRef.current &&
            listRef.current._getItemStyle(props.overscanStartIndex);
          setTop(style && style.top);
        }}
        ref={(el) => {
          listRef.current = el;
        }}
      >
        {Row}
      </List>
    </VirtualTableContext.Provider>
  );
};

ReactDOM.render(<Example />, document.getElementById("root"));
