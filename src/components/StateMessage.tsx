type StateMessageProps = {
  title: string
  description: string
}

export function StateMessage({ title, description }: StateMessageProps) {
  return (
    <div className="mt-6 rounded-xl border border-dashed bg-white p-6 text-center">
      <p className="font-semibold text-slate-800">{title}</p>
      <p className="mt-1 text-sm text-slate-500">{description}</p>
    </div>
  )
}
