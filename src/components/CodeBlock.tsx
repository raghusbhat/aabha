import React, { useState, useEffect } from "react";
import { Check, Copy } from "lucide-react";
import clsx from "clsx";
import {
  createHighlighter,
  type Highlighter,
  type BundledLanguage,
} from "shiki";

interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = "tsx",
  showLineNumbers = false,
}) => {
  const [copied, setCopied] = useState(false);
  const [highlighter, setHighlighter] = useState<Highlighter | null>(null);
  const [highlightedCode, setHighlightedCode] = useState<string>("");

  useEffect(() => {
    const initHighlighter = async () => {
      try {
        const highlighter = await createHighlighter({
          themes: ["github-dark", "github-light"],
          langs: [
            "javascript",
            "typescript",
            "tsx",
            "jsx",
            "html",
            "css",
            "json",
            "bash",
          ],
        });
        setHighlighter(highlighter);
      } catch (error) {
        console.error("Failed to initialize Shiki highlighter:", error);
      }
    };

    initHighlighter();
  }, []);

  useEffect(() => {
    if (highlighter && code) {
      try {
        // Generate both light and dark theme versions
        const lightHtml = highlighter.codeToHtml(code, {
          lang: language as BundledLanguage,
          theme: "github-light",
        });
        const darkHtml = highlighter.codeToHtml(code, {
          lang: language as BundledLanguage,
          theme: "github-dark",
        });

        // Combine both themes with a CSS class selector
        const combinedHtml = `
          <div class="light-theme dark:hidden">${lightHtml}</div>
          <div class="dark-theme hidden dark:block">${darkHtml}</div>
        `;

        setHighlightedCode(combinedHtml);
      } catch (error) {
        console.error("Failed to highlight code:", error);
        // Fallback to plain text if highlighting fails
        setHighlightedCode(
          `<pre class="shiki"><code>${escapeHtml(code)}</code></pre>`
        );
      }
    }
  }, [highlighter, code, language]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Helper function to escape HTML special characters
  const escapeHtml = (text: string) => {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  return (
    <div className="relative group">
      <div className="absolute right-2 top-2 z-10">
        <button
          onClick={handleCopy}
          className="p-2 rounded-md bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
          aria-label="Copy code"
        >
          {copied ? (
            <Check size={16} className="text-primary-500" />
          ) : (
            <Copy size={16} className="text-gray-400" />
          )}
        </button>
      </div>
      <div
        className={clsx(
          "rounded-lg overflow-hidden",
          "border border-gray-200 dark:border-gray-700",
          showLineNumbers && "line-numbers"
        )}
      >
        {highlightedCode ? (
          <div
            className="shiki-wrapper"
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          />
        ) : (
          <div className="p-4 bg-gray-100 dark:bg-gray-800">
            <code className="font-mono text-sm text-gray-800 dark:text-gray-200 whitespace-pre">
              {code}
            </code>
          </div>
        )}
      </div>
    </div>
  );
};
