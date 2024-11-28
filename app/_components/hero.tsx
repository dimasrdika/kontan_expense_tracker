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
              <h1 className="text-4xl font-semibold text-black dark:text-white">
                Manage your Money with AI-Driven Personal <br />
                <span className="text-4xl md:text-[6rem] text-primary font-bold mt-1 leading-none">
                  Finance Advisor
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