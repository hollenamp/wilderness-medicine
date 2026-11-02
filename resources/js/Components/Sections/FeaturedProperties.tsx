/**
 * **CURSOR INFO**
 * SECTION TYPE: Featured content / services list with CTA
 * BEST FOR: Landing pages, showcasing service offerings or featured listings
 * VISUAL STYLE: Modern, minimal, luxury, and clean
 * LAYOUT: Centered header, two-column grid (copy + list left, image right)
 * CONTENT ELEMENTS: Headline, feature list with checkmarks, CTA button, hero image
 * CONVERSION ROLE: Highlight offerings, drive "View All" or primary CTA
 * IDEAL POSITION: Middle of page
 * NOTES / MODIFIERS: Image zoom on scroll-in, responsive
 */

import { imgComponent1 } from '../svg-icons';
import { motion } from 'framer-motion';
import { Button } from '@/components/UI/Button';
import { ChevronRight } from 'lucide-react';

const imageZoomVariants = {
  hidden: { scale: 1.1 },
  visible: {
    scale: 1,
    transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export function FeaturedProperties() {
  return (
    <div className="md:bg-[linear-gradient(270deg,theme(colors.zinc.900)_33%,white_33%)] w-full overflow-hidden">
      <section className="mx-auto max-w-7xl py-8 px-4 md:py-16 md:px-8 lg:py-24 lg:px-12">
        <div className="text-center mb-16 md:max-w-[60%]">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal uppercase tracking-tight text-zinc-900 mb-8">
            Discover Luxury
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h3 className="text-2xl md:text-3xl uppercase tracking-wide text-zinc-900">All Services</h3>
            <p className="text-base md:text-xl font-light leading-relaxed text-zinc-900">
              Everything you need for luxury real estate transactions, 
              expertly handled by our award-winning team.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <img className="w-4 h-4" src={imgComponent1} alt="Checkmark" width={16} height={16} />
                <span className="text-base md:text-xl font-light text-zinc-900">Luxury Property Sales</span>
              </div>
              <div className="flex items-center space-x-4">
                <img className="w-4 h-4" src={imgComponent1} alt="Checkmark" width={16} height={16} />
                <span className="text-base md:text-xl font-light text-zinc-900">Exclusive Property Acquisition</span>
              </div>
              <div className="flex items-center space-x-4">
                <img className="w-4 h-4" src={imgComponent1} alt="Checkmark" width={16} height={16} />
                <span className="text-base md:text-xl font-light text-zinc-900">Portfolio Management</span>
              </div>
            </div>
            
            <Button variant="primary" asChild>
              <a href="#contact">
                Get Started
                <ChevronRight className="w-5 h-5" />
              </a>
            </Button>
          </div>
          
          <div className="relative h-96 w-full overflow-hidden">
            <motion.div
              className="absolute inset-0"
              variants={imageZoomVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              <img
                alt="Luxury home interior"
                src="/images/luxury-interior.jpg"
                sizes="2000"
                style={{
                  objectFit: 'cover',
                  objectPosition: 'right center',
                }}
                className="w-full h-full inset-0 absolute bg-top max-h-[100vh]"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
