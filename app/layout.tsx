import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rust in Ouderschap | Quiz",
  description:
    "Een rustige, premium quizfunnel voor ouders die meer rust en verbinding zoeken.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-ZM5MS0K5W4"
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', 'G-ZM5MS0K5W4');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
