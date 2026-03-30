import React, { useRef } from 'react'
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const carSectionRef = useRef();
  const carRef = useRef();

  const text = "WELCOME ITZFIZZ";
  const letters = text.split("");

  useGSAP(() => {

    //  Letters animation
    gsap.from(".letter", {
      y: 100,
      opacity: 0,
      duration: 0.7,
      stagger: 0.06,
      ease: "elastic.out(1, 0.4)",
      });

    // ── 2. Stats one by one — triggered by scroll ──
    gsap.from(".stat", {
      y: 40,
      opacity: 0,
      duration: 0.7,
      delay:1,
      stagger: 0.25,
      ease: "power2.out",
      });

    // ── 3. Car drives in from left — triggered by scroll into car section ──
    gsap.from(carRef.current, {
      x: -1000,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: carSectionRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      }
    });

    // ── 4. Car drives RIGHT — scrubbed to scroll ──
    gsap.to(carRef.current, {
      x: "130vw",
      rotation:5,
      scale:1.05,
      ease: "none",
      scrollTrigger: {
        trigger: carSectionRef.current,
        start: "top top",
        end: "+=500%",
        scrub: 2.5,
        pin: true,
        anticipatePin: 1,
      }
    });

  });

  return (
    <>
      {/* ── HERO SECTION ── */}
      <div className="hero bg-black w-screen h-screen flex flex-col justify-center items-center gap-14 overflow-hidden px-6">

        {/* Headline */}
        <h1 className="text-white text-[clamp(26px,4.5vw,70px)] tracking-[0.4em] flex flex-wrap justify-center">
          {letters.map((char, index) => (
            <span key={index} className="letter inline-block">
              {char === " " ? "\u00A0\u00A0" : char}
            </span>
          ))}
        </h1>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-white w-full max-w-5xl px-8">
          <div className="stat border-l-2 border-gray-500 pl-4">
            <h2 className="text-3xl md:text-4xl font-bold">58%</h2>
            <p className="text-gray-400 text-sm mt-1 leading-snug">Increase in Pickup Point Adoption  </p>
          </div>
          <div className="stat border-l-2 border-gray-500 pl-4">
            <h2 className="text-3xl md:text-4xl font-bold">23%</h2>
            <p className="text-gray-400 text-sm mt-1 leading-snug">Reduction in Customer Support Calls</p>
          </div>
          <div className="stat border-l-2 border-gray-500 pl-4">
            <h2 className="text-3xl md:text-4xl font-bold">27%</h2>
            <p className="text-gray-400 text-sm mt-1 leading-snug">Growth in Pickup Usage </p>
          </div>
          <div className="stat border-l-2 border-gray-500 pl-4">
            <h2 className="text-3xl md:text-4xl font-bold">40%</h2>
            <p className="text-gray-400 text-sm mt-1 leading-snug">Decrease in Customer Queries</p>
          </div>
        </div>
      </div>

      {/* ── CAR SCROLL SECTION ── */}
      <div
        ref={carSectionRef}
        className="bg-black w-screen h-screen flex justify-center items-center overflow-hidden"
      >
        <img
          ref={carRef}
          src="https://freepngimg.com/thumb/car/2-2-car-transparent-thumb.png"
          alt="McLaren top view"
          className="w-[60vw] max-w-180 object-contain"
        />
      </div>

      {/* ── NEXT SECTION ── */}
      <div className="bg-zinc-900 w-screen h-screen flex justify-center items-center">
        <p className="text-white text-3xl tracking-widest font-light">NEXT SECTION</p>
      </div>
    </>
  );
}

export default App;