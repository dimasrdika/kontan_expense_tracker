"use client";
import React from "react";
import { ContainerScroll } from "../../components/ui/container-scroll-animation";

const Hero = () => {
  return (
    <section className="bg-gray-50 flex items-center flex-col">
      <div className="flex flex-col overflow-hidden">
        <ContainerScroll
          titleComponent={
            <>
              <h1 className="text-4xl font-semibold mb-8 text-black dark:text-white">
                Manage Your Finances Smarter with AI-Powered Insights <br />
                <span className="text-2xl md:text-[4rem] mb-2 text-primary font-bold mt-1 leading-none">
                  Guiding Your Financial Journey
                </span>
              </h1>
            </>
          }
          children={undefined}
        />
      </div>
    </section>
  );
};

export default Hero;
