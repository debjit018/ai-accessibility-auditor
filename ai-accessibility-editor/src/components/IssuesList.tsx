import React, { useState } from 'react';
import { AccessibilityIssue } from '../types';
import { AlertTriangle, AlertCircle, AlertOctagon, Info, ChevronDown, ChevronUp } from 'lucide-react';

interface IssuesListProps {
  issues: AccessibilityIssue[];
}

const IssuesList: React.FC<IssuesListProps> = ({ issues }) => {
  const [expandedIssue, setExpandedIssue] = useState<string | null>(null);

  const getImpactIcon = (impact: AccessibilityIssue['impact']) => {
    switch (impact) {
      case 'critical':
        return <AlertOctagon className="text-red-500\" size={20} />;
      case 'serious':
        return <AlertTriangle className="text-orange-500" size={20} />;
      case 'moderate':
        return <AlertCircle className="text-amber-500" size={20} />;
      case 'minor':
        return <Info className="text-blue-500" size={20} />;
    }
  };

  const getImpactColor = (impact: AccessibilityIssue['impact']) => {
    switch (impact) {
      case 'critical':
        return 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20';
      case 'serious':
        return 'border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-900/20';
      case 'moderate':
        return 'border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20';
      case 'minor':
        return 'border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20';
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Found Issues ({issues.length})
      </h2>
      
      <div className="space-y-3">
        {issues.map((issue) => (
          <div
            key={issue.id}
            className={`border rounded-lg overflow-hidden ${getImpactColor(issue.impact)}`}
          >
            <button
              onClick={() => setExpandedIssue(expandedIssue === issue.id ? null : issue.id)}
              className="w-full px-4 py-3 flex items-center justify-between text-left"
            >
              <div className="flex items-center gap-3">
                {getImpactIcon(issue.impact)}
                <span className="font-medium text-gray-900 dark:text-white">
                  {issue.description}
                </span>
              </div>
              {expandedIssue === issue.id ? (
                <ChevronUp size={20} className="text-gray-500" />
              ) : (
                <ChevronDown size={20} className="text-gray-500" />
              )}
            </button>
            
            {expandedIssue === issue.id && (
              <div className="px-4 pb-4 space-y-3">
                <div className="p-3 bg-white/50 dark:bg-black/20 rounded border border-gray-200 dark:border-gray-700">
                  <code className="text-sm font-mono text-gray-800 dark:text-gray-200">
                    {issue.element}
                  </code>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                    Recommendation
                  </h4>
                  <p className="text-gray-700 dark:text-gray-300">
                    {issue.recommendation}
                  </p>
                </div>
                
                {issue.wcag.length > 0 && (
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                      WCAG Guidelines
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {issue.wcag.map((guideline) => (
                        <span
                          key={guideline}
                          className="px-2 py-1 text-sm bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded"
                        >
                          {guideline.toUpperCase()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default IssuesList;