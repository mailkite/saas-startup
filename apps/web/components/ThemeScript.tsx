import Script from 'next/script';

export function ThemeScript() {
  return (
    <Script id="theme-script" strategy="beforeInteractive">
      {`
        (function () {
          try {
            var stored = localStorage.getItem("theme");
            var theme = stored || (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
            document.documentElement.dataset.theme = theme;
          } catch (e) {
            document.documentElement.dataset.theme = "dark";
          }
        })();
      `}
    </Script>
  );
}
