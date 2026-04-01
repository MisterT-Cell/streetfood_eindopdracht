"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";

export default function SearchInput({ defaultValue }: { defaultValue: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const [value, setValue] = useState(defaultValue);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value;
    setValue(newValue);

    if (newValue) {
      router.push(`${pathname}?q=${encodeURIComponent(newValue)}`);
    } else {
      router.push(pathname);
    }
  }

  return (
    <div className="relative max-w-xl">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-300/60 pointer-events-none" />
      <input
        type="text"
        value={value}
        onChange={handleChange}
        className="w-full bg-white/10 border border-white/20 focus:border-emerald-400 focus:bg-white/15 text-white pl-11 pr-5 py-3.5 text-sm rounded-2xl focus:outline-none transition-all duration-200 placeholder-white/30 backdrop-blur-sm"
        placeholder="Zoek op naam of locatie..."
      />
    </div>
  );
}
