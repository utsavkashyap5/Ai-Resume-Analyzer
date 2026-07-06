export const normalizeAnalysis = (data) => {
  if (!data) return null;

  const analysis = data.analysisResult || data;

  return {
    atsScore: analysis.ats_score ?? analysis.atsScore ?? 0,
    categoryScores: analysis.category_scores ?? analysis.categoryScores ?? {},
    matchedKeywords: analysis.matched_keywords ?? analysis.matchedKeywords ?? [],
    missingKeywords: analysis.missing_keywords ?? analysis.missingKeywords ?? [],
    skillsGap: analysis.skills_gap ?? analysis.skillsGap ?? [],
    strengths: analysis.strengths ?? [],
    weakBullets: analysis.weak_bullets ?? analysis.weakBullets ?? [],
    recommendedProjects: analysis.recommended_projects ?? analysis.recommendedProjects ?? [],
    recommendedCertifications: analysis.recommended_certifications ?? analysis.recommendedCertifications ?? [],
    summary: analysis.summary ?? '',
  };
};

export const getScoreColor = (score) => {
  if (score >= 90) return '#4F7D5C';
  if (score >= 70) return '#D9A441';
  return '#C65A5A';
};

export const getScoreLabel = (score) => {
  if (score >= 90) return 'Excellent Match';
  if (score >= 70) return 'Good Match';
  return 'Needs Improvement';
};

export const getScoreBg = (score) => {
  if (score >= 90) return 'bg-[#4F7D5C]/10 text-[#4F7D5C]';
  if (score >= 70) return 'bg-[#D9A441]/10 text-[#D9A441]';
  return 'bg-[#C65A5A]/10 text-[#C65A5A]';
};

export const categoryLabels = {
  skills: 'Skills',
  experience: 'Experience',
  projects: 'Projects',
  education: 'Education',
  keywords: 'Keywords',
  formatting: 'Formatting',
};

export const categoryIcons = {
  skills: 'Code',
  experience: 'Briefcase',
  projects: 'FolderKanban',
  education: 'GraduationCap',
  keywords: 'Hash',
  formatting: 'Layout',
};
