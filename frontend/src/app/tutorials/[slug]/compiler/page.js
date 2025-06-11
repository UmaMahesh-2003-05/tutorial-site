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
        <h1 className="text-2xl font-bold">
          Online {languages[selectedLanguage]?.name} Compiler
          {slug && ` for Tutorial`}
        </h1>
        <div className="flex gap-2">
          <button
  onClick={() => setDarkMode(!darkMode)}
  className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors duration-300
    ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-300 hover:bg-gray-400'}`}
  title="Toggle Theme"
>
  {darkMode ? (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
      <path d="M10 2a8 8 0 106.32 3.16A9 9 0 0110 2z" />
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-800" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 2a1 1 0 01.993.883L11 3v1a1 1 0 01-1.993.117L9 4V3a1 1 0 011-1zm0 12a4 4 0 100-8 4 4 0 000 8zm-7-3a1 1 0 01.117 1.993L3 13a1 1 0 01-.117-1.993L3 11zm14 0a1 1 0 01.117 1.993L17 13a1 1 0 01-.117-1.993L17 11zM4.222 4.222a1 1 0 011.415 0l.707.707a1 1 0 01-1.415 1.415l-.707-.707a1 1 0 010-1.415zm11.314 0a1 1 0 011.415 1.415l-.707.707a1 1 0 01-1.415-1.415l.707-.707zM2 10a1 1 0 01.117 1.993L2 12a1 1 0 01-.117-1.993L2 10zm16 0a1 1 0 01.117 1.993L18 12a1 1 0 01-.117-1.993L18 10zM4.222 15.778a1 1 0 011.415-1.415l.707.707a1 1 0 01-1.415 1.415l-.707-.707zm11.314 0a1 1 0 011.415-1.415l.707.707a1 1 0 01-1.415 1.415l-.707-.707z" clipRule="evenodd" />
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

      <div className="flex gap-4 h-[70vh]">
        {/* Language Icons */}
        <div className={`w-16 ${darkMode ? 'bg-gray-500 border-gray-700' : 'bg-gray-100 border-gray-300'} border-r overflow-y-auto max-h-[70vh] custom-scrollbar`}>
          {Object.entries(languages).map(([key, lang]) => (
            <button
              key={key}
              onClick={() => setSelectedLanguage(key)}
              className={`w-full p-2 flex justify-center items-center hover:bg-gray-400 ${
                selectedLanguage === key ? (darkMode ? 'bg-gray-600 border-l-4 border-blue-400' : 'bg-white border-l-4 border-blue-500') : ''
              }`}
              title={lang.name}
            >
              <img src={lang.icon} alt={lang.name} className="h-6 w-6" />
            </button>
          ))}
        </div>

        {/* Editor Panel */}
        <div className={`flex-1 min-w-0 border ${darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-300 bg-white'} rounded-md overflow-hidden flex flex-col`}>
          <div className={`px-4 py-2 border-b ${darkMode ? 'border-gray-700 bg-gray-800 text-white' : 'border-gray-300 bg-gray-100 text-black'} flex justify-between`}>
            <span className="font-mono text-sm">{languages[selectedLanguage]?.filename}</span>
            <span className="text-xs">{languages[selectedLanguage]?.name}</span>
          </div>
          <div className="flex-1">
            <Editor
              height="100%"
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

        {/* Output Panel */}
        <div className={`flex-1 min-w-0 border ${darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-300 bg-white'} rounded-md overflow-hidden flex flex-col`}>
          <div className={`px-4 py-2 border-b ${darkMode ? 'border-gray-700 bg-gray-800 text-white' : 'border-gray-300 bg-gray-100 text-black'} flex justify-between`}>
            <span className="font-bold">Output</span>
            <button 
              onClick={() => setOutput('')}
              className="text-xs hover:underline"
            >
              Clear
            </button>
          </div>
          <pre className={`flex-1 p-4 overflow-auto font-mono text-sm whitespace-pre-wrap ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
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
