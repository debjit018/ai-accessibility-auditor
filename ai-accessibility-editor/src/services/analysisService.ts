import { Resume, JobDescription, AnalysisResult } from '../types';

// This is a mock service that simulates AI analysis
// In a real app, this would call an actual AI service API
export const analyzeResume = (resume: Resume, jobDescription: JobDescription): AnalysisResult => {
  // Extract keywords from job description
  const jobKeywords = extractKeywords(jobDescription.fullText);
  
  // Find which keywords are missing from the resume
  const resumeText = resume.fullText.toLowerCase();
  const missingKeywords = jobKeywords.filter(
    keyword => !resumeText.includes(keyword.toLowerCase())
  );
  
  // Calculate match score (simplified)
  const foundKeywords = jobKeywords.length - missingKeywords.length;
  const matchScore = Math.round((foundKeywords / jobKeywords.length) * 100);
  
  // Generate keyword matches data
  const keywordMatches = jobKeywords.map(keyword => ({
    keyword,
    found: resumeText.includes(keyword.toLowerCase())
  }));
  
  // Generate recommended bullet points (mock data for demo)
  const recommendedBulletPoints = generateBulletPoints(resume, missingKeywords);
  
  // Generate suggested summary
  const suggestedSummary = generateSummary(resume, jobDescription);
  
  return {
    matchScore,
    missingKeywords,
    recommendedBulletPoints,
    suggestedSummary,
    keywordMatches
  };
};

// Extract important keywords from job description
const extractKeywords = (text: string): string[] => {
  // In a real app, this would use AI to extract keywords
  // For the demo, we'll use a simplified approach
  const commonWords = new Set([
    'and', 'the', 'a', 'an', 'in', 'on', 'at', 'to', 'for', 'with', 'by', 'of',
    'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had',
    'do', 'does', 'did', 'will', 'would', 'shall', 'should', 'can', 'could',
    'may', 'might', 'must', 'from', 'as', 'we', 'our', 'us', 'this', 'that',
    'these', 'those', 'you', 'your'
  ]);
  
  const words = text.toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => !commonWords.has(word) && word.length > 3);
  
  // Count frequency
  const wordFrequency = words.reduce((acc, word) => {
    acc[word] = (acc[word] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  // Get top keywords
  return Object.entries(wordFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15)
    .map(([word]) => word);
};

// Generate bullet points recommendations
const generateBulletPoints = (resume: Resume, missingKeywords: string[]): string[] => {
  // In a real app, this would use AI to generate tailored bullet points
  // For the demo, we'll use templates with the missing keywords
  
  if (missingKeywords.length === 0) {
    return [
      "Your resume already contains all important keywords!",
      "Consider expanding on your experience with quantifiable achievements."
    ];
  }
  
  return [
    `Implemented solutions utilizing ${missingKeywords[0] || 'relevant technology'} to improve process efficiency by 30%`,
    `Led team projects involving ${missingKeywords[1] || 'key skill'} resulting in significant business impact`,
    `Developed ${missingKeywords[2] || 'systems'} that improved operational workflow by 25%`,
    `Applied knowledge of ${missingKeywords[0] || 'technology'} and ${missingKeywords[1] || 'methodology'} to solve complex problems`
  ].filter(() => Math.random() > 0.2); // Randomly filter to vary the output
};

// Generate a suggested summary
const generateSummary = (resume: Resume, jobDescription: JobDescription): string => {
  // In a real app, this would use AI to generate a tailored summary
  // For the demo, we'll use a template
  
  const keywords = jobDescription.keywords.slice(0, 3).join(', ');
  
  return `Experienced professional with a strong background in ${keywords}. \
Proven track record of delivering high-quality results in fast-paced environments. \
Looking to leverage my expertise in ${jobDescription.keywords[0] || 'relevant area'} \
to drive success as a valuable team member.`;
};