import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/landing/Hero";
import SearchInput from "@/components/landing/SearchInput";

export default function LandingPage() {
  return (
    <div className="relative h-screen w-screen overflow-hidden flex flex-col justify-between select-none">
      <Navbar />
      
      {/* Centered Hero & Search Engine */}
      <div className="w-full max-w-5xl mx-auto px-6 z-10 flex flex-col items-center justify-center my-auto">
        <Hero />
        <SearchInput />
      </div>

      {/* Pinned Footer on Landing Page */}
      <footer className="w-full py-5 text-center text-xs text-zinc-500 font-medium tracking-wider z-10 bg-transparent">
        Built with precision by{" "}
        <a 
          href="https://sreyassai.online" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-white font-semibold underline decoration-blue-500/50 hover:decoration-blue-400 hover:text-blue-400 transition-all"
        >
          Sreyas Sai
        </a>
      </footer>
    </div>
  );
}