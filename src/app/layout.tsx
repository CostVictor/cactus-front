import type { Metadata } from "next";
import { averiaSansLibre } from "@/styles/fonts";
import { AuthProvider } from "@/hooks/context/useAuth";
import { MobileProvider } from "@/hooks/context/useMobile";
import { ModalProvider } from "@/hooks/context/useModal";
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
    <html lang="pt-br">
      <body className={averiaSansLibre.className}>
        <AuthProvider>
          <MobileProvider>
            <ModalProvider>{children}</ModalProvider>
          </MobileProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
