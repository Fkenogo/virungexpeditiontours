import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ProgressiveImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholderSrc?: string;
  loading?: 'lazy' | 'eager';
}

export function ProgressiveImage({
  src,
  alt,
  className,
  placeholderSrc,
  loading = 'lazy',
}: ProgressiveImageProps) {
  const [imgSrc, setImgSrc] = useState(placeholderSrc || src);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    
    img.onload = () => {
      setImgSrc(src);
      setIsLoading(false);
    };

    return () => {
      img.onload = null;
    };
  }, [src]);

  // Generate a tiny placeholder from the image name
  const getPlaceholder = () => {
    if (placeholderSrc) return placeholderSrc;
    // Create a data URL for a blurred placeholder (10x10 pixel grey image)
    return 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"%3E%3Cfilter id="b"%3E%3CfeGaussianBlur stdDeviation="1"/%3E%3C/filter%3E%3Cg filter="url(%23b)"%3E%3Crect fill="%23ddd" width="10" height="10"/%3E%3C/g%3E%3C/svg%3E';
  };

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <img
        src={imgSrc === src ? src : getPlaceholder()}
        alt={alt}
        loading={loading}
        className={cn(
          "w-full h-full object-cover transition-all duration-500",
          isLoading && imgSrc !== src ? "blur-lg scale-110" : "blur-0 scale-100",
          className
        )}
      />
      {isLoading && imgSrc !== src && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse" />
      )}
    </div>
  );
}
