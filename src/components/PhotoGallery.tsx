import { useState, useRef, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download, Maximize2, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { ProgressiveImage } from '@/components/ProgressiveImage';

interface PhotoGalleryProps {
  images: {
    src: string;
    alt: string;
    caption?: string;
  }[];
}

export function PhotoGallery({ images }: PhotoGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isPlaying, setIsPlaying] = useState(false);
  const [slideshowInterval, setSlideshowInterval] = useState(3000);
  const [lastTouchDistance, setLastTouchDistance] = useState(0);
  const imageRef = useRef<HTMLImageElement>(null);
  const slideshowTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Preload adjacent images
  const preloadImage = useCallback((index: number) => {
    if (index >= 0 && index < images.length) {
      const img = new Image();
      img.src = images[index].src;
    }
  }, [images]);

  useEffect(() => {
    if (lightboxOpen && images.length > 0) {
      // Preload next and previous images
      const nextIndex = (currentIndex + 1) % images.length;
      const prevIndex = (currentIndex - 1 + images.length) % images.length;
      preloadImage(nextIndex);
      preloadImage(prevIndex);
    }
  }, [currentIndex, lightboxOpen, images.length, preloadImage]);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setZoom(1);
    setPosition({ x: 0, y: 0 });
    stopSlideshow();
  };

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  }, [images.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  }, [images.length]);

  const toggleSlideshow = () => {
    setIsPlaying(!isPlaying);
  };

  const stopSlideshow = () => {
    setIsPlaying(false);
    if (slideshowTimerRef.current) {
      clearInterval(slideshowTimerRef.current);
      slideshowTimerRef.current = null;
    }
  };

  // Slideshow auto-advance
  useEffect(() => {
    if (isPlaying && lightboxOpen) {
      slideshowTimerRef.current = setInterval(() => {
        goToNext();
      }, slideshowInterval);
    } else {
      if (slideshowTimerRef.current) {
        clearInterval(slideshowTimerRef.current);
        slideshowTimerRef.current = null;
      }
    }

    return () => {
      if (slideshowTimerRef.current) {
        clearInterval(slideshowTimerRef.current);
      }
    };
  }, [isPlaying, lightboxOpen, slideshowInterval, goToNext]);

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setZoom((prev) => {
      const newZoom = Math.max(prev - 0.5, 1);
      if (newZoom === 1) {
        setPosition({ x: 0, y: 0 });
      }
      return newZoom;
    });
  };

  const handleResetZoom = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(images[currentIndex].src);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `virunga-tour-image-${currentIndex + 1}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success('Image downloaded successfully');
    } catch (error) {
      toast.error('Failed to download image');
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoom > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch gesture handlers for pinch-to-zoom
  const getTouchDistance = (touches: React.TouchList) => {
    if (touches.length < 2) return 0;
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      const distance = getTouchDistance(e.touches);
      setLastTouchDistance(distance);
    } else if (e.touches.length === 1 && zoom > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - position.x,
        y: e.touches[0].clientY - position.y,
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      const distance = getTouchDistance(e.touches);
      if (lastTouchDistance > 0) {
        const delta = distance - lastTouchDistance;
        const zoomChange = delta * 0.01;
        setZoom((prev) => Math.min(Math.max(prev + zoomChange, 1), 3));
      }
      setLastTouchDistance(distance);
    } else if (e.touches.length === 1 && isDragging && zoom > 1) {
      e.preventDefault();
      setPosition({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y,
      });
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (e.touches.length < 2) {
      setLastTouchDistance(0);
    }
    if (e.touches.length === 0) {
      setIsDragging(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') goToPrevious();
    if (e.key === 'ArrowRight') goToNext();
    if (e.key === 'Escape') closeLightbox();
    if (e.key === '+' || e.key === '=') handleZoomIn();
    if (e.key === '-') handleZoomOut();
  };

  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [lightboxOpen]);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
            onClick={() => openLightbox(index)}
          >
            <ProgressiveImage
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
              <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium">
                View Full Size
              </span>
            </div>
          </div>
        ))}
      </div>

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {/* Top Controls */}
          <div className="absolute top-4 right-4 flex gap-2 z-10">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={(e) => {
                e.stopPropagation();
                toggleSlideshow();
              }}
              title={isPlaying ? "Pause slideshow" : "Play slideshow"}
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={(e) => {
                e.stopPropagation();
                handleDownload();
              }}
              title="Download image"
            >
              <Download className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
              }}
              title="Close"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>

          {/* Slideshow Speed Control */}
          {isPlaying && (
            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm rounded-lg p-3 z-10">
              <label className="text-white text-sm mb-2 block">Speed</label>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`text-white hover:bg-white/20 ${slideshowInterval === 2000 ? 'bg-white/20' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSlideshowInterval(2000);
                  }}
                >
                  Fast
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`text-white hover:bg-white/20 ${slideshowInterval === 3000 ? 'bg-white/20' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSlideshowInterval(3000);
                  }}
                >
                  Normal
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`text-white hover:bg-white/20 ${slideshowInterval === 5000 ? 'bg-white/20' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSlideshowInterval(5000);
                  }}
                >
                  Slow
                </Button>
              </div>
            </div>
          )}

          {/* Zoom Controls */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/60 backdrop-blur-sm rounded-full p-2 z-10">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                handleZoomOut();
              }}
              disabled={zoom <= 1}
              title="Zoom out"
            >
              <ZoomOut className="h-5 w-5" />
            </Button>
            <span className="text-white px-3 py-2 text-sm min-w-[60px] text-center">
              {Math.round(zoom * 100)}%
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                handleZoomIn();
              }}
              disabled={zoom >= 3}
              title="Zoom in"
            >
              <ZoomIn className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                handleResetZoom();
              }}
              disabled={zoom === 1}
              title="Reset zoom"
            >
              <Maximize2 className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation Arrows */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
          >
            <ChevronRight className="h-8 w-8" />
          </Button>

          {/* Image Container */}
          <div
            className="max-w-7xl max-h-[90vh] p-4 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{ 
              cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default',
              touchAction: zoom > 1 ? 'none' : 'auto'
            }}
          >
            <img
              ref={imageRef}
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              className={`max-w-full max-h-[80vh] object-contain mx-auto select-none ${
                isPlaying ? 'animate-fade-in' : 'transition-transform'
              }`}
              style={{
                transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
                transformOrigin: 'center center',
              }}
              draggable={false}
              loading="eager"
            />
            {images[currentIndex].caption && (
              <p className="text-white text-center mt-4 text-lg">
                {images[currentIndex].caption}
              </p>
            )}
            <p className="text-white/60 text-center mt-2 text-sm">
              {currentIndex + 1} / {images.length}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
