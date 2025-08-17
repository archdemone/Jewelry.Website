'use client';

import { motion } from 'framer-motion';

interface RingLoaderProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const RingLoader = ({ size = 'md', className = '' }: RingLoaderProps) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
      className={`${sizeClasses[size]} ${className}`}
    >
      <svg viewBox="0 0 50 50" className="h-full w-full">
        <circle
          cx="25"
          cy="25"
          r="20"
          stroke="#D4AF37"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="31.4 31.4"
        />
      </svg>
    </motion.div>
  );
};

export default RingLoader;
