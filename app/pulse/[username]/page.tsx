import { getGitHubData } from "@/lib/github/api";
import { calculateLanguages } from "@/lib/github/language";
import { generateInsights, getTopRepos } from "@/lib/github/parser";
import ProfileHeader from "@/components/pulse/ProfileHeader";
import SkillDNA from "@/components/pulse/SkillDNA";
import Persona from "@/components/pulse/Persona";
import HealthScore from "@/components/pulse/HealthScore";
import TechStack from "@/components/pulse/TechStack";
import Achievements from "@/components/pulse/Achievements";
import QualityAuditor from "@/components/pulse/QualityAuditor";
import ExportCard from "@/components/pulse/ExportCard";
import RepositoryGrid from "@/components/pulse/RepositoryGrid";
import PulseNavbar from "@/components/pulse/PulseNavbar";
import ErrorState from "@/components/pulse/ErrorState";

interface Props {
  params: Promise<{ username: string }> | { username: string };
}

export default async function PulsePage({ params }: Props) {
  const resolvedParams = await Promise.resolve(params);
  const username = resolvedParams.username;
  
  // Clean, non-throwing data fetch
  const userData = await getGitHubData(username);

  // If user is not found or rate-limited, smoothly display your custom ErrorState
  if (!userData) {
    return <ErrorState username={username} />;
  }

  const { user, repos } = userData;
  const languages = calculateLanguages(repos);
  const { healthScore, archetype, techStack, achievements, rhythm, maintenanceIndex } = generateInsights(user, repos);
  const topRepos = getTopRepos(repos);

  return (
    <main className="min-h-screen bg-background text-white selection:bg-white/20">
      <PulseNavbar githubUrl={user.html_url} username={user.login} />
      
      <div className="max-w-7xl mx-auto px-8 pb-32 pt-28">
        <ProfileHeader user={user} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 max-w-4xl mx-auto">
          <Persona archetype={archetype} />
          <HealthScore score={healthScore} />
        </div>

        <QualityAuditor maintenanceIndex={maintenanceIndex} totalRepos={user.public_repos} />
        <TechStack stack={techStack} />
        <Achievements achievements={achievements} rhythm={rhythm} />
        <SkillDNA languages={languages} />
        <RepositoryGrid repos={topRepos} />

        <div className="mt-24">
          <ExportCard user={user} archetype={archetype} score={healthScore} />
        </div>
      </div>
    </main>
  );
}