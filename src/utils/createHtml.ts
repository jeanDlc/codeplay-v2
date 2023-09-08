type CreateHtmlProps = {
  html: string;
  js: string;
  css: string;
};

export function createHtml({ html, js, css }: CreateHtmlProps) {
  return `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <style> ${css} </style>
          </head>
          
          <body>
            ${html}
            <script> ${js} </script>
          </body>
          
        </html>
      `;
}
