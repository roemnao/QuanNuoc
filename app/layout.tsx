import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";

const font = Be_Vietnam_Pro({ subsets: ["vietnamese", "latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-be-vietnam" });

export const metadata: Metadata = {
  title: "NHANH. – Cà phê mang đi",
  description: "Đặt món trong 3 chạm, nhận số thứ tự, tới quầy lấy ly.",
};
export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" className={font.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
