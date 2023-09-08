/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMonaco } from "@monaco-editor/react";
import { useEffect } from "react";
import { MonacoAppThemeKey } from "../constants";
import { useEditorSettingsStore } from "../store/useSettingStore";

export const useLoadMonacoThemes = () => {
  const monaco = useMonaco();
  const settings = useEditorSettingsStore(({ settings }) => settings);

  useEffect(() => {
    if (monaco) {
      (async () => {
        //! Be careful with the order of the imports
        const themesConfig = await Promise.all([
          import("monaco-themes/themes/Monokai Bright.json"),
          import("monaco-themes/themes/GitHub Dark.json"),
          import("monaco-themes/themes/Solarized-dark.json"),
          import("monaco-themes/themes/Dracula.json"),
        ]);

        const themes = themesConfig.map((data, index) => {
          let key = "";
          if (index === 0) key = MonacoAppThemeKey.MONOKAI_BRIGHT;
          if (index === 1) key = MonacoAppThemeKey.GITHUB_DARK;
          if (index === 2) key = MonacoAppThemeKey.SOLARIZED_DARK;
          if (index === 3) key = MonacoAppThemeKey.DRACULA;
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
