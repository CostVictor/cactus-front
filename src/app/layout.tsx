import type { Metadata } from "next";
import { averiaSansLibre } from "@/styles/fonts";
import { AuthProvider } from "@/hooks/useAuth";
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
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
