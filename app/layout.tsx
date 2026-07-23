import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ThemeProvider } from "@/components/shared/ThemeProvider";
import GeminiBackground from "@/components/landing/GeminiBackground";
import MouseSpotlight from "@/components/landing/MouseSpotlight"; // Import here
import "../styles/globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "GitPulse | Know any developer in seconds",
  description: "Executive summaries for GitHub profiles inspired by premium design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable} suppressHydrationWarning>
      <body className="antialiased font-sans relative min-h-screen bg-background text-white selection:bg-white/20" suppressHydrationWarning>
        <ThemeProvider>
          <div className="noise" />
          <GeminiBackground />
          <MouseSpotlight /> {/* Active globally */}
          
          <div className="relative z-10 flex flex-col min-h-screen justify-between">
            <div className="flex-grow">
              {children}
            </div>
            
          
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}