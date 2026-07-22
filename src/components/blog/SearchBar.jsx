import { Search } from "lucide-react";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative w-full max-w-xl">
      <Search
        size={18}
        strokeWidth={2}
        className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search posts or authors..."
        className="
          w-full
          h-12
          rounded-2xl
          border border-[#E5DED2]
          bg-white
          pl-10
          pr-5
          text-[15px]
          placeholder:text-[#9C958C]
          focus:outline-none
          focus:border-[#FF6B00]
          focus:ring-2
          focus:ring-orange-100
          transition
        "
      />
    </div>
  );
}