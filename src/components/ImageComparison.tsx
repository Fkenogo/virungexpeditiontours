import { useState, useRef, useEffect } from 'react';
import { GripVertical } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageComparisonProps {
  beforeImage: {
    src: string;
    alt: string;
    label?: string;
  };
  afterImage: {
    src: string;
    alt: string;
    label?: string;
  };
  defaultSliderPosition?: number;
  className?: string;
}

export function ImageComparison({
  beforeImage,
  afterImage,
  defaultSliderPosition = 50,
  className,
}: ImageComparisonProps) {
  const [sliderPosition, setSliderPosition] = useState(defaultSliderPosition);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    
    // Clamp between 0 and 100
    const clampedPercentage = Math.min(Math.max(percentage, 0), 100);
    setSliderPosition(clampedPercentage);
  };

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (isDragging && e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full aspect-[16/10] overflow-hidden rounded-lg select-none", className)}
      style={{ touchAction: 'none' }}
    >
      {/* After Image (Full) */}
      <div className="absolute inset-0">
        <img
          src={afterImage.src}
          alt={afterImage.alt}
          className="w-full h-full object-cover"
          draggable={false}
        />
        {afterImage.label && (
          <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-medium">
            {afterImage.label}
          </div>
        )}
      </div>

      {/* Before Image (Clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <img
          src={beforeImage.src}
          alt={beforeImage.alt}
          className="w-full h-full object-cover"
          draggable={false}
        />
        {beforeImage.label && (
          <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-medium">
            {beforeImage.label}
          </div>
        )}
      </div>

      {/* Slider */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-ew-resize z-10"
        style={{ left: `${sliderPosition}%` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      >
        {/* Slider Handle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center cursor-ew-resize hover:scale-110 transition-transform">
          <GripVertical className="h-5 w-5 text-gray-700" />
        </div>

        {/* Vertical Lines */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-full bg-white pointer-events-none" />
      </div>

      {/* Instruction overlay (shows on first interaction) */}
      {sliderPosition === defaultSliderPosition && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium animate-pulse pointer-events-none">
          Drag to compare
        </div>
      )}
    </div>
  );
}
