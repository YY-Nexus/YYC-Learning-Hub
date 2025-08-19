import type { Metadata, ReactNode } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { BottomNav } from "@/components/bottom-nav";
import "./mobile-styles.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "YanYu Smart Cloud³ Learning Platform - 言枢象限·语启未来",
  description: "万象归元于云枢，深栈智启新纪元 - 专业的AI应用开发学习平台",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover",
  keywords: "AI学习, 人工智能, 云计算, 深度学习, YanYu Smart Cloud",
  authors: [{ name: "YanYu Smart Cloud³ Team" }],
  themeColor: "#3b82f6", // 替代<meta name="theme-color">
  appleWebApp: {         // 统一管理iOS Web App配置
    capable: true,
    statusBarStyle: "default",
    title: "YanYu Smart Cloud³",
  },
    generator: 'v0.app'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN" className="safe-area-inset">
      <head>
        <link rel="icon" href="/images/yanyu-logo.png" />
      </head>
      <body className={`${inter.className} pb-20 md:pb-0`}>
        <ThemeProvider 
          attribute="class" 
          defaultTheme="light" 
          enableSystem 
          disableTransitionOnChange
        >
          <div className="min-h-screen">
            <main className="pb-20 md:pb-0">{children}</main>
            <BottomNav />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
