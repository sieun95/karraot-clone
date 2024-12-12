import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import BottomNav from "@/components/common/BottomNav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <main className="pb-[72px]">{children}</main>
          <BottomNav />
        </ThemeProvider>
      </body>
    </html>
  );
}
