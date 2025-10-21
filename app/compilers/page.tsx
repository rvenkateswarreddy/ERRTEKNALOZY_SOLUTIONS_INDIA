'use client';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion'; // <-- Import motion
import { Loader2, Play } from 'lucide-react'; // <-- Import icons
import PropTypes from 'prop-types'; // <-- Import PropTypes

// Monaco must be dynamically imported
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  // --- 2. Added loading indicator for editor ---
  loading: () => (
    <div className="h-[300px] flex items-center justify-center bg-gray-100 text-gray-500 rounded-md border border-gray-300">
      Loading Editor...
    </div>
  ),
});

// List of languages and their Judge0 IDs & Monaco IDs
const LANGUAGES = [
  {
    name: 'C',
    judge0: 50,
    monaco: 'c',
    defaultCode:
      '#include <stdio.h>\nint main() {\n  printf("Hello, World!\\n");\n  return 0;\n}',
  },
  {
    name: 'C++',
    judge0: 54,
    monaco: 'cpp',
    defaultCode:
      '#include <iostream>\nint main() {\n  std::cout << "Hello, World!\\n";\n  return 0;\n}',
  },
  {
    name: 'Java',
    judge0: 62,
    monaco: 'java',
    defaultCode:
      'public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello, World!");\n  }\n}',
  },
  {
    name: 'Python',
    judge0: 71,
    monaco: 'python',
    defaultCode: 'print("Hello, World!")',
  },
  {
    name: 'JavaScript',
    judge0: 63,
    monaco: 'javascript',
    defaultCode: 'console.log("Hello, World!");',
  },
  {
    name: 'TypeScript',
    judge0: 74,
    monaco: 'typescript',
    defaultCode: 'console.log("Hello, World!");',
  },
  {
    name: 'C#',
    judge0: 51,
    monaco: 'csharp',
    defaultCode:
      'using System;\nclass Program {\n  static void Main() {\n    Console.WriteLine("Hello, World!");\n  }\n}',
  },
  {
    name: 'Go',
    judge0: 60,
    monaco: 'go',
    defaultCode:
      'package main\nimport "fmt"\nfunc main() {\n  fmt.Println("Hello, World!")\n}',
  },
  {
    name: 'PHP',
    judge0: 68,
    monaco: 'php',
    defaultCode: '<?php\necho "Hello, World!\\n";',
  },
  {
    name: 'Ruby',
    judge0: 72,
    monaco: 'ruby',
    defaultCode: 'puts "Hello, World!"',
  },
];

// Get API key from environment variables
const JUDGE0_KEY = process.env.NEXT_PUBLIC_COMPILER_API_KEY;

