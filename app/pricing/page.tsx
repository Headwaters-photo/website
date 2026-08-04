import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";

export const metadata: Metadata = {
  title: "Pricing — Headwaters",
  description:
    "Headwaters pricing is still taking shape as the photography experience is developed carefully.",
};

export default function PricingPage() {
  return (
    <>
      <main className="relative flex min-h-[calc(100dvh-161px)] flex-col bg-white pt-[75px]">
        <SiteHeader />

        <section className="flex flex-1 items-center px-6 py-20 sm:px-10 sm:py-24">
          <div className="mx-auto w-full max-w-3xl text-center">
            <p className="font-brand text-xs font-semibold uppercase tracking-[0.16em] text-[var(--logo-blue-eyebrow)] sm:text-sm">
              Pricing
            </p>
            <h1
              className="mt-5 text-balance text-[clamp(2.75rem,7vw,5.25rem)] font-medium leading-[1.1] tracking-[-0.012em] text-slate-900"
              style={{
                fontFamily:
                  "var(--font-newsreader), Newsreader, Georgia, serif",
              }}
            >
              Pricing is still taking shape.
            </h1>
            <p className="mx-auto mt-7 max-w-2xl text-lg leading-[1.6] text-slate-700 sm:text-xl">
              Headwaters is still in development, and we’re working through the
              details carefully. Pricing will be shared as the experience comes
              to life.
            </p>
            <Link
              href="/"
              className="text-link mt-9 inline-flex min-h-11 items-center rounded-sm font-brand text-base font-medium tracking-[0.02em] text-slate-700"
            >
              Back to home
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
