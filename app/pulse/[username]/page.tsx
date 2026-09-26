import { getGitHubData } from "@/lib/github/api";
import { calculateLanguages } from "@/lib/github/language";
import { generateInsights } from "@/lib/github/parser";
import ProfileHeader from "@/components/pulse/ProfileHeader";
import SignalsMatrix from "@/components/pulse/SignalsMatrix";
import SkillDNA from "@/components/pulse/SkillDNA";
import RepositorySection from "@/components/pulse/RepositorySection";
import RecentActivity from "@/components/pulse/RecentActivity";
import ExportCard from "@/components/pulse/ExportCard";
import PulseNavbar from "@/components/pulse/PulseNavbar";
import ErrorState from "@/components/pulse/ErrorState";

interface Props {
  params: Promise<{ username: string }> | { username: string };
}

export default async function PulsePage({ params }: Props) {
  const resolvedParams = await Promise.resolve(params);
  const username = resolvedParams.username;
  
  // Production-grade data fetch with caching
  const userData = await getGitHubData(username);

  // If user is not found or rate-limited, display ErrorState
  if (!userData) {
    return <ErrorState username={username} />;
  }

  const { user, repos, events } = userData;
  const languages = calculateLanguages(repos);
  const insights = generateInsights(user, repos, events);

  return (
    <main className="min-h-screen bg-background text-white selection:bg-white/20 pb-20">
      <PulseNavbar githubUrl={user.html_url} username={user.login} />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-20 sm:pt-24">
        {/* 1. Executive Dossier Header */}
        <ProfileHeader user={user} insights={insights} />
        
        {/* 2. Four Core Signals Matrix */}
        <SignalsMatrix insights={insights} />

        {/* 3. Skill DNA & Tooling Ecosystem */}
        <SkillDNA 
          languages={languages} 
          techStack={insights.techStack} 
          licenses={insights.licenses} 
        />

        {/* 4. Flagship Repositories (Authored vs Forks) */}
        <RepositorySection repos={repos} />

        {/* 5. Real Public Activity Stream */}
        <RecentActivity events={insights.recentEvents} />

        {/* 6. Recruiter & Peer Export Card */}
        <ExportCard 
          user={user} 
          insights={insights} 
          languages={languages} 
        />
      </div>
    </main>
  );
}