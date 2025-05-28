import React, { useState } from 'react';
import { Resume } from '../types';
import { FileText, Upload } from 'lucide-react';

interface ResumeInputProps {
  onResumeChange: (resume: Resume) => void;
}

const ResumeInput: React.FC<ResumeInputProps> = ({ onResumeChange }) => {
  const [resumeText, setResumeText] = useState('');

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setResumeText(text);
    
    // Parse resume sections (simplified approach)
    const sections: Resume['sections'] = {};
    
    // Very basic section detection - in a real app this would be more sophisticated
    if (text.includes('SUMMARY') || text.includes('PROFILE')) {
      const summaryMatch = text.match(/SUMMARY|PROFILE(.*?)(?=EXPERIENCE|EDUCATION|SKILLS|$)/is);
      if (summaryMatch && summaryMatch[1]) {
        sections.summary = summaryMatch[1].trim();
      }
    }
    
    if (text.includes('EXPERIENCE') || text.includes('WORK')) {
      const expMatch = text.match(/EXPERIENCE|WORK(.*?)(?=EDUCATION|SKILLS|$)/is);
      if (expMatch && expMatch[1]) {
        sections.experience = expMatch[1].trim();
      }
    }
    
    if (text.includes('EDUCATION')) {
      const eduMatch = text.match(/EDUCATION(.*?)(?=EXPERIENCE|SKILLS|$)/is);
      if (eduMatch && eduMatch[1]) {
        sections.education = eduMatch[1].trim();
      }
    }
    
    if (text.includes('SKILLS')) {
      const skillsMatch = text.match(/SKILLS(.*?)(?=EXPERIENCE|EDUCATION|$)/is);
      if (skillsMatch && skillsMatch[1]) {
        sections.skills = skillsMatch[1].trim();
      }
    }
    
    onResumeChange({
      fullText: text,
      sections
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setResumeText(text);
      handleTextChange({ target: { value: text } } as React.ChangeEvent<HTMLTextAreaElement>);
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-4 w-full">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Your Resume</h2>
        <label className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer transition-colors">
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
          value={resumeText}
          onChange={handleTextChange}
          className="w-full h-64 p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
          placeholder="Paste your resume here..."
        />
        {!resumeText && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-50">
            <FileText size={48} className="text-gray-400 mb-2" />
            <p className="text-gray-500 dark:text-gray-400">Paste your resume or upload a file</p>
          </div>
        )}
      </div>
      
      <div className="text-sm text-gray-500 dark:text-gray-400">
        <p>For best results, include clear sections for Summary, Experience, Education, and Skills.</p>
      </div>
    </div>
  );
};

export default ResumeInput;