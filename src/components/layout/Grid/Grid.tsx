import { PropsGrid } from "./grid.types";

const Grid = ({ children, className, style, sizeItem }: PropsGrid) => {
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "grid",
        gridTemplateColumns: `repeat(auto-fill, minmax(min(${
          sizeItem ? `${sizeItem}px` : "200px"
        }, 100%), 1fr))`,
      }}
    >
      {children}
    </div>
  );
};

export default Grid;
