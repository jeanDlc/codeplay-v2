import { useMemo } from "react";

import { createHtml } from "../../utils/createHtml";
import { useEditorValuesStore } from "../../store/useEditorValues";
import ResizableGrid from "../ResizableGrid";
import Editor from "../Editor";
import classes from "./playground.module.css";

export function Playground() {
  const values = useEditorValuesStore(({ values }) => values);

  const iFrameData = useMemo(() => createHtml(values), [values]);

  return (
    <main className={classes.main}>
      <ResizableGrid
        grids={[
          {
            id: "html",
            element: <Editor lang="html" />,
          },
          {
            id: "js",
            element: <Editor lang="js" />,
          },
          {
            id: "css",
            element: <Editor lang="css" />,
          },
          {
            id: "frame",
            element: (
              <iframe title="Preview of the code" srcDoc={iFrameData}></iframe>
            ),
          },
        ]}
      />
    </main>
  );
}
