export default function TableSkeleton({ rows = 8, cols = 7 }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <tr key={i}>
          {Array.from({ length: cols }).map((_, j) => (
            <td key={j}>
              <div className="placeholder-glow">
                <span className="placeholder col-8"></span>
              </div>
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}
