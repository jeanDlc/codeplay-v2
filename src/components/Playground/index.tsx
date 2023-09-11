import { useEffect, useMemo, useRef, useState } from "react";

import Editor, { useMonaco } from "@monaco-editor/react";
import { emmetHTML } from "emmet-monaco-es";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";

import { createHtml } from "../../utils/createHtml";

import { useEditorSettingsStore } from "../../store/useSettingStore";
import { useLoadMonacoThemes } from "../../hooks/useLoadMonacoThemes";
import { url } from "../../utils/urlHelper";

self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === "json") {
      return new jsonWorker();
    }
    if (label === "css") {
      return new cssWorker();
    }
    if (label === "html") {
      return new htmlWorker();
    }
    if (label === "typescript" || label === "javascript") {
      return new tsWorker();
    }
    return new editorWorker();
  },
};

export function Playground() {
  const iFrameRef = useRef<HTMLIFrameElement>(null);

  const settings = useEditorSettingsStore(({ settings }) => settings);

  const [data, setData] = useState<{ html: string; css: string; js: string }>(
    url.getState()
  );

  const iFrameData = useMemo(() => createHtml(data), [data]);

  const handleUpdate = (key: "html" | "css" | "js", value?: string) => {
    setData((prev) => {
      const newData = {
        ...prev,
        [key]: value,
      };
      url.setState(newData);
      return newData;
    });
  };

  const monaco = useMonaco();

  useLoadMonacoThemes();

  useEffect(() => {
    if (monaco) {
      emmetHTML(monaco);
    }
  }, [monaco]);

  return (
    <main className="playground-container">
      <Editor
        defaultLanguage="html"
        theme={settings.theme}
        value={data.html}
        onChange={(value) => {
          handleUpdate("html", value);
        }}
        options={settings}
        className="editor editor-html"
      />
      <Editor
        theme={settings.theme}
        defaultLanguage="javascript"
        options={settings}
        value={data.js}
        onChange={(value) => {
          handleUpdate("js", value);
        }}
        className="editor editor-js"
      />
      <Editor
        theme={settings.theme}
        defaultLanguage="css"
        options={settings}
        value={data.css}
        onChange={(value) => {
          handleUpdate("css", value);
        }}
        className="editor editor-css"
      />
      <iframe ref={iFrameRef} srcDoc={iFrameData}></iframe>
    </main>
  );
}
