export interface AccessibilityIssue {
  id: string;
  impact: 'critical' | 'serious' | 'moderate' | 'minor';
  description: string;
  element: string;
  recommendation: string;
  wcag: string[];
}

export interface AuditResult {
  issues: AccessibilityIssue[];
  score: number;
  timestamp: string;
}

export interface ElementHighlight {
  element: HTMLElement;
  issue: AccessibilityIssue;
}

export type ThemeMode = 'light' | 'dark';