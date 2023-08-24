import { Theme, ThemePanel } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Theme>
          {children}
        </Theme>
      </body>
    </html>
  );
}
