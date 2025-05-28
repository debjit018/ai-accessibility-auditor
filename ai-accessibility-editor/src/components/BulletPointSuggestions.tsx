import React from 'react';
import { AnalysisResult } from '../types';
import { ListChecks, Copy } from 'lucide-react';

interface BulletPointSuggestionsProps {
  analysisResult: AnalysisResult;
}

const BulletPointSuggestions: React.FC<BulletPointSuggestionsProps> = ({ analysisResult }) => {
  const { recommendedBulletPoints } = analysisResult;

  if (!recommendedBulletPoints || recommendedBulletPoints.length === 0) {
    return (
      <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <p className="text-gray-500 dark:text-gray-400">No bullet point suggestions available yet.</p>
      </div>
    );
  }

  const copyBulletPoint = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <ListChecks className="text-purple-600 dark:text-purple-400" size={20} />
        <h3 className="text-lg font-medium text-gray-800 dark:text-white">Recommended Bullet Points</h3>
      </div>
      
      <div className="space-y-3">
        {recommendedBulletPoints.map((bullet, index) => (
          <div 
            key={index} 
            className="group flex justify-between items-start p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-purple-400 dark:hover:border-purple-500 transition-all"
          >
            <p className="text-gray-800 dark:text-gray-200">{bullet}</p>
            <button 
              onClick={() => copyBulletPoint(bullet)}
              className="ml-2 p-1.5 opacity-0 group-hover:opacity-100 text-gray-500 hover:text-purple-600 dark:text-gray-400 dark:hover:text-purple-400 rounded transition-all"
              title="Copy to clipboard"
            >
              <Copy size={16} />
            </button>
          </div>
        ))}
      </div>
      
      <p className="text-sm text-gray-500 dark:text-gray-400 italic">
        Click on any bullet point to copy it to your clipboard for easy addition to your resume.
      </p>
    </div>
  );
};

export default BulletPointSuggestions;