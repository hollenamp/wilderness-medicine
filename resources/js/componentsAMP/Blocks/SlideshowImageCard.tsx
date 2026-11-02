'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export interface SlideshowImageCardProps {
  images: { src: string; alt: string }[];
  currentIndex: number;
  caption?: string;
}

export function SlideshowImageCard({
  images,
  currentIndex,
  caption,
}: SlideshowImageCardProps) {
  const current = images[currentIndex % images.length];
  return (
    <figure
      className="group relative w-full aspect-square rounded-xl overflow-hidden border-4 border-white/80 shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.12)] transition-all duration-300 ease-out hover:shadow-[0_0_0_1px_rgba(0,0,0,0.08),0_20px_40px_rgba(0,0,0,0.18)] hover:-translate-y-1"
      role="presentation"
    >
      <div className="relative w-full h-full bg-zinc-100 transition-transform duration-500 ease-out group-hover:scale-110">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.src}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Image
              src={current.src}
              alt={current.alt}
              width={800}
              height={800}
              className="object-cover w-full h-full"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
        </AnimatePresence>
      </div>
      {caption ? (
      <figcaption className="absolute bottom-0 left-0 right-0 px-4 py-4 text-center text-base md:text-lg text-white leading-relaxed bg-black/40 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-0">
        {caption}
      </figcaption>
      ): null}
    </figure>
  );
}
