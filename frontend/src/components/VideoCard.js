export default function VideoCard({ video }) {
  return (
    <div className="w-full">
      <div className="group bg-white transition-all duration-300 border border-gray-200 overflow-hidden hover:shadow-lg rounded-lg hover:rounded-none">
        {video.url ? (
          <div className="relative w-full aspect-video">
            <iframe
              src={video.url}
              className="absolute top-0 left-0 w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title={video.title}
            />
          </div>
        ) : (
          <div className="aspect-video bg-gray-200 flex items-center justify-center text-gray-500">
            No Video
          </div>
        )}
        <div className="px-3 py-2">
          <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
            {video.title}
          </h3>
        </div>
      </div>
    </div>
  );
}
