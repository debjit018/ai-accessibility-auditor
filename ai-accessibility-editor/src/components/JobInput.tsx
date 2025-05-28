import React, { useState } from 'react';
import { JobDescription } from '../types';
import { Briefcase, Upload } from 'lucide-react';

interface JobInputProps {
  onJobChange: (job: JobDescription) => void;
}

const JobInput: React.FC<JobInputProps> = ({ onJobChange }) => {
  const [jobText, setJobText] = useState('');

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setJobText(text);
    
    // Extract keywords (this is a simplified approach)
    // In a real app, this would use more sophisticated NLP techniques
    const keywords = extractKeywords(text);
    
    onJobChange({
      fullText: text,
      keywords
    });
  };

  const extractKeywords = (text: string): string[] => {
    // Simple keyword extraction (would be replaced with AI in a real app)
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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setJobText(text);
      handleTextChange({ target: { value: text } } as React.ChangeEvent<HTMLTextAreaElement>);
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-4 w-full">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Job Description</h2>
        <label className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 cursor-pointer transition-colors">
          <Upload size={16} />
          <span>Upload</span>
          <input 
            type="file" 
            accept=".txt,.pdf,.doc,.docx" 
            className="hidden" 
            onChange={handleFileUpload}
          />
        </label>
      </div>
      
      <div className="relative">
        <textarea
          value={jobText}
          onChange={handleTextChange}
          className="w-full h-64 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
          placeholder="Paste the job description here..."
        />
        {!jobText && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-50">
            <Briefcase size={48} className="text-gray-400 mb-2" />
            <p className="text-gray-500 dark:text-gray-400">Paste the job description or upload a file</p>
          </div>
        )}
      </div>
      
      <div className="text-sm text-gray-500 dark:text-gray-400">
        <p>Including the full job description helps our AI identify important keywords and requirements.</p>
      </div>
    </div>
  );
};

export default JobInput;