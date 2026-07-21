export default function Loader({ label = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-10 h-10 border-4 border-[#EDE8DF] border-t-orange rounded-full animate-spin mb-4" />
      <p className="text-sm text-ink-light">{label}</p>
    </div>
  )
}