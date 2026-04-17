export const catColors: Record<string, string> = { 
  General: "cat-general", 
  Research: "cat-research", 
  Business: "cat-business", 
  Ethics: "cat-ethics", 
  Tools: "cat-tools", 
  Policy: "cat-policy", 
  Robotics: "cat-robotics", 
  Healthcare: "cat-healthcare",
  Agents: "cat-general",
  Generative: "cat-general",
  Security: "cat-general",
  Tutorials: "cat-general"
};

export function getCatClass(cat: string) { 
  return catColors[cat] || "cat-general"; 
}

export function getCatGrad(cat: string) {
  const m: Record<string, string> = { 
    Research: "#1e1035,#0a1525", 
    Business: "#0a1525,#0c2a1a", 
    Healthcare: "#1a1a2e,#0c2a1a", 
    Policy: "#2a1e0a,#1a1a2e", 
    Tools: "#0a2a1a,#0a1525", 
    Ethics: "#2a1a1a,#1a1a2e", 
    Robotics: "#0a2a2a,#0a1525", 
    Music: "#1a0a2a,#0a1525" 
  };
  return m[cat] || "#1e1035,#0a1525";
}
