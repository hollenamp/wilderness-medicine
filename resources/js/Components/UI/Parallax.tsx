import { motion, useScroll, useTransform } from 'framer-motion';
import { ReactNode, useRef } from 'react';

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  speed?: number;
};

export const Parallax: React.FC<ParallaxProps> = ({
  children,
  className = '',
  speed = 0.5,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  
  // Track scroll progress as this element enters and leaves the viewport
  // Using 'start end' to 'end start' means we track from when the element starts entering
  // the viewport from the bottom until it finishes leaving at the top
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  
  // Transform range: moves the element at a different speed than scroll
  // Speed of 0.5 means it moves at half the scroll speed (creating parallax effect)
  // Positive values move down, negative move up
  // As we scroll down (progress 0->1), the image moves up (negative y)
  // Using a larger range (300px) to ensure visible parallax effect
  const maxMovement = 300 * Math.abs(speed);
  const y = useTransform(scrollYProgress, [0, 1], [maxMovement, -maxMovement]);

  return (
    <div className="relative w-full h-full">
      <motion.div 
        ref={ref}
        style={{ 
          y,
          position: 'absolute',
          top: -maxMovement,
          left: 0,
          right: 0,
          height: `calc(100% + ${maxMovement * 2}px)`
        }} 
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
};
