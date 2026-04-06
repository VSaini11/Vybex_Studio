'use client';

import React from 'react';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className = "" }) => {
  if (!content) return null;

  // Simple Markdown-like parser
  const parseMarkdown = (text: string) => {
    // 1. Split by lines first
    const lines = text.split('\n');
    const result: React.ReactNode[] = [];
    let currentParagraph: string[] = [];

    const flushParagraph = (key: number) => {
      if (currentParagraph.length > 0) {
        result.push(
          <p key={`p-${key}`} className="text-gray-300 text-lg leading-[1.8] mb-8 last:mb-0">
            {currentParagraph.map((line, j) => (
              <React.Fragment key={j}>
                {renderInline(line)}
                {j < currentParagraph.length - 1 && <br />}
              </React.Fragment>
            ))}
          </p>
        );
        currentParagraph = [];
      }
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const trimmed = line.trim();

      // Empty line -> flush current paragraph
      if (!trimmed) {
        flushParagraph(i);
        continue;
      }

      // Check for Headings
      const h3Match = line.match(/^###\s+(.*)/);
      const h2Match = line.match(/^##\s+(.*)/);
      const h1Match = line.match(/^#\s+(.*)/);

      if (h3Match) {
        flushParagraph(i);
        result.push(<h3 key={`h3-${i}`} className="text-xl sm:text-2xl font-black text-white mt-10 mb-4 tracking-tight">{renderInline(h3Match[1])}</h3>);
      } else if (h2Match) {
        flushParagraph(i);
        result.push(<h2 key={`h2-${i}`} className="text-2xl sm:text-3xl font-black text-white mt-12 mb-6 tracking-tight">{renderInline(h2Match[1])}</h2>);
      } else if (h1Match) {
        flushParagraph(i);
        result.push(<h1 key={`h1-${i}`} className="text-3xl sm:text-4xl font-black text-white mt-14 mb-8 tracking-tight">{renderInline(h1Match[1])}</h1>);
      } 
      // Check for Bullet Points
      else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        flushParagraph(i);
        // Look ahead for sequential list items
        const items = [trimmed.slice(2)];
        while (i + 1 < lines.length && (lines[i+1].trim().startsWith('- ') || lines[i+1].trim().startsWith('* '))) {
          i++;
          items.push(lines[i].trim().slice(2));
        }
        result.push(
          <ul key={`ul-${i}`} className="list-none space-y-3 mb-8 ml-2">
            {items.map((item, j) => (
              <li key={j} className="flex gap-3 text-gray-300">
                <span className="text-green-500 mt-1.5 shrink-0 w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                <span>{renderInline(item)}</span>
              </li>
            ))}
          </ul>
        );
      }
      // Otherwise, add to current paragraph
      else {
        currentParagraph.push(line);
      }
    }

    flushParagraph(lines.length);
    return result;
  };

  // Helper for bold and simple inline styles
  const renderInline = (line: string) => {
    const parts = line.split(/(\*\*.*?\*\*)/);
    return parts.map((part, k) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={k} className="text-white font-black">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return <div className={`prose-config ${className}`}>{parseMarkdown(content)}</div>;
};
