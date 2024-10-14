import type { Metadata } from "next";
import { AuthProvider } from "@/hooks/context/useAuth";
import { ThemeProvider } from "@/hooks/context/useTheme";
import { ModalProvider } from "@/hooks/context/useModal";
import { averiaSansLibre } from "@/styles/fonts";
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
        <ThemeProvider>
          <body className={averiaSansLibre.className}>
            <ModalProvider>{children}</ModalProvider>
          </body>
        </ThemeProvider>
      </html>
    </AuthProvider>
  );
}
