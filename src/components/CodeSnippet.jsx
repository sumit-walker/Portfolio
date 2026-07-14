export default function CodeSnippet({ code, language = "js" }) {
  const lines = code.split("\n");

  const highlight = (line) => {
    return line.split(/(".*?"|\bfunction\b|\bconst\b|\breturn\b|\bexport\b|\bimport\b|\bfrom\b)/g).map((chunk, j) => {
      if (["function", "const", "return", "export", "import", "from"].includes(chunk))
        return <span key={j} className="text-[#c792ea]">{chunk}</span>;
      if (chunk.startsWith('"') || chunk.startsWith("'"))
        return <span key={j} className="text-[#7ec699]">{chunk}</span>;
      return <span key={j}>{chunk}</span>;
    });
  };

  return (
    <pre className="m-0 whitespace-pre-wrap text-[11.5px] leading-[1.7]" style={{ fontFamily: "inherit" }}>
      <div className="text-text-faint mb-[6px]">// {language}</div>
      {lines.map((line, i) => (
        <div key={i}>
          <span className="text-text-faint select-none inline-block w-[18px]">{i + 1}</span>
          {highlight(line)}
        </div>
      ))}
    </pre>
  );
}
