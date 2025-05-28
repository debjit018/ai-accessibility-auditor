import React from 'react';
import { AnalysisResult } from '../types';
import KeywordMatch from './KeywordMatch';
import BulletPointSuggestions from './BulletPointSuggestions';
import SummaryGenerator from './SummaryGenerator';
import MatchScore from './MatchScore';
import PDFExport from './PDFExport';
import { Resume } from '../types';

interface AnalysisResultsProps {
  resume: Resume | null;
  analysisResult: AnalysisResult | null;
  isAnalyzing: boolean;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ 
  resume,
  analysisResult, 
  isAnalyzing 
}) => {
  if (isAnalyzing) {
    return (
      <div className="w-full flex flex-col items-center justify-center p-8 space-y-4">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-700 dark:text-gray-300">Analyzing your resume...</p>
      </div>
    );
  }

  if (!analysisResult) {
    return (
      <div className="w-full flex flex-col items-center justify-center p-8 text-center">
        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg max-w-md">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            Ready to optimize your resume?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Paste your resume and a job description to receive AI-powered suggestions 
            for tailoring your resume to the specific position.
          </p>
          <ul className="text-left text-gray-700 dark:text-gray-300 space-y-2 mb-4">
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 bg-blue-600 rounded-full"></span>
              <span>Identify missing keywords</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 bg-blue-600 rounded-full"></span>
              <span>Get tailored bullet point suggestions</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 bg-blue-600 rounded-full"></span>
              <span>Generate a custom professional summary</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="h-2 w-2 bg-blue-600 rounded-full"></span>
              <span>See your resume-to-job match score</span>
            </li>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <MatchScore analysisResult={analysisResult} />
        <KeywordMatch analysisResult={analysisResult} />
      </div>
      
      <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
        <SummaryGenerator analysisResult={analysisResult} />
      </div>
      
      <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
        <BulletPointSuggestions analysisResult={analysisResult} />
      </div>
      
      <div className="pt-6">
        <PDFExport resume={resume} analysisResult={analysisResult} />
      </div>
    </div>
  );
};

export default AnalysisResults;