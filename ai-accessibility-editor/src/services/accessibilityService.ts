import { AccessibilityIssue, AuditResult } from '../types';
import axe from 'axe-core';

export const runAccessibilityAudit = async (url: string): Promise<AuditResult> => {
  try {
    // Run axe-core audit
    const results = await axe.run(document);
    
    // Transform axe results into our format
    const issues: AccessibilityIssue[] = results.violations.map(violation => ({
      id: violation.id,
      impact: violation.impact as 'critical' | 'serious' | 'moderate' | 'minor',
      description: violation.description,
      element: violation.nodes[0]?.html || '',
      recommendation: violation.help,
      wcag: violation.tags.filter(tag => tag.startsWith('wcag')),
    }));

    // Calculate accessibility score (0-100)
    const score = Math.max(
      0,
      100 - (issues.length * 5) - 
      (issues.filter(i => i.impact === 'critical').length * 10) -
      (issues.filter(i => i.impact === 'serious').length * 5)
    );

    return {
      issues,
      score,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Accessibility audit failed:', error);
    throw error;
  }
};

export const highlightElement = (element: HTMLElement, issue: AccessibilityIssue) => {
  const overlay = document.createElement('div');
  overlay.className = 'fixed border-2 border-red-500 bg-red-500/20 z-50 pointer-events-none';
  
  const rect = element.getBoundingClientRect();
  overlay.style.top = `${rect.top + window.scrollY}px`;
  overlay.style.left = `${rect.left + window.scrollX}px`;
  overlay.style.width = `${rect.width}px`;
  overlay.style.height = `${rect.height}px`;
  
  document.body.appendChild(overlay);
  return overlay;
};

export const removeHighlight = (overlay: HTMLElement) => {
  overlay.remove();
};