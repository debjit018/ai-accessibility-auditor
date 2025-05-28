import React, { useState } from 'react';
import { AnalysisResult } from '../types';
import { Sparkles, Copy, RefreshCw } from 'lucide-react';

interface SummaryGeneratorProps {
  analysisResult: AnalysisResult;
}

const SummaryGenerator: React.FC<SummaryGeneratorProps> = ({ analysisResult }) => {
  const [copied, setCopied] = useState(false);
  
  const { suggestedSummary } = analysisResult;

  if (!suggestedSummary) {
    return (
      <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <p className="text-gray-500 dark:text-gray-400">No summary generated yet.</p>
      </div>
    );
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(suggestedSummary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="text-blue-600 dark:text-blue-400" size={20} />
          <h3 className="text-lg font-medium text-gray-800 dark:text-white">AI-Generated Summary</h3>
        </div>
        
        <button 
          className="p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 rounded transition-colors"
          title="Regenerate summary"
        >
          <RefreshCw size={18} />
        </button>
      </div>
      
      <div className="relative p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <p className="text-gray-800 dark:text-gray-200 leading-relaxed">{suggestedSummary}</p>
        
        <button
          onClick={copyToClipboard}
          className="absolute top-3 right-3 p-1.5 bg-white dark:bg-gray-800 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 rounded shadow-sm transition-colors"
          title="Copy to clipboard"
        >
          {copied ? (
            <Check size={16} className="text-green-600" />
          ) : (
            <Copy size={16} />
          )}
        </button>
      </div>
      
      <p className="text-sm text-gray-500 dark:text-gray-400 italic">
        This AI-generated summary is tailored to match the job description while highlighting your strengths.
      </p>
    </div>
  );
};

// Importing Check icon for the copied state
import { Check } from 'lucide-react';

export default SummaryGenerator;