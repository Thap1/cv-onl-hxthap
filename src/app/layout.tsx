import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { CursorEffect } from "@/components/ui/CursorEffect";
import { FloatingParticles } from "@/components/ui/FloatingParticles";
import { ThemeProvider } from "@/contexts/ThemeContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hoàng Xuân Tháp | Frontend Lead Developer",
  description:
    "Frontend Lead Developer với 7+ năm kinh nghiệm phát triển ứng dụng web với React, Vue.js, và các công nghệ hiện đại.",
  keywords: [
    "Frontend Developer",
    "React",
    "Vue.js",
    "TypeScript",
    "JavaScript",
    "Web Developer",
    "Vietnam",
  ],
  authors: [{ name: "Hoàng Xuân Tháp" }],
  openGraph: {
    title: "Hoàng Xuân Tháp | Frontend Lead Developer",
    description: "Frontend Lead Developer với 7+ năm kinh nghiệm",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} className="scroll-smooth" suppressHydrationWarning>
      <body className="bg-background text-foreground overflow-x-hidden">
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>
            <FloatingParticles />
            <CursorEffect />
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
