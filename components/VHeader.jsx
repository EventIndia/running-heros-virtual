"use client";

import Link from "next/link";
import { useState } from "react";

const navLinks = [
  { href: "https://runningheros.in/event-by-city", label: "Event by City" },
  { href: "https://runningheros.in/blogs", label: "Blogs" },
  { href: "https://runningheros.in/create-event", label: "Create Event" },
];

function SearchIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="vHeaderSearchSvg">
      <path
        d="m20 20-4.6-4.6m2.1-5.2a7.3 7.3 0 1 1-14.6 0 7.3 7.3 0 0 1 14.6 0Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="vHeaderPinSvg">
      <path
        d="M12 21s7-5.2 7-12a7 7 0 1 0-14 0c0 6.8 7 12 7 12Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="12" cy="9" r="2.4" fill="currentColor" />
    </svg>
  );
}

export default function VHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="vHeader">
      <div className="vContainer vHeaderInner">
        <Link href="/" className="vBrand" aria-label="Virtual Running Heros">
          <span className="vBrandMark">
            <span />
          </span>
          <span>
            <strong>Running Heros</strong>
            <small>Virtual Runs</small>
          </span>
        </Link>

        <Link href="#events" className="vSearchPill">
          <span className="vSearchCircle">
            <SearchIcon />
          </span>
          <span>Search virtual marathons and runs.</span>
        </Link>

        <div className="vLocationPill">
          <PinIcon />
          <span>Delhi</span>
        </div>

        <nav className="vDesktopNav" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href}>
              {link.label}
            </Link>
          ))}
          <Link href="#events">Events</Link>
        </nav>

        <span className="vAvatar" aria-label="Account">
          A
        </span>

        <Link href="https://runningheros.in" className="vSwitchBack">
          Switch to Running Heros
        </Link>

        <button
          type="button"
          className="vMenuButton"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          <span />
          <span />
        </button>
      </div>

      {open && (
        <div className="vMobileMenu">
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href} onClick={() => setOpen(false)}>
              {link.label}
            </Link>
          ))}
          <Link href="#events" onClick={() => setOpen(false)}>
            Events
          </Link>
          <Link
            href="https://runningheros.in"
            className="vMobileSwitchBack"
            onClick={() => setOpen(false)}
          >
           Switch to Running Heros
          </Link>
        </div>
      )}
    </header>
  );
}
