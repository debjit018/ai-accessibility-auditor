import React from 'react';
import { Resume, AnalysisResult } from '../types';
import { generatePDF } from '../services/pdfService';
import { FileDown } from 'lucide-react';

interface PDFExportProps {
  resume: Resume | null;
  analysisResult: AnalysisResult | null;
}

const PDFExport: React.FC<PDFExportProps> = ({ resume, analysisResult }) => {
  const handleExport = async () => {
    if (!resume || !analysisResult) return;
    
    try {
      const pdfBlob = await generatePDF(resume, analysisResult);
      
      // Create a download link
      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'tailored-resume.txt'; // In a real app, this would be .pdf
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  const isDisabled = !resume || !analysisResult || !resume.fullText;

  return (
    <button
      onClick={handleExport}
      disabled={isDisabled}
      className={`flex items-center justify-center gap-2 w-full py-3 px-6 rounded-lg font-medium transition-all ${
        isDisabled
          ? 'bg-gray-300 text-gray-500 dark:bg-gray-700 dark:text-gray-500 cursor-not-allowed'
          : 'bg-green-600 text-white hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600'
      }`}
    >
      <FileDown size={20} />
      <span>Export Tailored Resume</span>
    </button>
  );
};

export default PDFExport;