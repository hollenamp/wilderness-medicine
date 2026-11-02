/**
 * **CURSOR INFO**
 * SECTION TYPE: Category cards with full-bleed images and CTAs
 * BEST FOR: Any page with categories
 * VISUAL STYLE: Modern, minimal, luxury, and clean
 * LAYOUT: Two equal columns (or stacked on mobile), full-height image cards
 * CONTENT ELEMENTS: Category image, title, "View Properties" button, overlay gradient
 * CONVERSION ROLE: Route users to category pages
 * IDEAL POSITION: Middle of page, after hero or intro
 * NOTES / MODIFIERS: Hover scale and border glow
 */

import { imgComponent3 } from '@/components/svg-icons';
import Image from 'next/image';
import { Button } from '@/components/UI/Button';

export function FullWidthTwoColumnImages() {
  return (
    <section className="flex flex-col md:flex-row">
      <div className="group w-full md:w-1/2 relative min-h-[650px] overflow-hidden cursor-pointer">
        <Image
          alt="Luxury bedroom"
          src="/images/luxury-bedroom.jpg"
          quality={75}
          fill
          priority
          sizes="2000"
          style={{
              objectFit: 'cover',
              objectPosition: 'center',
          }}
          className="bg-top max-h-[100vh] transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-zinc-900/55 transition-opacity duration-500 group-hover:opacity-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-900/30 to-zinc-900/70" />
        <div className="absolute inset-0 border-2 border-transparent transition-all duration-500 group-hover:border-[#C7AE7F]/60 group-hover:shadow-[inset_0_0_60px_rgba(199,174,127,0.08)]" />
        <div className="absolute bottom-24 left-8 right-8 text-center">
          <h3 className="text-2xl md:text-3xl text-white uppercase tracking-wide mb-6 transition-all duration-300 group-hover:tracking-widest">
            Luxury Residences
          </h3>
          <Button
            variant="ghost"
            className="hover:border-[#C7AE7F] hover:bg-[#C7AE7F] hover:text-zinc-900 hover:shadow-lg hover:shadow-[#C7AE7F]/20"
          >
            <span>View Properties</span>
            <Image className="w-2 h-4 transition-transform duration-300 group-hover:translate-x-1" src={imgComponent3} alt="Right arrow icon for View Properties" width={8} height={16} />
          </Button>
        </div>
      </div>

      <div className="group w-full md:w-1/2 relative min-h-[650px] overflow-hidden cursor-pointer">
        <Image
          alt="Luxury Interior"
          src="/images/luxury-interior-02.jpg"
          quality={75}
          fill
          priority
          sizes="2000"
          style={{
              objectFit: 'cover',
              objectPosition: 'center',
          }}
          className="bg-top max-h-[100vh] transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-zinc-900/55 transition-opacity duration-500 group-hover:opacity-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-900/30 to-zinc-900/70" />
        <div className="absolute inset-0 border-2 border-transparent transition-all duration-500 group-hover:border-[#C7AE7F]/60 group-hover:shadow-[inset_0_0_60px_rgba(199,174,127,0.08)]" />
        <div className="absolute bottom-24 left-8 right-8 text-center">
          <h3 className="text-2xl md:text-3xl text-white uppercase tracking-wide mb-6 transition-all duration-300 group-hover:tracking-widest">
            Exclusive Penthouses
          </h3>
          <Button
            variant="ghost"
            className="hover:border-[#C7AE7F] hover:bg-[#C7AE7F] hover:text-zinc-900 hover:shadow-lg hover:shadow-[#C7AE7F]/20"
          >
            <span>View Properties</span>
            <Image className="w-2 h-4 transition-transform duration-300 group-hover:translate-x-1" src={imgComponent3} alt="Right arrow icon for View Properties" width={8} height={16} />
          </Button>
        </div>
      </div>
    </section>
  );
}
