'use client';

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext'; // ✅ use the shared auth context

export default function AdminPanelPage() {
  const { user } = useAuth(); // ✅
  const router = useRouter();

  const [tutorials, setTutorials] = useState([]);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [videos, setVideos] = useState([{ title: '', url: '' }]);
  const [games, setGames] = useState([{ title: '', iframeUrl: '' }]);
  const [status, setStatus] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Redirect if not admin
  useEffect(() => {
    if (user === null) {
      router.push('/login');
    } else if (user && user.role !== 'admin') {
      router.push('/');
    } else {
      fetchTutorials();
    }
  }, [user]);

  const fetchTutorials = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tutorials`);
      const data = await res.json();
      setTutorials(data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const tutorialData = {
      title,
      slug,
      category,
      content,
      tags: tags.split(",").map((tag) => tag.trim()),
      videos,
      games,
    };

    const method = editingId ? "PUT" : "POST";
    const url = editingId
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/tutorials/${editingId}`
      : `${process.env.NEXT_PUBLIC_API_URL}/api/tutorials/create`;

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include", // ✅ send token cookie
        body: JSON.stringify(tutorialData),
      });

      if (res.ok) {
        setStatus(editingId ? "✅ Tutorial updated!" : "✅ Tutorial created!");
        resetForm();
        fetchTutorials();
      } else {
        setStatus("❌ Operation failed.");
      }
    } catch (error) {
      console.error("Submit error:", error);
      setStatus("❌ Error occurred.");
    }
  };

  const handleEdit = (tutorial) => {
    console.log(tutorial);
    setTitle(tutorial.title);
    setSlug(tutorial.slug);
    setCategory(tutorial.category);
    setContent(tutorial.content);
    setTags(tutorial.tags.join(", "));
    setVideos(tutorial.videos || [{ title: '', url: '' }]);
    setGames(tutorial.games || [{ title: '', iframeUrl: '' }]);
    setEditingId(tutorial._id);
    setStatus("✏️ Edit mode enabled");
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this?");
    if (!confirm) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tutorials/${id}`, {
        method: "DELETE",
        credentials: "include", // ✅ include token
      });
      if (res.ok) {
        setStatus("🗑️ Deleted tutorial.");
        fetchTutorials();
      } else {
        setStatus("❌ Delete failed.");
      }
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const resetForm = () => {
    setTitle("");
    setSlug("");
    setCategory("");
    setContent("");
    setTags("");
    setVideos([{ title: '', url: '' }]);  
    setGames([{ title: '', iframeUrl: '' }]);
    setEditingId(null);
  };

  if (!user) return <p>Checking auth...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">🛠 Admin Panel</h1>

      <form onSubmit={handleSubmit} className="space-y-4 mb-10">
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title"
          className="w-full p-3 border border-gray-300 rounded" required />
        <input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="Slug (URL friendly)"
          className="w-full p-3 border border-gray-300 rounded" required />
        <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category"
          className="w-full p-3 border border-gray-300 rounded" required />
        <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content (Markdown)"
          rows="6" className="w-full p-3 border border-gray-300 rounded" required />
        <input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Tags (comma separated)"
          className="w-full p-3 border border-gray-300 rounded" required />
        <h3 className="text-xl font-semibold mt-6">🎥 Videos</h3>
        {videos.map((video, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              value={video.title}
              onChange={(e) => {
                const newVideos = [...videos];
                newVideos[index].title = e.target.value;
                setVideos(newVideos);
              }}
              placeholder="Video Title"
              className="flex-1 p-2 border rounded"
            />
            <input
              value={video.url}
              onChange={(e) => {
                const newVideos = [...videos];
                newVideos[index].url = e.target.value;
                setVideos(newVideos);
              }}
              placeholder="YouTube or Vimeo URL"
              className="flex-1 p-2 border rounded"
            />
            <button type="button" onClick={() => {
              const newVideos = [...videos];
              newVideos.splice(index, 1);
              setVideos(newVideos);
            }} className="text-red-500 font-bold">✖</button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setVideos([...videos, { title: "", url: "" }])}
            className="bg-blue-500 text-white px-3 py-1 rounded mt-2"
          >
             + Add Video
          </button>

          <h3 className="text-xl font-semibold mt-6">🎮 Games</h3>
          {games.map((game, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                value={game.title || ""}
                onChange={(e) => {
                  const newGames = [...games];
                  newGames[index].title = e.target.value;
                  setGames(newGames);
                }}
                placeholder="Game Title"
                className="flex-1 p-2 border rounded"
              />
              <input
                value={game.iframeUrl || ""}
                onChange={(e) => {
                  const newGames = [...games];
                  newGames[index].iframeUrl = e.target.value;
                  setGames(newGames);
               }}
               placeholder="Embed Iframe URL"
               className="flex-1 p-2 border rounded"
              />
              <button type="button" onClick={() => {
                const newGames = [...games];
                newGames.splice(index, 1);
                setGames(newGames);
              }} className="text-red-500 font-bold">✖</button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => setGames([...games, { title: "", iframeUrl: "" }])}
            className="bg-blue-500 text-white px-3 py-1 rounded mt-2"
          >
            + Add Game
          </button>
        <div className="flex gap-4">
          <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">
            {editingId ? "Update Tutorial" : "Create Tutorial"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-500 text-white py-2 px-4 rounded"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {status && <p className="text-lg font-semibold mb-6">{status}</p>}

      <h2 className="text-2xl font-bold mb-4">📚 All Tutorials</h2>
      <ul className="space-y-3">
        {tutorials.map((tut) => (
          <li key={tut._id} className="flex justify-between items-center bg-gray-100 p-3 rounded">
            <div>
              <p className="font-semibold">{tut.title}</p>
              <p className="text-sm text-gray-600">Category: {tut.category}</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(tut)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(tut._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}


