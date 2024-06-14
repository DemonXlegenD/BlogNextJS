"use client";

import { useState } from "react";

export const MDXCounter = () => {
    const [count, setCount] = useState(0);

    return (
        <div>
            <button className="inline-block px-8 py-3 text-sm font-medium " onClick={() => {
                setCount(count + 1);
            }}>
                {count}
            </button>
        </div>
    )
}