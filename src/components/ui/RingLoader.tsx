'use client';

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
    <div className={`${sizeClasses[size]} ${className} animate-spin`}>
              <svg viewBox="0 0 50 50" className="h-full w-full">
              <circle cx="25"
          cy="25"
          r="20"
          stroke="currentColor"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
              </svg>
              </div>
  );
};

export default RingLoader;
