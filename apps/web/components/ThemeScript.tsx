export function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function () {
            try {
              var stored = localStorage.getItem("theme");
              var theme = stored || (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
              document.documentElement.dataset.theme = theme;
            } catch (e) {
              document.documentElement.dataset.theme = "dark";
            }
          })();
        `,
      }}
    />
  );
}
