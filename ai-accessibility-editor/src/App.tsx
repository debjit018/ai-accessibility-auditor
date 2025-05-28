import React, { useState } from 'react';
import { AuditResult } from './types';
import { runAccessibilityAudit } from './services/accessibilityService';
import { Scan, AlertTriangle, CheckCircle2, ExternalLink } from 'lucide-react';
import ThemeToggle from './components/ThemeToggle';
import IssuesList from './components/IssuesList';
import ScoreDisplay from './components/ScoreDisplay';
import UrlInput from './components/UrlInput';

function App() {
  const [url, setUrl] = useState('');
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleScan = async () => {
    if (!url) return;
    
    setIsScanning(true);
    setError(null);
    
    try {
      const result = await runAccessibilityAudit(url);
      setAuditResult(result);
    } catch (err) {
      setError('Failed to scan website. Please check the URL and try again.');
      setAuditResult(null);
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Scan className="text-purple-600 dark:text-purple-400" size={28} />
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                AI Accessibility Auditor
              </h1>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <UrlInput 
          url={url}
          onUrlChange={setUrl}
          onScan={handleScan}
          isScanning={isScanning}
        />

        {error && (
          <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-2 text-red-700 dark:text-red-300">
            <AlertTriangle size={20} />
            <p>{error}</p>
          </div>
        )}

        {auditResult && (
          <div className="mt-8 space-y-8">
            <ScoreDisplay score={auditResult.score} />
            <IssuesList issues={auditResult.issues} />
            
            <div className="flex justify-center">
              <a
                href="https://www.w3.org/WAI/WCAG21/quickref/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:underline"
              >
                <ExternalLink size={16} />
                <span>Learn more about WCAG Guidelines</span>
              </a>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-white dark:bg-gray-800 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-500 dark:text-gray-400">
            AI Accessibility Auditor © {new Date().getFullYear()} - Making the web accessible for everyone
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;