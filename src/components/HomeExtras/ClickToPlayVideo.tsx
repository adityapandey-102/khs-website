"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

// Video only mounts (and starts fetching bytes) once the user clicks — this
// component sits below the fold with no reason to spend bandwidth on a video
// most visitors will never watch.
export function ClickToPlayVideo({
  src,
  poster,
  alt,
}: {
  src: string;
  poster: string;
  alt: string;
}) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return <video src={src} controls autoPlay playsInline className="h-full w-full object-cover" />;
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      aria-label="Play video"
      className="group relative block h-full w-full cursor-pointer"
    >
      <Image src={poster} alt={alt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
      <div className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-black/35" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-primary-dark transition-transform group-hover:scale-110">
          <Play size={22} className="ml-1" fill="currentColor" />
        </div>
      </div>
      <div className="pointer-events-none absolute right-4 top-4 flex items-center gap-2 bg-white/90 px-3 py-1.5 text-[0.7rem] font-semibold uppercase tracking-wide text-primary-dark">
        <Play size={14} /> Play Video
      </div>
    </button>
  );
}
