import React from 'react';
import { AnalysisResult } from '../types';
import { Check, X } from 'lucide-react';

interface KeywordMatchProps {
  analysisResult: AnalysisResult;
}

const KeywordMatch: React.FC<KeywordMatchProps> = ({ analysisResult }) => {
  const { keywordMatches } = analysisResult;

  if (!keywordMatches || keywordMatches.length === 0) {
    return (
      <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <p className="text-gray-500 dark:text-gray-400">No keywords analyzed yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-800 dark:text-white">Keyword Analysis</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {keywordMatches.map((match, index) => (
          <div 
            key={index}
            className={`flex items-center justify-between p-3 rounded-lg transition-all ${
              match.found 
                ? 'bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800' 
                : 'bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800'
            }`}
          >
            <span className={`font-medium ${
              match.found 
                ? 'text-green-800 dark:text-green-300' 
                : 'text-red-800 dark:text-red-300'
            }`}>
              {match.keyword}
            </span>
            
            {match.found ? (
              <Check className="text-green-600 dark:text-green-400" size={18} />
            ) : (
              <X className="text-red-600 dark:text-red-400" size={18} />
            )}
          </div>
        ))}
      </div>
      
      {analysisResult.missingKeywords.length > 0 && (
        <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
          <h4 className="font-medium text-amber-800 dark:text-amber-300 mb-2">
            Missing Keywords
          </h4>
          <p className="text-amber-700 dark:text-amber-200">
            Consider adding these keywords to your resume: 
            <span className="font-semibold">
              {' ' + analysisResult.missingKeywords.join(', ')}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default KeywordMatch;