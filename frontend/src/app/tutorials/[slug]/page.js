'use client';
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { EllipsisHorizontalIcon, XMarkIcon } from '@heroicons/react/24/outline'; // TOC Icons
import MarkdownRenderer from '@/components/MarkdownRenderer';
import VideoCard from '@/components/VideoCard';
import GameCard from '@/components/GameCard';
import DynamicSection from '@/components/Dynamicsection';
import languages from '@/lib/languages';

export default function TutorialDetailPage() {
  const { slug } = useParams();
  const [tutorial, setTutorial] = useState(null);
  const [activeTab, setActiveTab] = useState("text");
  const [toc, setToc] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [activeHeadingId, setActiveHeadingId] = useState(null);
  const [showMobileTOC, setShowMobileTOC] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    if (slug) {
      const fetchTutorial = async () => {
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tutorials/${slug}`);
          const data = await res.json();
          setTutorial(data);
          extractTOC(data.content);
        } catch (error) {
          console.error("Failed to fetch tutorial:", error);
        }
      };
      fetchTutorial();
    }
  }, [slug]);

  const extractTOC = (markdown) => {
    const lines = markdown.split('\n');
    const tocData = [];
    let currentMain = null;

    lines.forEach(line => {
      if (line.startsWith('## ')) {
        const text = line.replace('## ', '').trim();
        const id = text.toLowerCase().replace(/\s+/g, '-');
        currentMain = { id, text, children: [] };
        tocData.push(currentMain);
      } else if (line.startsWith('### ') && currentMain) {
        const text = line.replace('### ', '').trim();
        const id = text.toLowerCase().replace(/\s+/g, '-');
        currentMain.children.push({ id, text });
      }
    });

    const initialExpand = {};
    tocData.forEach(section => {
      initialExpand[section.id] = false;
    });

    setToc(tocData);
    setExpanded(initialExpand);
  };

  const scrollToHeading = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setShowMobileTOC(false); // auto close TOC on mobile after click
    }
  };

  const toggleExpand = (id) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const getCompilerLanguage = () => {
    if (!tutorial?.tags) return null;

    const languageKeys = Object.keys(languages).map(lang => lang.toLowerCase());
    const matchedTag = tutorial.tags.find(tag =>
      languageKeys.includes(tag.toLowerCase())
    );

    return matchedTag ? matchedTag.toLowerCase() : null;
  };

  const compilerLanguage = getCompilerLanguage();

  useEffect(() => {
    if (!contentRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveHeadingId(entry.target.id);
          }
        });
      },
      { rootMargin: '0px 0px -80% 0px' }
    );

    const headings = contentRef.current.querySelectorAll('h2[id], h3[id]');
    headings.forEach((heading) => observer.observe(heading));

    return () => {
      headings.forEach((heading) => observer.unobserve(heading));
    };
  }, [tutorial]);

  if (!tutorial) return <div className="pt-16 md:pt-20 p-10 text-center">Loading...</div>;

  return (
    <div className="pt-16 md:pt-20 relative w-full flex">
      {/* Desktop Sidebar */}
      {activeTab === 'text' && toc.length > 0 && (
        <aside className="hidden md:block fixed top-20 left-0 w-64 h-[calc(100vh-5rem)] overflow-y-auto bg-white border-r border-gray-200 shadow z-10">
          <div className="px-4 py-1 bg-gradient-to-r from-amber-100 to-yellow-50 border-b font-semibold text-base text-gray-800">
            {tutorial.tags} Tutorial
          </div>
          <nav className="py-2 px-2">
            {toc.map((section) => (
              <div key={section.id} className="mb-1">
                <div
                  className={`group flex items-center justify-between px-2 py-2 text-sm rounded-md cursor-pointer ${activeHeadingId === section.id ? 'bg-blue-100 text-blue-700 font-semibold' : 'hover:bg-gray-100 text-gray-800'}`}
                  onClick={() => {
                    scrollToHeading(section.id);
                    setExpanded(prev => ({ ...prev, [section.id]: true }));
                  }}
                >
                  <span>{section.text}</span>
                  {section.children.length > 0 && (
                    <span
                      className="ml-2 text-xs text-gray-600 group-hover:text-black"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExpand(section.id);
                      }}
                    >
                      {expanded[section.id] ? '▲' : '▼'}
                    </span>
                  )}
                </div>
                {expanded[section.id] && section.children.length > 0 && (
                  <ul className="ml-4 mt-1 border-l border-gray-200 pl-3">
                    {section.children.map((child) => (
                      <li
                        key={child.id}
                        onClick={() => scrollToHeading(child.id)}
                        className={`py-1 px-2 rounded-md text-xs cursor-pointer ${activeHeadingId === child.id ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
                      >
                        {child.text}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </nav>
        </aside>
      )}

      {/* Mobile TOC Button */}
      {activeTab === 'text' && toc.length > 0 && (
        <button
          onClick={() => setShowMobileTOC(true)}
          className="md:hidden fixed top-20 right-4 bg-white p-3 shadow-lg rounded-full z-40 border"
        >
          <EllipsisHorizontalIcon className="h-6 w-6 text-gray-700" />

        </button>
      )}

      {/* Mobile TOC Drawer */}
      {showMobileTOC && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex">
          <div className="w-64 bg-white h-full shadow-xl p-4 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold">{tutorial.tags} Tutorial</h2>
              <button onClick={() => setShowMobileTOC(false)}>
                <XMarkIcon className="w-6 h-6 text-gray-600" />
              </button>
            </div>
            <nav>
              {toc.map((section) => (
                <div key={section.id} className="mb-1">
                  <div
                    className={`group flex items-center justify-between px-2 py-2 text-sm rounded-md cursor-pointer ${activeHeadingId === section.id ? 'bg-blue-100 text-blue-700 font-semibold' : 'hover:bg-gray-100 text-gray-800'}`}
                    onClick={() => {
                      scrollToHeading(section.id);
                      setExpanded(prev => ({ ...prev, [section.id]: true }));
                    }}
                  >
                    <span>{section.text}</span>
                    {section.children.length > 0 && (
                      <span
                        className="ml-2 text-xs text-gray-600 group-hover:text-black"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleExpand(section.id);
                        }}
                      >
                        {expanded[section.id] ? '▲' : '▼'}
                      </span>
                    )}
                  </div>
                  {expanded[section.id] && section.children.length > 0 && (
                    <ul className="ml-4 mt-1 border-l border-gray-200 pl-3">
                      {section.children.map((child) => (
                        <li
                          key={child.id}
                          onClick={() => scrollToHeading(child.id)}
                          className={`py-1 px-2 rounded-md text-xs cursor-pointer ${activeHeadingId === child.id ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
                        >
                          {child.text}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </nav>
          </div>
          <div className="flex-1" onClick={() => setShowMobileTOC(false)} />
        </div>
      )}

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-400 ${activeTab === 'text' ? 'md:ml-64' : ''} px-6 md:px-10`}>
        <div className="-mt-4 md:-mt-4 -mx-6 md:-mx-10">
          <DynamicSection tab={activeTab} onChangeTab={setActiveTab} />
        </div>

        <div className="flex rounded-md gap-4 border-b my-6">
          {['text', 'videos', 'games'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-medium capitalize ${activeTab === tab ? 'border-b-2 border-amber-600 text-black' : 'text-gray-600 hover:text-gray-800'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'text' && (
          <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 flex-1 min-w-0 truncate">
              {tutorial.title}
            </h1>

            <Link
              href={compilerLanguage ? `/tutorials/${tutorial.slug}/compiler?lang=${compilerLanguage}` : `/tutorials/${tutorial.slug}/compiler`}
              className="px-4 py-2 whitespace-nowrap rounded text-white text-sm sm:text-base bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500 bg-[length:200%_200%] animate-gradient hover:brightness-110 transition"
            >
              Try Compiler
            </Link>
          </div>
        )}

        <div className="mt-4" ref={contentRef}>
          {activeTab === 'text' && <MarkdownRenderer content={tutorial.content} withIds />}
          {activeTab === 'videos' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 py-4">
              {tutorial.videos?.length > 0 ? (
                tutorial.videos.map((video) => <VideoCard key={video._id} video={video} />)
              ) : (
                <p className="text-gray-500">No videos available.</p>
              )}
            </div>
          )}
          {activeTab === 'games' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 py-4">
              {tutorial.games?.length > 0 ? (
                tutorial.games.map((game) => <GameCard key={game._id} game={game} />)
              ) : (
                <p className="text-gray-500">No games available.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
