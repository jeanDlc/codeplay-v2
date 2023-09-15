/**common types */

export type EditorValues = { html: string; css: string; js: string };

export type Snackbar = {
  message: string;
  id: number | string;
  variation: "info" | "warning" | "danger";
};

export type IconProps = {
  color?: string;
  outline?: boolean;
};

/** custom utility */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
