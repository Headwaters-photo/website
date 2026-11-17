import Image from "next/image";
import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main className="flex-1 bg-white">
        <h1 className="px-6 py-12 text-center font-editorial text-4xl font-medium text-slate-900 sm:py-20 sm:text-6xl">
          Coming Soon
        </h1>

        <figure className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[3/2] lg:aspect-[11/5]">
          <Image
            src="/images/xh2a5860-featured.webp"
            alt="A young adventurer standing at the edge of a turquoise mountain lake."
            fill
            loading="eager"
            sizes="100vw"
            className="object-cover object-[50%_50%] sm:object-center lg:object-[50%_62%]"
          />
        </figure>
      </main>

      <SiteFooter />
    </>
  );
}
