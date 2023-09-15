import { encode, decode } from "js-base64"; //now can encode emojis
import type { EditorValues } from "../types/index.types";

export const url = {
  /**
   * @description get the decoded values of the editor from the url
   */
  getDecodedValues() {
    const { pathname } = window.location;
    const [html, css, js] = pathname.slice(1).split("%7C");
    return {
      html: decode(html || ""),
      css: decode(css || ""),
      js: decode(js || ""),
    };
  },
  /**
   * @description Set the Editor values in the url
   */
  saveEncodedValues(values: EditorValues) {
    const { html, css, js } = values;
    const hashedCode = `${encode(html)}|${encode(css)}|${encode(js)}`;
    window.history.replaceState(null, "", `/${hashedCode}`);
  },
};
