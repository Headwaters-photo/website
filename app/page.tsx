import Image from "next/image";
import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";

const featureItems = [
  {
    tone: "light",
    title: "Remember the place",
    description:
      "Preserve the locations and landscapes that shaped the experience.",
  },
  {
    tone: "medium",
    title: "Tell the story",
    description:
      "Capture the people, moments, and decisions beyond the frame.",
  },
  {
    tone: "bright",
    title: "Keep the adventure",
    description:
      "Create a lasting record of the journeys behind your photographs.",
  },
];

export default function Home() {
  return (
    <>
      <main>
        <section className="relative isolate overflow-hidden bg-white pt-[115px] sm:pt-[130px]">
          <SiteHeader />

          <div className="flex w-full flex-col items-center text-center">
              <h1 className="flex justify-center px-6 sm:px-10">
                <Image
                  src="/headwaters-logo-horizontal-v2.png"
                  alt="Headwaters"
                  width={900}
                  height={200}
                  preload
                  className="h-auto w-[min(76vw,590px)]"
                />
              </h1>

              <h2
                className="mx-auto mt-10 w-[calc(100%-3rem)] max-w-3xl text-center text-balance text-[clamp(2rem,4.5vw,3.5rem)] font-medium leading-[1.2] tracking-[-0.012em] text-slate-900 sm:mt-12 sm:w-[calc(100%-5rem)]"
                style={{
                  fontFamily:
                    "var(--font-newsreader), Newsreader, Georgia, serif",
                }}
              >
                Remember the adventure
                <br className="hidden lg:block" /> behind every photograph
              </h2>

              <figure className="reveal-on-scroll relative mt-24 aspect-[4/5] w-full overflow-hidden sm:mt-28 sm:aspect-[3/2] lg:mt-40 lg:aspect-[11/5]">
                <Image
                  src="/images/xh2a5860-featured.webp"
                  alt="A young adventurer standing at the edge of a turquoise mountain lake."
                  fill
                  loading="eager"
                  sizes="100vw"
                  className="object-cover object-[50%_50%] sm:object-center lg:object-[50%_62%]"
                />
              </figure>

              <div className="reveal-on-scroll w-full px-6 pb-8 pt-8 text-left sm:px-10 sm:pb-10 sm:pt-10 lg:pt-12">
                <div className="mx-auto max-w-3xl">
                  <p className="font-brand text-xs font-bold uppercase tracking-[0.16em] text-[var(--logo-blue-eyebrow)] sm:text-sm">
                    The story behind the frame
                  </p>
                  <p className="mt-4 text-base leading-[1.5] text-slate-700 sm:text-lg lg:text-xl">
                    Headwaters is a new space for photographers to preserve the
                    places, stories, and experiences that give their images
                    meaning.
                  </p>
                </div>
              </div>
            </div>
        </section>

        <section
          id="features"
          className="scroll-mt-24 bg-white px-6 pb-16 pt-8 sm:px-10 sm:pb-20 sm:pt-10 lg:pb-24"
        >
          <div className="mx-auto max-w-6xl">
            <h2
              className="text-center text-balance text-[clamp(2.25rem,5vw,3.75rem)] font-medium leading-[1.15] tracking-[-0.01em] text-slate-900"
              style={{
                fontFamily:
                  "var(--font-newsreader), Newsreader, Georgia, serif",
              }}
            >
              More than a photograph
            </h2>

            <div className="mt-14 grid items-stretch gap-7 sm:mt-16 sm:gap-8 md:grid-cols-3 md:gap-6 lg:mt-20 lg:gap-8">
              {featureItems.map((item) => (
                <article
                  key={item.title}
                  className={`feature-card feature-card--${item.tone} reveal-on-scroll flex h-full flex-col p-8 sm:p-9 md:p-7 lg:p-9`}
                >
                  <FeatureIcon tone={item.tone} />

                  <h3 className="font-brand text-2xl font-semibold tracking-[-0.015em] text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-4 max-w-sm text-lg leading-[1.6] text-slate-700">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}

function FeatureIcon({ tone }: { tone: string }) {
  const iconClass = `feature-card__icon feature-card__icon--${tone} mb-8 h-9 w-9`;

  if (tone === "light") {
    return (
      <svg
        aria-hidden="true"
        className={iconClass}
        viewBox="0 0 32 32"
        fill="none"
      >
        <path d="M16 28s9-7.2 9-16a9 9 0 1 0-18 0c0 8.8 9 16 9 16Z" />
        <circle cx="16" cy="12" r="3" />
      </svg>
    );
  }

  if (tone === "medium") {
    return (
      <svg
        aria-hidden="true"
        className={iconClass}
        viewBox="0 0 32 32"
        fill="none"
      >
        <path d="M5 6.5h6.5A4.5 4.5 0 0 1 16 11v15a4.5 4.5 0 0 0-4.5-4.5H5v-15Z" />
        <path d="M27 6.5h-6.5A4.5 4.5 0 0 0 16 11v15a4.5 4.5 0 0 1 4.5-4.5H27v-15Z" />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      className={iconClass}
      viewBox="0 0 32 32"
      fill="none"
    >
      <circle cx="16" cy="16" r="11" />
      <path d="m20.5 11.5-2.7 6.3-6.3 2.7 2.7-6.3 6.3-2.7Z" />
    </svg>
  );
}
