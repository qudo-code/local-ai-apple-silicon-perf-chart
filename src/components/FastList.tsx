"use client";

import React, { useState } from 'react';

// Wrap the component itself in a block, exporting it cleanly
const HeavyListItem = function HeavyListItem({ index }: { index: number }) {
    return (
        <div className="flex items-center justify-between p-4 border rounded shadow-sm bg-card text-card-foreground">
            <div className="flex flex-col">
                <span className="font-semibold">Item {index}</span>
                <span className="text-sm text-muted-foreground">This is a fast rendering item.</span>
            </div>
            <button className="px-4 py-2 text-sm font-medium transition-colors border max-w-max rounded-md bg-primary text-primary-foreground hover:bg-primary/90">
                Action
            </button>
        </div>
    );
};

export default function FastList() {
    const [count, setCount] = useState(10);

    return (
        <div className="flex flex-col gap-4 w-full max-w-2xl mt-8">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Million.js Optimized List</h2>
                <div className="flex gap-2">
                    <button
                        onClick={() => setCount(c => c + 10)}
                        className="px-3 py-1 text-sm border rounded hover:bg-muted"
                    >
                        Add 10
                    </button>
                    <button
                        onClick={() => setCount(c => Math.max(0, c - 10))}
                        className="px-3 py-1 text-sm border border-destructive/50 text-destructive rounded hover:bg-destructive/10"
                    >
                        Remove 10
                    </button>
                </div>
            </div>

            <div className="grid gap-2">
                {Array.from({ length: count }).map((_, i) => (
                    <HeavyListItem key={i} index={i} />
                ))}
            </div>
        </div>
    );
}
