"use client";

import React, { useState, useEffect } from "react";
import Header from "./_components/header";
import Hero from "./_components/hero";
import LoaderSpinner from "./_components/loaderspinner";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className=" min-h-screen bg-gray-50">
      {loading ? (
        <LoaderSpinner />
      ) : (
        <>
          <Header />
          <Hero />
        </>
      )}
    </div>
  );
}
