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
  const activeSlide = usableSlides[activeIndex] || usableSlides[0];

  useEffect(() => {
    if (usableSlides.length < 2) return undefined;

    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % usableSlides.length);
    }, 4200);

    return () => window.clearInterval(timer);
  }, [usableSlides.length]);

  return (
    <div className="vHeroSlider">
      <a href={activeSlide.href || "#events"} className="vHeroBanner">
        {activeSlide.image ? (
          <img src={activeSlide.image} alt={activeSlide.title} />
        ) : (
          <div className="vHeroFallbackImage" />
        )}
        <span className="vHeroShade" />
        <span className="vHeroStatus">{activeSlide.status}</span>
        <div className="vHeroMeta">
          <div>
            <p>{activeSlide.title}</p>
            <span>
              {[activeSlide.date, activeSlide.location].filter(Boolean).join(" | ")}
            </span>
          </div>
          {activeSlide.subtitle && <strong>{activeSlide.subtitle}</strong>}
        </div>
      </a>

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
