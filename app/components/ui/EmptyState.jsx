/** رسالة عند غياب المحتوى. */
export default function EmptyState({ title = "لا يوجد محتوى حالياً", children }) {
  return (
    <div className="rv-empty">
      <strong>{title}</strong>
      {children && <p>{children}</p>}
    </div>
  );
}
