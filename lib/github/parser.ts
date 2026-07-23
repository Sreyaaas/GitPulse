import { GitHubRepo, GitHubUser } from "@/types/github";

export function generateInsights(user: GitHubUser, repos: GitHubRepo[]) {
  // 1. Health Score Calculation
  const starCount = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
  const followerWeight = user.followers * 2;
  const repoWeight = user.public_repos * 5;
  const rawScore = (starCount * 10) + followerWeight + repoWeight;
  const healthScore = Math.min(Math.max(Math.floor(rawScore / 15) + 40, 50), 98);

  // 2. EXPANDED ARCHETYPE MATRIX (Scanning for Tinkerers, Hardware, Mobile, Security, Gaming, AI, etc.)
  let hardwareScore = 0;
  let mobileScore = 0;
  let securityScore = 0;
  let gameDevScore = 0;
  let web3Score = 0;
  let aiScore = 0;
  let devopsScore = 0;
  let systemsScore = 0;
  let frontendScore = 0;
  let backendScore = 0;
  let makerScore = 0; // For home labs, dotfiles, scrapers, tinkerers

  repos.forEach(repo => {
    const name = repo.name.toLowerCase();
    const desc = (repo.description || "").toLowerCase();
    const lang = (repo.language || "").toLowerCase();
    const topics = repo.topics ? repo.topics.map(t => t.toLowerCase()) : [];

    // Hardware / IoT / Electrical Tinkerer
    if (
      topics.some(t => ["arduino", "raspberry-pi", "esp32", "firmware", "hardware", "iot", "microcontroller", "embedded", "electronics", "pcb", "circuit", "stm32", "robotics", "sensors", "soldering", "fpga"].includes(t)) ||
      name.includes("arduino") || name.includes("pi") || name.includes("firmware") || name.includes("esp") ||
      ["verilog", "vhdl", "arduino"].includes(lang) ||
      desc.includes("hardware") || desc.includes("microcontroller") || desc.includes("sensor") || desc.includes("circuit")
    ) {
      hardwareScore += 4;
    }

    // Mobile App Developer
    if (
      topics.some(t => ["flutter", "react-native", "ios", "android", "swiftui", "mobile", "jetpack-compose", "kotlin", "swift"].includes(t)) ||
      ["dart", "swift", "kotlin", "objective-c"].includes(lang) ||
      desc.includes("mobile app") || desc.includes("ios app") || desc.includes("android app")
    ) {
      mobileScore += 3;
    }

    // Security & Crypto / SecOps Researcher
    if (
      topics.some(t => ["security", "pentest", "exploit", "cryptography", "ctf", "malware", "cybersecurity", "infosec", "hacking", "reverse-engineering"].includes(t)) ||
      desc.includes("security") || desc.includes("exploit") || desc.includes("penetration") || desc.includes("ctf")
    ) {
      securityScore += 4;
    }

    // Game Developer
    if (
      topics.some(t => ["gamedev", "unity", "unreal-engine", "godot", "shader", "game-development", "game"].includes(t)) ||
      ["gdscript", "hlsl", "glsl"].includes(lang) ||
      desc.includes("game engine") || desc.includes("game dev")
    ) {
      gameDevScore += 3;
    }

    // Web3 / Blockchain Builder
    if (
      topics.some(t => ["smart-contracts", "ethereum", "web3", "solidity", "defi", "blockchain", "crypto", "evm", "rust"].includes(t)) ||
      ["solidity", "vyper", "move"].includes(lang) ||
      desc.includes("smart contract") || desc.includes("solidity")
    ) {
      web3Score += 3;
    }

    // AI / ML Engineer
    if (
      topics.some(t => ["ai", "machine-learning", "deep-learning", "llm", "openai", "pytorch", "tensorflow", "nlp", "cv", "neural-network"].includes(t)) ||
      desc.includes("ai") || desc.includes("machine learning") || desc.includes("llm") || desc.includes("model") ||
      ["jupyter notebook"].includes(lang)
    ) {
      aiScore += 3;
    }

    // DevOps & Cloud Architect
    if (
      topics.some(t => ["devops", "docker", "kubernetes", "terraform", "aws", "ci-cd", "cloud", "ansible", "dockerfile", "linux"].includes(t)) ||
      name.includes("docker") || name.includes("k8s") || name.includes("terraform") ||
      ["dockerfile", "hcl", "shell"].includes(lang)
    ) {
      devopsScore += 3;
    }

    // Systems Programmer
    if (
      ["rust", "c", "c++", "zig", "assembly"].includes(lang) && hardwareScore === 0
    ) {
      systemsScore += 2;
    }

    // The Maker / Scraper / Tinkerer (Dotfiles, home server, automation scripts)
    if (
      topics.some(t => ["dotfiles", "home-assistant", "automation", "scripts", "homelab", "scraper", "tinker", "hack", "linux-riced", "tmux"].includes(t)) ||
      name.includes("dotfiles") || name.includes("config") || name.includes("script") || name.includes("bot")
    ) {
      makerScore += 2;
    }

    // Frontend Signals
    if (["typescript", "javascript", "css", "html", "vue", "svelte"].includes(lang)) {
      frontendScore += 1;
    }

    // Backend Signals
    if (["python", "go", "java", "ruby", "php", "c#"].includes(lang)) {
      backendScore += 1;
    }
  });

  // Tally all scores to find the precise archetype fit
  const archetypes = [
    { name: "Hardware & IoT Tinkerer", score: hardwareScore },
    { name: "Security & SecOps Researcher", score: securityScore },
    { name: "AI/ML Engineer", score: aiScore },
    { name: "Game Developer", score: gameDevScore },
    { name: "Mobile Architect", score: mobileScore },
    { name: "DevOps & Cloud Architect", score: devopsScore },
    { name: "Web3 / Smart Contract Dev", score: web3Score },
    { name: "Systems Programmer", score: systemsScore },
    { name: "The Maker & Automator", score: makerScore },
    { name: "Frontend Architect", score: frontendScore },
    { name: "Backend Engineer", score: backendScore },
  ];
  
  archetypes.sort((a, b) => b.score - a.score);

  let archetype = "Full Stack Engineer";
  if (starCount > 1000) {
    archetype = "Open Source Maintainer";
  } else if (archetypes[0].score > 1) {
    archetype = archetypes[0].name;
  }

  // 3. Tech Stack Radar (Deducing frameworks from topics/names)
  const stackSet = new Set<string>();
  repos.forEach(repo => {
    repo.topics?.forEach(topic => stackSet.add(topic));
    const name = repo.name.toLowerCase();
    if (name.includes("react") || name.includes("next")) stackSet.add("react");
    if (name.includes("docker")) stackSet.add("docker");
    if (name.includes("tailwind")) stackSet.add("tailwind css");
    if (name.includes("node")) stackSet.add("node.js");
    if (name.includes("arduino") || name.includes("pi")) stackSet.add("embedded / iot");
  });
  const techStack = Array.from(stackSet).slice(0, 8);

  // 4. Trophy Cabinet
  const achievements: string[] = [];
  const accountAgeYears = new Date().getFullYear() - new Date(user.created_at).getFullYear();
  
  if (accountAgeYears >= 4) achievements.push("Old Guard (4+ Years)");
  if (starCount >= 100) achievements.push(`Star Collector (${starCount} ⭐)`);
  if (user.public_repos >= 30) achievements.push("Prolific Builder (30+ Repos)");
  if (repos.some(r => r.forks_count > 20)) achievements.push("Trendsetter (High Forks)");
  if (hardwareScore > 0) achievements.push("Hardware Hacker 🔌");
  if (securityScore > 0) achievements.push("Cyber Security Buff 🛡️");
  if (achievements.length === 0) achievements.push("Early Adopter");

  // 5. Workflow Rhythm
  const recentUpdates = repos.filter(r => {
    const updateYear = new Date(r.updated_at).getFullYear();
    return updateYear >= 2024;
  }).length;
  const rhythm = recentUpdates > 5 ? "High-Velocity Shipper" : "Steady Maintainer";

  // 6. Code Quality & Maintenance Index
  const maintainedRepos = repos.filter(r => {
    const diffMonths = (new Date().getTime() - new Date(r.updated_at).getTime()) / (1000 * 60 * 60 * 24 * 30);
    return diffMonths <= 6;
  }).length;
  
  const maintenanceIndex = repos.length > 0 ? Math.round((maintainedRepos / Math.min(repos.length, 20)) * 100) : 70;

  return { healthScore, archetype, techStack, achievements, rhythm, maintenanceIndex, starCount };
}

export function getTopRepos(repos: GitHubRepo[]) {
  return [...repos]
    .sort((a, b) => {
      const scoreA = a.stargazers_count * 2 + a.forks_count;
      const scoreB = b.stargazers_count * 2 + b.forks_count;
      return scoreB - scoreA;
    })
    .slice(0, 6);
}