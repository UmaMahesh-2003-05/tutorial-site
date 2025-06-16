'use client';
import { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import languages from '@/lib/languages';
import { useParams, useSearchParams } from 'next/navigation';

export default function Compiler() {
  const params = useParams();
  const searchParams = useSearchParams();
  const slug = params?.slug;

  const langParam = searchParams.get('lang');
  const [selectedLanguage, setSelectedLanguage] = useState(
    langParam && languages[langParam] ? langParam : 'python'
  );
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const lang = languages[selectedLanguage];
    if (lang) setCode(lang.defaultCode);
  }, [selectedLanguage]);

  const runCode = async () => {
    setLoading(true);
    setOutput('Running...');
    try {
      const lang = languages[selectedLanguage];
      const res = await fetch("https://emkc.org/api/v2/piston/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: selectedLanguage,
          version: "*",
          files: [{ name: lang.filename, content: code }],
        }),
      });

      const data = await res.json();
      setOutput(data.run?.output || data.message || "No output");
    } catch (err) {
      setOutput("Error running code: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`font-sans ${darkMode ? 'bg-black text-white' : 'bg-gray-200 text-black'} min-h-screen max-w-[1800px] mx-auto p-4`}>
      <div className="flex justify-between items-center mt-14 mb-4">
        <h1 className="text-xl md:text-2xl font-bold">
          Online {languages[selectedLanguage]?.name} Compiler
        </h1>
        <div className="flex gap-2">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors duration-300
            ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-300 hover:bg-gray-400'}`}
            title="Toggle Theme"
          >
            {darkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-800" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 12.79A9 9 0 0112.21 3a7 7 0 100 14 9 9 0 008.79-4.21z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 24 24" fill="currentColor">
                 <path d="M12 18a6 6 0 100-12 6 6 0 000 12zm0-16a1 1 0 011 1v2a1 1 0 11-2 0V3a1 1 0 011-1zm0 18a1 1 0 011 1v2a1 1 0 11-2 0v-2a1 1 0 011-1zm10-8a1 1 0 010 2h-2a1 1 0 110-2h2zM4 12a1 1 0 010 2H2a1 1 0 110-2h2zm14.95-7.05a1 1 0 010 1.414L17.364 7.95a1 1 0 11-1.414-1.414l1.586-1.586a1 1 0 011.414 0zM6.636 16.95a1 1 0 010 1.414L5.05 19.95a1 1 0 11-1.414-1.414l1.586-1.586a1 1 0 011.414 0zM6.636 7.05a1 1 0 00-1.414 0L3.636 8.636a1 1 0 101.414 1.414l1.586-1.586a1 1 0 000-1.414zm11.314 9.9a1 1 0 00-1.414 0l-1.586 1.586a1 1 0 001.414 1.414l1.586-1.586a1 1 0 000-1.414z" />
              </svg>
            )}
          </button>

          <button
            onClick={runCode}
            disabled={loading}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? 'Running...' : 'Run'}
          </button>
        </div>
      </div>

      {/* Language Picker  */}
      <div className="block md:hidden mb-2">
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="w-full p-2 rounded border border-gray-300 dark:bg-gray-800 dark:text-white"
        >
          {Object.entries(languages).map(([key, lang]) => (
            <option key={key} value={key}>
              {lang.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col md:flex-row gap-4 h-auto md:h-[70vh]">
        {/* Sidebar */}
        <div className={`hidden md:block w-16 ${darkMode ? 'bg-gray-500 border-gray-700' : 'bg-gray-100 border-gray-300'} border-r overflow-y-auto max-h-[70vh] custom-scrollbar`}>
          {Object.entries(languages).map(([key, lang]) => (
            <button
              key={key}
              onClick={() => setSelectedLanguage(key)}
              className={`w-full p-2 flex justify-center items-center hover:bg-gray-400 ${
                selectedLanguage === key
                  ? darkMode
                    ? 'bg-gray-600 border-l-4 border-blue-400'
                    : 'bg-white border-l-4 border-blue-500'
                  : ''
              }`}
              title={lang.name}
            >
              <img src={lang.icon} alt={lang.name} className="h-6 w-6" />
            </button>
          ))}
        </div>

        {/* Editor */}
        <div className={`flex-1 min-w-0 border ${darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-300 bg-white'} rounded-md overflow-hidden flex flex-col h-[300px] md:h-auto`}>
          <div className={`px-4 py-2 border-b ${darkMode ? 'border-gray-700 bg-gray-800 text-white' : 'border-gray-300 bg-gray-100 text-black'} flex justify-between`}>
            <span className="font-mono text-sm">{languages[selectedLanguage]?.filename}</span>
            <span className="text-xs">{languages[selectedLanguage]?.name}</span>
          </div>
          <div className="flex-1">
            <Editor
              height="70vh"
              theme={darkMode ? 'vs-dark' : 'vs'}
              language={selectedLanguage}
              value={code}
              onChange={setCode}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                padding: { top: 10 },
                scrollBeyondLastLine: false,
                wordWrap: 'on',
              }}
            />
          </div>
        </div>

        {/* Output */}
        <div className={`flex-1 min-w-0 border ${darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-300 bg-white'} rounded-md overflow-hidden flex flex-col h-[200px] md:h-auto`}>
          <div className={`px-4 py-2 border-b ${darkMode ? 'border-gray-700 bg-gray-800 text-white' : 'border-gray-300 bg-gray-100 text-black'} flex justify-between`}>
            <span className="font-bold">Output</span>
            <button
              onClick={() => setOutput('')}
              className="text-xs hover:underline"
            >
              Clear
            </button>
          </div>
          <pre className={`flex-1 p-4 overflow-auto font-mono text-sm whitespace-pre-wrap ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'} min-h-[200px]`}>
            {output || 'No output yet. Click "Run" to execute your code.'}
          </pre>
        </div>
      </div>

      <div className={`mt-4 text-center text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        {slug ? (
          <>Write and test {languages[selectedLanguage]?.name} code from the tutorial</>
        ) : (
          <>Write, edit, and run {languages[selectedLanguage]?.name} code online</>
        )}
      </div>
    </div>
  );
}
