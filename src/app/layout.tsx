import type { Metadata } from "next";
import { Averia_Sans_Libre } from "next/font/google";
import { AuthProvider } from "@/hooks/useAuth";
import "./globals.scss";

const averiaSansLibre = Averia_Sans_Libre({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
});

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
