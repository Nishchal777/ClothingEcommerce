"use client";
import React, { useState, useEffect } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const images = [
  { id: 1, img: "/images/slider/s3.png" },
  { id: 2, img: "/images/slider/s2.png" },
  { id: 3, img: "/images/slider/s1.png" },
  { id: 4, img: "/images/slider/s4.png" },
  { id: 5, img: "/images/slider/s5.png" },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    initial: 0,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });
  useEffect(() => {
    const interval = setInterval(() => {
      if (instanceRef.current) {
        instanceRef.current.next();
      }
    }, 3000); // 3 seconds

    return () => clearInterval(interval);
  }, [instanceRef]);
  return (
    <>
      <div className="relative overflow-hidden my-6 rounded-lg">
        <div ref={sliderRef} className="keen-slider h-[200px] md:h-[450px]">
          {images.map((slide) => (
            <div
              key={slide.id}
              className="keen-slider__slide flex items-center justify-center"
            >
              <img
                src={slide.img}
                alt={`Slide ${slide.id}`}
                className="w-full h-full object-cover "
              />
            </div>
          ))}
        </div>

        {/* Arrows */}
        {loaded && instanceRef.current && (
          <>
            <Arrow
              left
              onClick={(e) => {
                e.stopPropagation();
                instanceRef.current.prev();
              }}
              disabled={currentSlide === 0}
            />
            <Arrow
              onClick={(e) => {
                e.stopPropagation();
                instanceRef.current.next();
              }}
              disabled={
                currentSlide ===
                instanceRef.current.track.details.slides.length - 1
              }
            />
          </>
        )}
      </div>

      {/* Dots */}
      {loaded && instanceRef.current && (
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({
            length: instanceRef.current.track.details.slides.length,
          }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => instanceRef.current.moveToIdx(idx)}
              className={`w-2 h-2 rounded-full ${
                currentSlide === idx ? "bg-black" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      )}
    </>
  );
}

function Arrow({ left, onClick, disabled }) {
  return (
    <svg
      onClick={onClick}
      className={`w-6 h-6 absolute top-1/2 z-10 fill-white cursor-pointer transition transform -translate-y-1/2 ${
        left ? "left-2" : "right-2"
      } ${disabled ? "opacity-50 cursor-not-allowed" : "opacity-100"}`}
      viewBox="0 0 24 24"
    >
      {left ? (
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      ) : (
        <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
      )}
    </svg>
  );
}
