/** نص المقال: فقرات، عناوين فرعية، اقتباسات. */
export default function ArticleBody({ blocks }) {
  return (
    <div className="rv-prose">
      {blocks.map((b, i) => {
        if (b.type === "h2") return <h2 key={i}>{b.text}</h2>;
        if (b.type === "quote")
          return (
            <blockquote key={i}>
              <p>{b.text}</p>
            </blockquote>
          );
        return <p key={i}>{b.text}</p>;
      })}
    </div>
  );
}
