import React from 'react';
import { Shield } from 'lucide-react';

interface ScoreDisplayProps {
  score: number;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score }) => {
  let color = '';
  let message = '';
  
  if (score >= 90) {
    color = 'text-green-600 dark:text-green-400';
    message = 'Excellent accessibility!';
  } else if (score >= 70) {
    color = 'text-blue-600 dark:text-blue-400';
    message = 'Good accessibility with room for improvement';
  } else if (score >= 50) {
    color = 'text-amber-600 dark:text-amber-400';
    message = 'Moderate accessibility issues detected';
  } else {
    color = 'text-red-600 dark:text-red-400';
    message = 'Serious accessibility concerns';
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex items-center gap-2">
        <Shield className={color} size={24} />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Accessibility Score
        </h2>
      </div>
      
      <div className={`text-5xl font-bold ${color}`}>
        {score}
      </div>
      
      <p className="text-gray-600 dark:text-gray-300">
        {message}
      </p>
    </div>
  );
};

export default ScoreDisplay;