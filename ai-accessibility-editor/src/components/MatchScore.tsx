import React from 'react';
import { AnalysisResult } from '../types';
import { Target } from 'lucide-react';

interface MatchScoreProps {
  analysisResult: AnalysisResult;
}

const MatchScore: React.FC<MatchScoreProps> = ({ analysisResult }) => {
  const { matchScore } = analysisResult;
  
  if (!matchScore && matchScore !== 0) {
    return null;
  }
  
  // Determine color and message based on score
  let color = '';
  let ringColor = '';
  let message = '';
  
  if (matchScore >= 80) {
    color = 'text-green-600 dark:text-green-400';
    ringColor = 'ring-green-600 dark:ring-green-400';
    message = 'Excellent match! Your resume aligns well with this job.';
  } else if (matchScore >= 60) {
    color = 'text-blue-600 dark:text-blue-400';
    ringColor = 'ring-blue-600 dark:ring-blue-400';
    message = 'Good match. With a few tweaks, your resume will be even stronger.';
  } else if (matchScore >= 40) {
    color = 'text-amber-600 dark:text-amber-400';
    ringColor = 'ring-amber-600 dark:ring-amber-400';
    message = 'Moderate match. Consider adding more relevant keywords and experiences.';
  } else {
    color = 'text-red-600 dark:text-red-400';
    ringColor = 'ring-red-600 dark:ring-red-400';
    message = 'Low match. Significant revisions recommended to align with this job.';
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex items-center gap-2">
        <Target className={`${color}`} size={20} />
        <h3 className="text-lg font-medium text-gray-800 dark:text-white">Resume Match Score</h3>
      </div>
      
      <div className={`relative w-36 h-36 rounded-full flex items-center justify-center ring-8 ${ringColor} bg-white dark:bg-gray-800`}>
        <div className="text-4xl font-bold flex items-baseline">
          <span className={`${color}`}>{matchScore}</span>
          <span className="text-lg text-gray-500 dark:text-gray-400">%</span>
        </div>
        
        <svg className="absolute inset-0" width="144" height="144" viewBox="0 0 144 144">
          <circle 
            cx="72" 
            cy="72" 
            r="66" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="12"
            strokeDasharray={`${matchScore * 4.14} 414`}
            strokeLinecap="round"
            className={`${color} transform -rotate-90 origin-center`}
          />
        </svg>
      </div>
      
      <p className="text-center text-gray-700 dark:text-gray-300 max-w-xs">
        {message}
      </p>
    </div>
  );
};

export default MatchScore;