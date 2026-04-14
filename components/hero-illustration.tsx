import Image from "next/image";

export function HeroIllustration() {
  return (
    <div className="relative mx-auto w-full max-w-[21rem] sm:max-w-[24rem]">
      <div className="absolute inset-x-8 top-8 h-28 rounded-full bg-[radial-gradient(circle,var(--theme-soft)_0%,rgba(250,243,237,0)_72%)] blur-3xl" />
      <div className="relative overflow-hidden rounded-[36px] bg-[linear-gradient(180deg,rgba(255,255,255,0.58)_0%,rgba(255,255,255,0.32)_100%)] p-3 shadow-[0_18px_44px_rgba(53,39,131,0.10)]">
        <div className="overflow-hidden rounded-[28px] bg-[rgba(255,255,255,0.52)]">
          <Image
            alt="Gezin in een zachte omhelzing"
            className="h-auto w-full object-cover"
            height={768}
            priority
            sizes="(max-width: 640px) 21rem, 24rem"
            src="/images/gezin-zachte-omhelzing.png"
            width={1152}
          />
        </div>
      </div>
    </div>
  );
}
