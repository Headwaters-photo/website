import Image from "next/image";

export default function Home() {
  return (
    <main className="relative isolate flex min-h-dvh overflow-hidden bg-white px-6 py-8 sm:px-10 sm:py-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[55%] bg-[radial-gradient(ellipse_at_bottom,_rgba(14,116,144,0.12),_transparent_68%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-32rem] left-1/2 -z-10 h-[42rem] w-[72rem] -translate-x-1/2 rounded-[50%] border border-sky-950/10 bg-sky-50/50 blur-[1px]"
      />

      <section className="relative -top-6 mx-auto flex w-full max-w-5xl flex-col items-center justify-center pb-8 pt-20 text-center sm:pb-12">
        <div className="hero-enter flex flex-col items-center gap-16 sm:gap-20">
          <button
            type="button"
            className="inline-flex min-h-16 items-center justify-center rounded-[2rem] bg-slate-950 px-11 py-4 text-lg font-medium text-white shadow-[0_12px_35px_rgba(15,23,42,0.18)] transition duration-300 hover:-translate-y-0.5 hover:bg-cyan-950 hover:shadow-[0_16px_40px_rgba(15,23,42,0.22)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-700 active:translate-y-0"
          >
            Coming Soon
          </button>

          <h1 className="flex justify-center">
            <Image
              src="/headwaters-logo-horizontal.png"
              alt="Headwaters"
              width={800}
              height={200}
              priority
              className="h-auto w-[min(84vw,680px)]"
            />
          </h1>

          <h2 className="mx-auto max-w-3xl text-balance text-[clamp(1.75rem,4vw,3.25rem)] font-medium leading-[1.05] tracking-[-0.045em] text-slate-800">
            Helping photographers remember why a photograph matters.
          </h2>
        </div>
      </section>
    </main>
  );
}
