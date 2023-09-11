import { encode, decode } from "js-base64"; //now can encode emojis

export const url = {
  getState() {
    const { pathname } = window.location;
    const [html, css, js] = pathname.slice(1).split("%7C");
    return {
      html: decode(html || ""),
      css: decode(css || ""),
      js: decode(js || ""),
    };
  },
  setState(state: { html: string; css: string; js: string }) {
    const { html, css, js } = state;
    const hashedCode = `${encode(html)}|${encode(css)}|${encode(js)}`;
    window.history.replaceState(null, "", `/${hashedCode}`);
  },
};
