import type { Metadata } from "next";
import { AuthProvider } from "@/hooks/context/useAuth";
import { ThemeProvider } from "@/hooks/context/useTheme";
import { MobileProvider } from "@/hooks/context/useMobile";
import Body from "@/components/Body";
import "@/styles/globals.scss";

export const metadata: Metadata = {
  title: "Cactus Comida Boa",
  description: "Site da lanchonete Cactus Comida Boa.",
  icons: { icon: ["/icone.png?v=4"] },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="pt-br">
        <MobileProvider>
          <ThemeProvider>
            <Body>{children}</Body>
          </ThemeProvider>
        </MobileProvider>
      </html>
    </AuthProvider>
  );
}
