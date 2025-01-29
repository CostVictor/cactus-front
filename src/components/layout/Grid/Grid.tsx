import { PropsGrid } from "./grid.types";

const Grid = ({ children, className, style, sizeItem }: PropsGrid) => {
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "grid",
        gridTemplateColumns: `repeat(auto-fill, minmax(${
          sizeItem || 200
        }, 1fr))`,
        justifyItems: "start",
      }}
    >
      {children}
    </div>
  );
};

export default Grid;
