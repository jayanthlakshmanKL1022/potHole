import React, { ReactNode } from 'react';

// Define the types for the props
interface GridProps {
  rows: number;
  columns: number;
  children: ReactNode;
  height: number;
  width: number;
}

const Grid: React.FC<GridProps> = ({ rows, columns, children, height, width }) => {
  // Dynamically generate the grid style based on the rows, columns, height, and width props
  const gridStyle = {
    display: 'grid',
    gridTemplateRows: `repeat(${rows}, 1fr)`,
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap: '10px', // Space between grid items (adjust as needed)
    height: `${height}px`, // Set height of the grid container
    width: `${width}px`,   // Set width of the grid container
  };

  return (
    <div style={gridStyle}>
      {children}
    </div>
  );
};

export default Grid;
