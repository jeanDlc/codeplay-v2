import MonacoEditor, { useMonaco, loader } from "@monaco-editor/react";
import { useEffect } from "react";
import { emmetHTML } from "emmet-monaco-es";
import * as monacoEditor from "monaco-editor";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";

import { useEditorSettingsStore } from "../../store/useSettingStore";
import { useEditorValuesStore } from "../../store/useEditorValues";
import { useLoadMonacoThemes } from "../../hooks/useLoadMonacoThemes";
import classes from "./editor.module.css";

import type { EditorValues } from "../../types/index.types";

self.MonacoEnvironment = {
  getWorker(_, label) {
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

loader.config({ monaco: monacoEditor });

const Editor = ({ lang }: { lang: keyof EditorValues }) => {
  const monaco = useMonaco();

  useLoadMonacoThemes();

  useEffect(() => {
    if (monaco) {
      emmetHTML(monaco);
    }
  }, [monaco]);

  const settings = useEditorSettingsStore(({ settings }) => settings);

  const handleUpdate = useEditorValuesStore(({ update }) => update);

  const values = useEditorValuesStore(({ values }) => values);

  return (
    <div
      className={`${classes["editor-container"]} ${
        classes[`editor-container-${lang}`]
      }`}
    >
      <MonacoEditor
        defaultLanguage={lang}
        theme={settings.theme}
        value={values[lang]}
        onChange={(value) => {
          handleUpdate(lang, value);
        }}
        options={settings}
        className={classes.editor}
      />
    </div>
  );
};

export default Editor;
