import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="relative h-[calc(100vh-156px)] items-center justify-center text-center">
      <Image
        src="/images/cover-large.jpg"
        alt="Recepten"
        width={1024}
        height={717}
        className="mx-auto h-full w-full object-cover object-center"
      />
      <div className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 p-6 text-3xl font-bold text-emerald-50 sm:text-4xl md:text-5xl lg:text-6xl">
        <div className="app-container bg-black/50 p-6">
          <h1>Organiseer jouw recepten met gemak.</h1>
          <Link href="/recipes" className="btn mt-6 inline-block">
            Proef ervan!
          </Link>
        </div>
      </div>
    </div>
  );
}
