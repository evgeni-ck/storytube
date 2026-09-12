export function EmptyState({ title, hint, action }) {
  return (
    <div className="py-14 text-center">
      <p className="m-0 text-[16px] text-ink">{title}</p>
      {hint && <p className="m-0 mt-1.5 text-[14px] text-ink-2">{hint}</p>}
      {action && <div className="mt-4 flex justify-center">{action}</div>}
    </div>
  )
}
