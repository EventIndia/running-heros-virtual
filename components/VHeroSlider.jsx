"use client";

import { useEffect, useMemo, useState } from "react";

const fallbackSlides = [
  {
    id: "virtual-running-heros",
    title: "Virtual Running Heros",
    subtitle: "3K | 5K | 10K | 21K",
    location: "Run from anywhere",
    href: "#events",
    status: "Registration Open",
  },
];

export default function VHeroSlider({ slides = [] }) {
  const usableSlides = useMemo(
    () => (slides.length ? slides : fallbackSlides).slice(0, 3),
    [slides],
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const orderedSlides = useMemo(
    () =>
      usableSlides.map(
        (_, index) => usableSlides[(activeIndex + index) % usableSlides.length],
      ),
    [activeIndex, usableSlides],
  );

  useEffect(() => {
    if (usableSlides.length < 2) return undefined;

    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % usableSlides.length);
    }, 4200);

    return () => window.clearInterval(timer);
  }, [usableSlides.length]);

  const showPrevious = () => {
    setActiveIndex(
      (index) => (index - 1 + usableSlides.length) % usableSlides.length,
    );
  };

  const showNext = () => {
    setActiveIndex((index) => (index + 1) % usableSlides.length);
  };

  return (
    <div className="vHeroSlider">
      <div className="vHeroTrack">
        {orderedSlides.map((slide, index) => (
          <a
            href={slide.href || "#events"}
            className="vHeroBanner"
            key={`${slide.id || slide.title || index}-${index}`}
          >
            {slide.image ? (
              <img src={slide.image} alt={slide.title} />
            ) : (
              <div className="vHeroFallbackImage" />
            )}
            <span className="vHeroShade" />
            <span className="vHeroStatus">{slide.status}</span>
          </a>
        ))}
      </div>

      {usableSlides.length > 1 && (
        <>
          <button
            type="button"
            className="vHeroArrow vHeroArrowPrev"
            onClick={showPrevious}
            aria-label="Previous virtual banner"
          >
            ‹
          </button>
          <button
            type="button"
            className="vHeroArrow vHeroArrowNext"
            onClick={showNext}
            aria-label="Next virtual banner"
          >
            ›
          </button>
        </>
      )}

      {usableSlides.length > 1 && (
        <div className="vHeroDots" aria-label="Hero slides">
          {usableSlides.map((slide, index) => (
            <button
              type="button"
              key={slide.id || slide.title || index}
              className={index === activeIndex ? "isActive" : ""}
              onClick={() => setActiveIndex(index)}
              aria-label={`Show slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
