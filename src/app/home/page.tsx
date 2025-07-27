'use client';

import React, { useState, useEffect} from "react";

export default function Home() {
    return (
        <>
        <div className="flex justify-center items-center flex-row gap-2 border-2 min-h-screen">
            <h1 className="ml-[40%] text-6xl text-indigo-600 animate-pulse fixed">Home</h1>
            <h2>Me</h2>
        </div>
        </>
    )
}