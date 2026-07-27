import Image from "next/image";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-950/8 bg-slate-50/45 px-6 py-10 sm:px-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left">
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
            className="h-auto w-36"
          />
        </Link>

        <div className="flex flex-col items-center gap-2 text-sm text-slate-600 sm:items-end">
          <a className="footer-link" href="mailto:hello@headwaters.photo">
            hello@headwaters.photo
          </a>
          <p>© {new Date().getFullYear()} Headwaters</p>
        </div>
      </div>
    </footer>
  );
}
