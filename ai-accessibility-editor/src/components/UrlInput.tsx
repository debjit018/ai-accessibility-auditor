import React from 'react';
import { Globe } from 'lucide-react';

interface UrlInputProps {
  url: string;
  onUrlChange: (url: string) => void;
  onScan: () => void;
  isScanning: boolean;
}

const UrlInput: React.FC<UrlInputProps> = ({ url, onUrlChange, onScan, isScanning }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onScan();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Globe className="text-gray-400" size={20} />
          </div>
          <input
            type="url"
            value={url}
            onChange={(e) => onUrlChange(e.target.value)}
            placeholder="Enter website URL to audit..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isScanning || !url}
          className={`px-6 py-2 rounded-lg font-medium transition-all ${
            isScanning || !url
              ? 'bg-gray-300 text-gray-500 dark:bg-gray-700 dark:text-gray-500 cursor-not-allowed'
              : 'bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600'
          }`}
        >
          {isScanning ? 'Scanning...' : 'Scan Website'}
        </button>
      </div>
    </form>
  );
};

export default UrlInput;