// --- Animation Variants ---
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function OnlineCompiler() {
  const [selected, setSelected] = useState(LANGUAGES[0]);
  const [code, setCode] = useState(selected.defaultCode);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [outputType, setOutputType] = useState('status'); // 'stdout', 'stderr', 'compile', 'error', 'status'

  // Handle language change
  function onLangChange(e) {
    // <-- Removed TS type
    const langName = e.target.value;
    const lang = LANGUAGES.find((l) => l.name === langName);
    if (lang) {
      setSelected(lang);
      setCode(lang.defaultCode);
      setOutput(''); // Clear output on language change
      setInput(''); // Clear input
      setOutputType('status');
    }
  }

  // Handle code execution via Judge0 API
  async function handleRun() {
    // --- 3. Check for API Key ---
    if (!JUDGE0_KEY) {
      setOutput(
        'Error: Judge0 API Key is missing. Please configure NEXT_PUBLIC_COMPILER_API_KEY in your environment variables.'
      );
      setOutputType('error');
      return;
    }

    setLoading(true);
    setOutput('Running code...'); // Update status
    setOutputType('status'); // Set type to status

    try {
      const response = await fetch(
        'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true', // wait=true gets result immediately
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-RapidAPI-Key': JUDGE0_KEY,
            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
          },
          body: JSON.stringify({
            source_code: code,
            language_id: selected.judge0,
            stdin: input, // Send standard input
            // Add other options like cpu_time_limit if needed
          }),
        }
      );

      if (!response.ok) {
        // Handle non-2xx responses (e.g., API errors)
        const errorResult = await response.json().catch(() => ({})); // Try to parse error JSON
        console.error('Judge0 API Error:', response.status, errorResult);
        throw new Error(
          `API request failed with status ${response.status}: ${
            errorResult.message || 'Unknown API error'
          }`
        );
      }

      const result = await response.json();

      // Determine output type and text
      if (result.status?.id === 6) {
        // Compilation Error
        setOutput(
          result.compile_output || 'Compilation failed, no specific output.'
        );
        setOutputType('compile');
      } else if (result.status?.id > 6) {
        // Runtime Error (Time Limit, Memory Limit, etc.)
        setOutput(
          result.stderr ||
            result.status?.description ||
            'Runtime error occurred.'
        );
        setOutputType('stderr');
      } else if (result.stderr) {
        // Standard Error during successful execution
        setOutput(result.stderr);
        setOutputType('stderr');
      } else if (result.stdout !== null) {
        // Standard Output (even if empty string)
        setOutput(result.stdout);
        setOutputType('stdout');
      } else {
        // Accepted but no output (can happen)
        setOutput('Execution successful, no output produced.');
        setOutputType('status');
      }
    } catch (error) {
      console.error('Error connecting to Judge0 API:', error);
      setOutput(
        `Error: ${error.message || 'Could not connect to Judge0 API.'}`
      );
      setOutputType('error');
    } finally {
      setLoading(false);
    }
  }

  // Determine output text color based on type
  const getOutputColor = () => {
    switch (outputType) {
      case 'stdout':
        return 'text-green-700';
      case 'stderr':
      case 'error':
      case 'compile':
        return 'text-red-600';
      default:
        return 'text-gray-600'; // status
    }
  };

  return (
    // --- 1. Light Theme & Animation ---
    <motion.div
      className="py-12 md:py-16" // Added padding
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-md rounded-lg p-6 md:p-8 shadow-lg border border-gray-200 text-gray-800">
        {/* --- Controls Bar --- */}
        <div className="mb-4 flex flex-col sm:flex-row sm:items-center gap-4 flex-wrap">
          {' '}
          {/* Added flex-wrap */}
          <div className="flex items-center gap-2">
            <label
              htmlFor="language-select"
              className="font-medium text-sm text-gray-700"
            >
              Language:
            </label>
            <select
              id="language-select"
              // --- 1. Styled Select ---
              className="rounded px-3 py-1.5 bg-white border border-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 text-sm"
              value={selected.name}
              onChange={onLangChange}
              disabled={loading} // Disable during load
            >
              {LANGUAGES.map((l) => (
                <option key={l.name} value={l.name}>
                  {l.name}
                </option>
              ))}
            </select>
          </div>
          {/* --- 1. Styled Button with Animation & Loader --- */}
          <motion.button
            className="sm:ml-auto h-9 flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-5 py-2 rounded-md font-semibold transition shadow-sm hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed text-sm"
            onClick={handleRun}
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.05 }}
            whileTap={{ scale: loading ? 1 : 0.95 }}
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Play size={16} />
            )}
            {loading ? 'Running...' : 'Run Code'}
          </motion.button>
        </div>

        {/* --- Monaco Editor --- */}
        <div className="border border-gray-300 rounded-md overflow-hidden mb-5 shadow-sm">
          <MonacoEditor
            height="350px" // Increased height slightly
            language={selected.monaco}
            theme="vs" // --- 1. Use default light theme 'vs' ---
            value={code}
            onChange={(v) => setCode(v || '')} // Ensure value is not undefined
            options={{
              fontSize: 14, // Slightly smaller font
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              automaticLayout: true, // Helps with resizing
              wordWrap: 'on', // Enable word wrap
              padding: { top: 10 },
            }}
          />
        </div>

        {/* --- Input Area --- */}
        <div className="mb-5">
          <label
            htmlFor="stdin"
            className="font-medium text-cyan-700 text-sm mb-1 block"
          >
            Standard Input (stdin):
          </label>
          <textarea
            id="stdin"
            // --- 1. Styled Textarea ---
            className="w-full bg-gray-50 border border-gray-300 rounded px-3 py-2 text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 resize-none font-mono"
            rows={3}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter input for your program here (if required)..."
            disabled={loading} // Disable during load
          />
        </div>

        {/* --- Output Area --- */}
        <div>
          <h3 className="font-medium text-cyan-700 text-sm mb-1">Output:</h3>
          <pre
            // --- 1. Styled Pre + Dynamic Color ---
            className={`bg-gray-50 border border-gray-300 rounded px-4 py-3 whitespace-pre-wrap min-h-[80px] text-sm font-mono overflow-auto ${getOutputColor()}`} // Added overflow-auto
            aria-live="polite" // Announce output changes
          >
            {/* Show specific message while loading */}
            {loading && output === 'Running code...'
              ? 'Running code...'
              : output}
          </pre>
        </div>

        {/* Footer Info */}
        <div className="text-gray-500 text-xs mt-6 text-center md:text-left">
          Powered by{' '}
          <a
            className="underline text-cyan-700 hover:text-blue-700"
            href="https://judge0.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Judge0 CE API
          </a>
          . Editor by Monaco.
          <br />
          <b className="text-gray-600">Tip:</b> Enter input above if your code
          expects it (e.g., via `input()` or `scanf`).
          {!JUDGE0_KEY && (
            <p className="text-red-600 font-semibold mt-2">
              Warning: Judge0 API Key not configured. Code execution will fail.
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// --- 6. Added PropTypes ---
OnlineCompiler.propTypes = {
  // No props passed in this example, but you could add them here if needed
};
