import Image from "next/image";

export function SiteHeader() {
  return (
    <header className="flex h-[75px] shrink-0 items-center justify-center border-b border-slate-950/8 bg-[var(--header-background)] px-4 sm:px-6 lg:px-10">
      <Image
        src="/headwaters-logo-horizontal-v2.png"
        alt="Headwaters"
        width={900}
        height={200}
        loading="eager"
        className="h-auto w-28 sm:w-40 lg:w-48"
      />
    </header>
  );
}
