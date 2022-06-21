export default function Button({ label, onClick }) {
  return (
    <button onClick={onClick} className="mt-4 py-2.5 px-6 text-gray-900 font-medium bg-[#61fbc0] hover:bg-[#61dafb]/80 transition duration-200">
      {label}
    </button>
  )
}
