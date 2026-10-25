import { useEffect, useRef, useState } from 'react';

let seq = 0;

export default function Mermaid({ code }) {
  const ref = useRef(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let alive = true;
    const dark = document.documentElement.dataset.theme === 'dark';
    import('mermaid').then(async ({ default: mermaid }) => {
      mermaid.initialize({ startOnLoad: false, theme: dark ? 'dark' : 'default', securityLevel: 'strict', fontFamily: 'inherit' });
      try {
        const { svg } = await mermaid.render(`mmd-${++seq}`, code);
        if (alive && ref.current) ref.current.innerHTML = svg;
      } catch (e) {
        if (alive) setErr(String(e.message || e));
      }
    });
    return () => {
      alive = false;
    };
  }, [code]);

  if (err) return <pre className="mermaid-error">{code}</pre>;
  return <div className="diagram" dir="ltr" ref={ref} />;
}
