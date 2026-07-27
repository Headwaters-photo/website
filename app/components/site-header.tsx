import Image from "next/image";
import Link from "next/link";

export function SiteHeader() {
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

      <div className="flex items-center gap-4 sm:gap-6 lg:gap-7">
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
            className="nav-link inline-flex min-h-11 min-w-22 items-center justify-center whitespace-nowrap rounded-sm text-base font-medium tracking-[0.035em] text-slate-700 lg:text-lg"
          >
            Pricing
          </Link>
        </nav>

        <span className="inline-flex min-h-11 items-center justify-center whitespace-nowrap rounded-full bg-slate-950 px-4 py-2.5 text-sm font-medium tracking-[0.025em] text-white shadow-[0_8px_24px_rgba(15,23,42,0.16)] sm:px-6 sm:text-base lg:text-lg">
          In development
        </span>
      </div>
    </header>
  );
}
