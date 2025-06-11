export default function GameCard({ game }) {
  return (
    <article
      className="w-full group bg-white transition-all duration-300 border border-gray-200 overflow-hidden hover:shadow-lg rounded-lg hover:rounded-none"
      tabIndex={0} // makes the card focusable for keyboard users
      aria-label={`Game: ${game.title}`}
    >
      {game.iframeUrl ? (
        <div className="relative w-full aspect-video bg-black">
          <iframe
            src={game.iframeUrl}
            className="absolute top-0 left-0 w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={game.title}
            loading="lazy" // lazy-load for performance
          />
        </div>
      ) : (
        <div className="aspect-video bg-gray-100 flex items-center justify-center text-gray-400 text-sm select-none">
          No preview available
        </div>
      )}
      <div className="px-4 py-3">
        <h3
          className="text-sm font-semibold text-gray-900 truncate"
          title={game.title} // tooltip on hover for full title
        >
          {game.title}
        </h3>
      </div>
    </article>
  );
}
