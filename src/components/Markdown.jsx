import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import Mermaid from './Mermaid.jsx';
import { slug } from '../lib/util.js';

const CALLOUTS = {
  TIP: ['tip', '💡 فكرة'],
  NOTE: ['note', '📝 ملاحظة'],
  IMPORTANT: ['important', '⭐ مهم جدًا'],
  WARNING: ['warning', '⚠️ خد بالك'],
  EXAM: ['exam', '🎯 بييجي في الامتحان'],
  EXAMPLE: ['example', '🧪 مثال'],
};

function textOf(node) {
  if (typeof node === 'string') return node;
  if (Array.isArray(node)) return node.map(textOf).join('');
  return node?.props ? textOf(node.props.children) : '';
}

// GitHub-style callouts: > [!TIP] ...
function Blockquote({ children }) {
  const kids = Array.isArray(children) ? children.filter((c) => c !== '\n') : [children];
  const first = kids[0];
  const firstText = textOf(first);
  const m = firstText.match(/^\s*\[!(\w+)\]/);
  if (m && CALLOUTS[m[1].toUpperCase()]) {
    const [cls, label] = CALLOUTS[m[1].toUpperCase()];
    const inner = first.props.children;
    const arr = Array.isArray(inner) ? [...inner] : [inner];
    arr[0] = typeof arr[0] === 'string' ? arr[0].replace(/^\s*\[!\w+\]\s*/, '') : arr[0];
    return (
      <div className={`callout callout-${cls}`}>
        <div className="callout-title">{label}</div>
        {arr.some((x) => textOf(x).trim()) && <p>{arr}</p>}
        {kids.slice(1)}
      </div>
    );
  }
  return <blockquote>{children}</blockquote>;
}

export default function Markdown({ children, onHeading, bookmarks = [] }) {
  const base = import.meta.env.BASE_URL;
  const heading = (Tag) =>
    function H({ children: c }) {
      const title = textOf(c);
      const id = slug(title);
      const marked = bookmarks.some((b) => b.id === id);
      return (
        <Tag id={id}>
          {c}
          {onHeading && Tag === 'h2' && (
            <button className={`bm ${marked ? 'on' : ''}`} onClick={() => onHeading({ id, title })} aria-label="Bookmark">
              {marked ? '★' : '☆'}
            </button>
          )}
        </Tag>
      );
    };

  return (
    <div className="md">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          h2: heading('h2'),
          h3: heading('h3'),
          blockquote: Blockquote,
          table: ({ children: c }) => (
            <div className="table-wrap">
              <table>{c}</table>
            </div>
          ),
          img: ({ src, alt }) => (
            <span className="figure">
              <img src={/^https?:/.test(src) ? src : base + src.replace(/^\//, '')} alt={alt} loading="lazy" />
              {alt && <span className="figcaption">{alt}</span>}
            </span>
          ),
          code({ className, children: c, ...rest }) {
            const lang = /language-(\w+)/.exec(className || '')?.[1];
            if (lang === 'mermaid') return <Mermaid code={String(c).trim()} />;
            return (
              <code className={className} {...rest}>
                {c}
              </code>
            );
          },
          pre: ({ children: c }) => {
            const child = Array.isArray(c) ? c[0] : c;
            if (child?.props?.className === 'language-mermaid') return c;
            return <pre dir="ltr">{c}</pre>;
          },
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
