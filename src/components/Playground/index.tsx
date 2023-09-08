import { useEffect, useRef, useState } from "react";
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

  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");

  const monaco = useMonaco();

  useLoadMonacoThemes();

  useEffect(() => {
    if (iFrameRef.current) {
      iFrameRef.current.setAttribute("srcdoc", createHtml({ css, html, js }));
    }
  }, [html, js, css]);

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
        onChange={(value) => {
          setHtml(value ?? "");
        }}
        options={settings}
        className="editor editor-html"
      />
      <Editor
        theme={settings.theme}
        defaultLanguage="javascript"
        options={settings}
        onChange={(value) => {
          setJs(value ?? "");
        }}
        className="editor editor-js"
      />
      <Editor
        theme={settings.theme}
        defaultLanguage="css"
        options={settings}
        onChange={(value) => {
          setCss(value ?? "");
        }}
        className="editor editor-css"
      />
      <iframe ref={iFrameRef}></iframe>
    </main>
  );
}
