import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/landing/Hero";
import SearchInput from "@/components/landing/SearchInput";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden select-none">
      <Navbar />
      
      {/* Centered Hero & Search Input */}
      <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 z-10 flex flex-col items-center justify-center my-auto py-24 sm:py-28">
        <Hero />
        <SearchInput />
      </main>

      {/* Clean Minimal Footer */}
      <footer className="w-full py-6 text-center text-xs text-zinc-500 z-10 bg-transparent">
        <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/[0.06] pt-5">
          <div className="text-zinc-500 font-medium">
            GitPulse
          </div>

          <div>
            Built by{" "}
            <a 
              href="https://sreyassai.online" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-zinc-400 font-medium underline decoration-zinc-600 hover:text-white transition-colors"
            >
              Sreyas Sai
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}