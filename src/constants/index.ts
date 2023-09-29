import type { IconProps } from "../types/index.types";

export const EDITOR_COMMON_OPTIONS = {
  automaticLayout: true,
  fixedOverflowWidgets: true,
  scrollBeyondLastLine: false,
  roundedSelection: false,
  padding: {
    top: 16,
  },
  bracketPairColorization: { enabled: true },
} as const;

export enum MonacoAppThemeKey {
  VS_DARK = "vs-dark",
  LIGHT = "light",
  GITHUB_DARK = "github-dark",
  DRACULA = "dracula",
  MONOKAI_BRIGHT = "monokai-bright",
  SOLARIZED_DARK = "solarized-dark",
  NIGHT_OWL = "night-owl",
  CHROME_DEV_TOOLS = "chrome-dev-tools",
  ACTIVE_4D = "active-4d",
  TOMORROW = "tomorrow",
  TOMORROW_NIGHT = "tomorrow-night",
}

export const monacoAppThemes = [
  { key: MonacoAppThemeKey.VS_DARK, name: "VS Dark" },
  { key: MonacoAppThemeKey.LIGHT, name: "Light" },
  {
    key: MonacoAppThemeKey.MONOKAI_BRIGHT,
    name: "Monokai Bright",
    fetcher: import("monaco-themes/themes/Monokai Bright.json"),
  },
  {
    key: MonacoAppThemeKey.GITHUB_DARK,
    name: "Github Dark",
    fetcher: import("monaco-themes/themes/GitHub Dark.json"),
  },
  {
    key: MonacoAppThemeKey.SOLARIZED_DARK,
    name: "Solarized Dark",
    fetcher: import("monaco-themes/themes/Solarized-dark.json"),
  },
  {
    key: MonacoAppThemeKey.DRACULA,
    name: "Dracula",
    fetcher: import("monaco-themes/themes/Dracula.json"),
  },
  {
    key: MonacoAppThemeKey.NIGHT_OWL,
    name: "Night Owl",
    fetcher: import("monaco-themes/themes/Night Owl.json"),
  },
  {
    key: MonacoAppThemeKey.CHROME_DEV_TOOLS,
    name: "Chrome dev tools",
    fetcher: import("monaco-themes/themes/Chrome DevTools.json"),
  },
  {
    key: MonacoAppThemeKey.ACTIVE_4D,
    name: "Active 4D",
    fetcher: import("monaco-themes/themes/Active4D.json"),
  },
  {
    key: MonacoAppThemeKey.TOMORROW,
    name: "Tomorrow",
    fetcher: import("monaco-themes/themes/Tomorrow.json"),
  },
  {
    key: MonacoAppThemeKey.TOMORROW_NIGHT,
    name: "Tomorrow Night",
    fetcher: import("monaco-themes/themes/Tomorrow-Night.json"),
  },
];

export const DEFAULT_ICON_PROPS: IconProps = {
  color: "black",
  outline: true,
};

export const BREAKPOINTS = {
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400,
};
