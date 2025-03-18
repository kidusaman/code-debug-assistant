import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import CodeMirror with SSR disabled
const CodeMirror = dynamic(
  () => import('react-codemirror2').then(mod => mod.Controlled),
  { ssr: false }
);

export default function Home() {
  const [code, setCode] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Import CodeMirror CSS and mode only on the client side
  useEffect(() => {
    require('codemirror/lib/codemirror.css');
    require('codemirror/mode/javascript/javascript');
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/debug', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error("Error fetching debug result:", error);
    }
    setLoading(false);
  }

  return (
    <div style={{ maxWidth: '800px', margin: 'auto', padding: '2rem' }}>
      <h1>Code Debugging Assistant</h1>
      <form onSubmit={handleSubmit}>
        <CodeMirror
          value={code}
          options={{
            mode: 'javascript',
            theme: 'default',
            lineNumbers: true,
          }}
          onBeforeChange={(editor, data, value) => {
            setCode(value);
          }}
        />
        <button type="submit" disabled={loading} style={{ marginTop: '1rem' }}>
          {loading ? 'Analyzing...' : 'Analyze Code'}
        </button>
      </form>
      {result && (
        <div style={{ marginTop: '2rem' }}>
          <h2>Analysis Result</h2>
          {result.errors && result.errors.length > 0 ? (
            <div>
              <h3>Errors:</h3>
              <ul>
                {result.errors.map((err, index) => (
                  <li key={index}>{err}</li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No errors detected.</p>
          )}
          <div>
            <h3>Suggested Fix:</h3>
            <pre>{result.fix}</pre>
          </div>
          <div>
            <h3>Explanation:</h3>
            <p>{result.explanation}</p>
          </div>
        </div>
      )}
    </div>
  );
}
