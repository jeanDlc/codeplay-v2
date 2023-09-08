import { monacoAppThemes } from "../../constants";

export const SettingsOptionsByType = {
  select: [
    {
      key: "theme",
      name: "Theme",
      description: "Specifies the color theme used in the workbench",
      options: monacoAppThemes.map(({ key, name }) => ({
        label: name,
        value: key,
      })),
    },
    {
      key: "lineNumbers",
      name: "Line Numbers",
      description: "Controls the display of line numbers",
      options: [
        { value: "on", label: "On" },
        { value: "off", label: "Off" },
      ],
    },
    {
      key: "wordWrap",
      name: "Word Wrap",
      description: "Controls how lines should wrap.",
      options: [
        { value: "on", label: "On" },
        { value: "off", label: "Off" },
        { value: "wordWrapColumn", label: "Word Wrap column" },
      ],
    },
    {
      key: "cursorStyle",
      name: "Cursor Style",
      description: "Controls the cursor style.",
      options: [
        { value: "line", label: "line" },
        { value: "block", label: "Block" },
        { value: "underline", label: "Underline" },
        { value: "line-thin", label: "Line Thin" },
        { value: "block-outline", label: "Block Outline" },
        { value: "underline-thin", label: "Underline Thin" },
      ],
    },
  ],
  input: [
    {
      key: "fontSize",
      name: "Font Size",
      description: "Controls the font size in px",
      type: "number",
      placeHolder: "17px",
    },
    {
      key: "tabSize",
      name: "Tab Size",
      description: "The number of spaces a tab is equal to",
      type: "number",
      placeHolder: "4",
    },
  ],
} as const;
