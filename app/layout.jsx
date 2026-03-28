import "./globals.css";
import localFont from "next/font/local";
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

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={ailato.variable}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
