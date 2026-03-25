"use client"; 

import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

export default function SearchInput({ defaultValue }: { defaultValue: string}) {
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
        <input
            type="text"
            value={value}
            onChange={handleChange}
            className="border border-gray-300 rounded-full px-5 py-3 focus:outline-none focus:ring-orange-400 shadow-sm mb-6"
            placeholder="Zoek een naam of locatie op.."
        />
    );
}

