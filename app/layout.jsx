import "./globals.css";
import localFont from "next/font/local";
import Script from "next/script";
import { THEME_STORAGE_KEY } from "../lib/theme/constants";
import { SITE } from "../lib/staticData/site";
import Providers from "./providers";

const ailato = localFont({
  src: [
    { path: "./assets/fonts/alilato/Alilato-ExtraLight.ttf", weight: "200" },
    { path: "./assets/fonts/alilato/Alilato-Light.ttf", weight: "300" },
    { path: "./assets/fonts/alilato/Alilato-Regular.ttf", weight: "400" },
    { path: "./assets/fonts/alilato/Alilato-Medium.ttf", weight: "500" },
    { path: "./assets/fonts/alilato/Alilato-SemiBold.ttf", weight: "600" },
    { path: "./assets/fonts/alilato/Alilato-Bold.ttf", weight: "700" },
    { path: "./assets/fonts/alilato/Alilato-ExtraBold.ttf", weight: "800" },
  ],
  variable: "--font-ailato",
});

export const metadata = {
  title: { default: SITE.name, template: `%s | ${SITE.name}` },
  description: SITE.description,
};

const themeInitScript = `(function(){try{var k=${JSON.stringify(THEME_STORAGE_KEY)};var t=localStorage.getItem(k);var d=t==="light"||t==="dark"?t:"dark";document.documentElement.setAttribute("data-theme",d);document.documentElement.style.colorScheme=d==="light"?"light":"dark";}catch(e){document.documentElement.setAttribute("data-theme","dark");document.documentElement.style.colorScheme="dark";}})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={ailato.variable}>
        <Script
          id="alminbar-theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
