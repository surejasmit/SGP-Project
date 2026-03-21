import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { IsometricClassroom } from './isometric-classroom';

// Define the props interface for type safety and reusability
interface MinimalistHeroProps {
  mainText: string;
  overlayText: {
    part1: string;
    part2: string;
  };
  locationText: string;
  className?: string;
}



// The main reusable Hero Section component (no image variant)
export const MinimalistHero = ({
  mainText,
  overlayText,
  locationText,
  className,
}: MinimalistHeroProps) => {
  return (
    <div
      className={cn(
        'relative flex h-screen w-full flex-col items-center justify-between overflow-hidden bg-background pt-24 p-8 font-sans md:p-12 md:pt-24',
        className
      )}
    >

      {/* Main Content Area */}
      <div className="relative flex w-full max-w-7xl flex-grow items-center justify-center">
        {/* Isometric Classroom Illustration */}
        <IsometricClassroom className="absolute z-0 h-[300px] w-[300px] md:h-[400px] md:w-[400px] lg:h-[500px] lg:w-[500px]" />

        {/* Text Content overlaying the circle */}
        <div className="relative z-20 grid w-full max-w-5xl grid-cols-1 items-center gap-8 md:grid-cols-2">
          {/* Left Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="text-center md:text-left"
          >
            <p className="mx-auto max-w-xs text-sm leading-relaxed text-foreground/80 md:mx-0">{mainText}</p>
          </motion.div>

          {/* Right Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="flex items-center justify-center text-center md:justify-start"
          >
            <h1 className="text-7xl font-extrabold text-foreground md:text-8xl lg:text-9xl">
              {overlayText.part1}
              <br />
              {overlayText.part2}
            </h1>
          </motion.div>
        </div>
      </div>

      {/* Footer Elements */}
      <footer className="z-30 flex w-full max-w-7xl items-center justify-end">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.3 }}
          className="text-sm font-medium text-foreground/80"
        >
          {locationText}
        </motion.div>
      </footer>
    </div>
  );
};
