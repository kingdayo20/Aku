import React, { useEffect } from "react";
import { motion } from "framer-motion";

interface LoadingAnimationProps {
  isLoading?: boolean;
  onLoadingComplete?: () => void;
}

const LoadingAnimation = ({
  isLoading = true,
  onLoadingComplete = () => {},
}: LoadingAnimationProps) => {
  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        onLoadingComplete();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isLoading, onLoadingComplete]);

  // Modern animation variants
  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.4,
        ease: "easeInOut",
      },
    },
  };

  const logoVariants = {
    initial: { scale: 0.9, opacity: 0, y: 10 },
    animate: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const glowVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: {
      scale: [0.8, 1.2, 0.8],
      opacity: [0, 0.3, 0],
      transition: {
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const orbitalVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  const dotVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: (i: number) => ({
      scale: [0, 1, 0],
      opacity: [0, 0.8, 0],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        delay: i * 0.2,
        ease: "easeInOut",
      },
    }),
  };

  const progressVariants = {
    initial: { width: "0%" },
    animate: {
      width: "100%",
      transition: {
        duration: 2.8,
        ease: "easeInOut",
      },
    },
  };

  const textVariants = {
    initial: { opacity: 0, y: 5 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.8,
      },
    },
  };

  const floatingElements = [
    { id: 1, delay: 0, x: -30, y: -20 },
    { id: 2, delay: 0.5, x: 40, y: -30 },
    { id: 3, delay: 1, x: -40, y: 30 },
    { id: 4, delay: 1.5, x: 35, y: 25 },
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-slate-50 to-white z-50">
      <motion.div
        className="relative flex flex-col items-center justify-center"
        variants={containerVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {/* Ambient glow */}
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-[#00A896]/20 to-[#0F2C5D]/20 blur-3xl"
          variants={glowVariants}
        />

        {/* Orbital rings */}
        <motion.div
          className="absolute w-48 h-48 rounded-full border border-[#00A896]/20"
          variants={orbitalVariants}
        />
        <motion.div
          className="absolute w-64 h-64 rounded-full border border-[#0F2C5D]/15"
          variants={orbitalVariants}
          style={{ animationDirection: "reverse" }}
        />

        {/* Floating elements */}
        {floatingElements.map((element) => (
          <motion.div
            key={element.id}
            className="absolute w-2 h-2 bg-gradient-to-r from-[#00A896] to-[#0F2C5D] rounded-full"
            style={{
              left: `calc(50% + ${element.x}px)`,
              top: `calc(50% + ${element.y}px)`,
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: element.delay,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Main logo */}
        <motion.div 
          className="relative z-10 mb-6" 
          variants={logoVariants}
        >
          <div className="text-4xl font-light tracking-wide text-[#0F2C5D]">
            Akuvera
            <motion.span 
              className="text-[#00A896] font-normal"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              AI
            </motion.span>
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.div
          className="text-sm font-medium text-slate-600 mb-8 tracking-wide"
          variants={textVariants}
        >
          Denial Resolution Assistant
        </motion.div>

        {/* Modern loading dots */}
        <div className="flex items-center gap-2 mb-8">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-gradient-to-r from-[#00A896] to-[#0F2C5D] rounded-full"
              custom={i}
              variants={dotVariants}
            />
          ))}
        </div>

        {/* Progress bar */}
        <div className="w-64 h-1 bg-slate-200 rounded-full overflow-hidden mb-4">
          <motion.div
            className="h-full bg-gradient-to-r from-[#00A896] to-[#0F2C5D] rounded-full"
            variants={progressVariants}
          />
        </div>

        {/* Status text */}
        <motion.div
          className="text-xs text-slate-500 font-medium"
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Initializing AI engine...
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoadingAnimation;