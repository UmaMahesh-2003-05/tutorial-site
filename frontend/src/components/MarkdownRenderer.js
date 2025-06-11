'use client';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css'; // code block theme
import './markdown.css'; // optional custom styles

export default function MarkdownRenderer({ content }) {
  return (
    <div className="prose max-w-none dark:prose-invert markdown-body">
      <ReactMarkdown
        rehypePlugins={[rehypeHighlight]}
        components={{
          h2: ({ node, ...props }) => {
            const id = props.children.toString().toLowerCase().replace(/\s+/g, '-');
            return <h2 id={id} {...props} />;
          },
          h3: ({ node, ...props }) => {
            const id = props.children.toString().toLowerCase().replace(/\s+/g, '-');
            return <h3 id={id} {...props} />;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
