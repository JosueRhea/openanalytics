import { Container, Theme } from "@radix-ui/themes";
import { Inter } from "next/font/google";
import "@radix-ui/themes/styles.css";
import "./theme-config.css";
import { DashboardNav } from "@/components";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Theme accentColor="gray">
          <Providers>
            <Container>
              <DashboardNav />
              {children}
            </Container>
          </Providers>
        </Theme>
      </body>
    </html>
  );
}
