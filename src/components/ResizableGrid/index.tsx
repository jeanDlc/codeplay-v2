import { useEffect, useRef } from "react";
import Split from "split-grid";

import classes from "./grid.module.css";

import type { ReactNode } from "react";

const ResizableGrid = ({
  grids,
}: {
  grids: Array<{ id: string; element: ReactNode }>;
}) => {
  const verticalGutterRef = useRef<HTMLDivElement | null>(null);
  const horizontalGutterRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (verticalGutterRef.current && horizontalGutterRef.current) {
      Split({
        columnGutters: [
          {
            track: 1,
            element: verticalGutterRef.current,
          },
        ],
        rowGutters: [
          {
            track: 1,
            element: horizontalGutterRef.current,
          },
        ],
      });
    }
  }, []);

  return (
    <div className={classes.grid}>
      {grids.map(({ id, element }) => (
        <div key={id}>{element}</div>
      ))}
      <div ref={horizontalGutterRef} className={classes["horizontal-gutter"]} />
      <div ref={verticalGutterRef} className={classes["vertical-gutter"]} />
    </div>
  );
};

export default ResizableGrid;
