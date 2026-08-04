"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export function SiteHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isMenuOpen) return;

    function handlePointerDown(event: PointerEvent) {
      const target = event.target as Node;

      if (
        !menuRef.current?.contains(target) &&
        !menuButtonRef.current?.contains(target)
      ) {
        setIsMenuOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <header className="font-brand absolute inset-x-0 top-0 z-10 flex h-[75px] items-center justify-between border-b border-slate-950/8 bg-white px-4 sm:px-6 lg:px-10">
      <Link
        href="/"
        aria-label="Headwaters home"
        className="rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--logo-blue-bright)]"
      >
        <Image
          src="/headwaters-logo-horizontal-v2.png"
          alt="Headwaters"
          width={900}
          height={200}
          className="h-auto w-28 sm:w-40 lg:w-48"
        />
      </Link>

      <button
        ref={menuButtonRef}
        type="button"
        aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-controls="mobile-navigation"
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen((open) => !open)}
        className="inline-flex size-11 items-center justify-center rounded-sm text-slate-800 transition-colors hover:text-[var(--logo-blue-bright-ink)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--logo-blue-bright)] sm:hidden"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="size-6"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2"
        >
          {isMenuOpen ? (
            <>
              <path d="M5 5l14 14" />
              <path d="M19 5L5 19" />
            </>
          ) : (
            <>
              <path d="M4 7h16" />
              <path d="M4 12h16" />
              <path d="M4 17h16" />
            </>
          )}
        </svg>
      </button>

      <div className="hidden items-center gap-4 sm:flex sm:gap-6 lg:gap-7">
        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-4 sm:flex lg:gap-6"
        >
          <Link
            href="/#features"
            className="nav-link inline-flex min-h-11 min-w-22 items-center justify-center whitespace-nowrap rounded-sm text-base font-medium tracking-[0.035em] text-slate-700 lg:text-lg"
          >
            Features
          </Link>
          <Link
            href="/pricing"
            aria-current={pathname === "/pricing" ? "page" : undefined}
            className="nav-link inline-flex min-h-11 min-w-22 items-center justify-center whitespace-nowrap rounded-sm text-base font-medium tracking-[0.035em] text-slate-700 lg:text-lg"
          >
            Pricing
          </Link>
        </nav>

        <span className="hidden min-h-11 items-center justify-center whitespace-nowrap rounded-full bg-slate-950 px-4 py-2.5 text-sm font-medium tracking-[0.025em] text-white shadow-[0_8px_24px_rgba(15,23,42,0.16)] sm:inline-flex sm:px-6 sm:text-base lg:text-lg">
          In development
        </span>
      </div>

      {isMenuOpen && (
        <div
          ref={menuRef}
          id="mobile-navigation"
          className="absolute right-4 top-[calc(100%+0.75rem)] max-h-[calc(100dvh-6.25rem)] w-[calc(100vw-2rem)] max-w-sm overflow-y-auto overscroll-contain rounded-2xl border border-slate-950/10 bg-white p-3 shadow-[0_18px_48px_rgba(15,23,42,0.18)] sm:hidden"
        >
          <nav aria-label="Mobile primary navigation">
            <Link
              href="/#features"
              onClick={closeMenu}
              className="nav-link flex min-h-12 items-center rounded-lg px-4 text-base font-medium tracking-[0.035em] text-slate-700"
            >
              Features
            </Link>
            <Link
              href="/pricing"
              aria-current={pathname === "/pricing" ? "page" : undefined}
              onClick={closeMenu}
              className="nav-link flex min-h-12 items-center rounded-lg px-4 text-base font-medium tracking-[0.035em] text-slate-700"
            >
              Pricing
            </Link>
          </nav>
          <div className="mt-2 border-t border-slate-950/8 px-2 pt-3">
            <span className="inline-flex min-h-10 items-center justify-center whitespace-nowrap rounded-full bg-slate-950 px-4 py-2 text-sm font-medium tracking-[0.025em] text-white shadow-[0_8px_24px_rgba(15,23,42,0.16)]">
              In development
            </span>
          </div>
        </div>
      )}
    </header>
  );
}
