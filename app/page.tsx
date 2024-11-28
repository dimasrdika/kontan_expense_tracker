"use client";

import React, { useState, useEffect } from "react";
import Header from "./_components/header";
import Hero from "./_components/hero";
import LoaderSpinner from "./_components/loaderspinner";

export default function Home() {
  // State untuk menentukan apakah konten telah dimuat
  const [loading, setLoading] = useState(true);

  // Gunakan useEffect untuk mengatur loading selama 2 detik
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Setelah 2 detik, set loading ke false
    }, 2000); // 2000ms = 2 detik

    return () => clearTimeout(timer); // Bersihkan timer jika komponen dibongkar
  }, []);

  return (
    <div className="overflow-x-hidden min-h-screen">
      {loading ? (
        <LoaderSpinner /> // Tampilkan spinner selama loading
      ) : (
        <>
          <Header />
          <Hero />
        </>
      )}
    </div>
  );
}
