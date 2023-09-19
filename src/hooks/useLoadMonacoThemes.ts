/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMonaco } from "@monaco-editor/react";
import { useEffect } from "react";
import { monacoAppThemes } from "../constants";
import { useEditorSettingsStore } from "../store/useSettingStore";

export const useLoadMonacoThemes = () => {
  const monaco = useMonaco();
  const settings = useEditorSettingsStore(({ settings }) => settings);

  useEffect(() => {
    if (monaco) {
      (async () => {
        const externalThemes = monacoAppThemes.filter(({ fetcher }) =>
          Boolean(fetcher)
        );

        const themesConfig = await Promise.all(
          externalThemes.map(({ fetcher }) => fetcher)
        );

        const themes = themesConfig.map((data, index) => {
          const key = externalThemes[index].key;
          return {
            key,
            data,
          };
        });

        themes.forEach(({ data, key }) => {
          monaco.editor.defineTheme(key, data as any);
        });

        //after loading the themes for the first time, set the theme previously selected by the user
        if (settings.theme) monaco.editor.setTheme(settings.theme);
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monaco]);
};
