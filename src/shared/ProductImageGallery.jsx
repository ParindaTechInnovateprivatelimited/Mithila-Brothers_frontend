import React, { useState, useRef, useEffect } from 'react';
import { IoChevronBack, IoChevronForward, IoExpand } from 'react-icons/io5';

const MAGNIFIER_SIZE = 140;
const ZOOM_LEVEL = 2.5;
const PREVIEW_BOX_SIZE = 350; // px, for a bigger preview

const ProductImageGallery = ({ images, productName, mainImage, onImageChange }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [showFullscreen, setShowFullscreen] = useState(false);
  const mainImageRef = useRef(null);
  const thumbnailContainerRef = useRef(null);

  // Update current index when mainImage changes
  useEffect(() => {
    const index = images?.findIndex(img => img.url === mainImage) || 0;
    setCurrentImageIndex(index);
  }, [mainImage, images]);

  const handleThumbnailClick = (image, index) => {
    setCurrentImageIndex(index);
    onImageChange(image.url);
  };

  const handlePrevious = () => {
    const newIndex = currentImageIndex > 0 ? currentImageIndex - 1 : images.length - 1;
    setCurrentImageIndex(newIndex);
    onImageChange(images[newIndex].url);
  };

  const handleNext = () => {
    const newIndex = currentImageIndex < images.length - 1 ? currentImageIndex + 1 : 0;
    setCurrentImageIndex(newIndex);
    onImageChange(images[newIndex].url);
  };

  const handleMouseMove = (e) => {
    if (!mainImageRef.current) return;
    const rect = mainImageRef.current.getBoundingClientRect();
    let x = ((e.clientX - rect.left) / rect.width) * 100;
    let y = ((e.clientY - rect.top) / rect.height) * 100;
    x = Math.max(0, Math.min(100, x));
    y = Math.max(0, Math.min(100, y));
    setZoomPosition({ x, y });
  };

  const handleMouseEnter = () => setIsZoomed(true);
  const handleMouseLeave = () => setIsZoomed(false);

  const scrollToThumbnail = (index) => {
    if (thumbnailContainerRef.current) {
      const thumbnail = thumbnailContainerRef.current.children[index];
      if (thumbnail) {
        thumbnail.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }
  };

  useEffect(() => {
    scrollToThumbnail(currentImageIndex);
  }, [currentImageIndex]);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-[400px] lg:h-[320px] xl:h-[600px] bg-gray-200 flex items-center justify-center">
        <div className="text-gray-500">No images available</div>
      </div>
    );
  }

  // Calculate lens position in px
  const getLensStyle = () => {
    if (!mainImageRef.current) return { display: 'none' };
    const rect = mainImageRef.current.getBoundingClientRect();
    const left = (zoomPosition.x / 100) * rect.width - MAGNIFIER_SIZE / 2;
    const top = (zoomPosition.y / 100) * rect.height - MAGNIFIER_SIZE / 2;
    return {
      left: `${left}px`,
      top: `${top}px`,
      width: `${MAGNIFIER_SIZE}px`,
      height: `${MAGNIFIER_SIZE}px`,
      display: isZoomed ? 'block' : 'none',
    };
  };

  // Calculate preview box position so it stays in viewport
  const getPreviewBoxPosition = () => {
    if (!mainImageRef.current) return { top: 0, left: '100%' };
    const rect = mainImageRef.current.getBoundingClientRect();
    const spaceRight = window.innerWidth - rect.right;
    const spaceLeft = rect.left;
    let left, top = rect.top;
    // Prefer right side, but if not enough space, show on left
    if (spaceRight > PREVIEW_BOX_SIZE + 24) {
      left = rect.width + 24; // 24px gap
    } else if (spaceLeft > PREVIEW_BOX_SIZE + 24) {
      left = -PREVIEW_BOX_SIZE - 24;
    } else {
      // fallback: overlay on image
      left = rect.width / 2 - PREVIEW_BOX_SIZE / 2;
    }
    return {
      left: left,
      top: 0,
    };
  };

  // Calculate background position for zoomed preview
  const getZoomedStyle = () => {
    if (!mainImageRef.current) return {};
    const rect = mainImageRef.current.getBoundingClientRect();
    const bgX = (zoomPosition.x / 100) * rect.width * ZOOM_LEVEL - PREVIEW_BOX_SIZE / 2;
    const bgY = (zoomPosition.y / 100) * rect.height * ZOOM_LEVEL - PREVIEW_BOX_SIZE / 2;
    return {
      backgroundImage: `url(${mainImage})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: `${rect.width * ZOOM_LEVEL}px ${rect.height * ZOOM_LEVEL}px`,
      backgroundPosition: `-${bgX}px -${bgY}px`,
      width: `${PREVIEW_BOX_SIZE}px`,
      height: `${PREVIEW_BOX_SIZE}px`,
      border: '1.5px solid #e5e7eb',
      borderRadius: '8px',
      boxShadow: '0 2px 8px 0 rgba(0,0,0,0.10)',
      display: isZoomed ? 'block' : 'none',
      zIndex: 30,
      backgroundColor: '#fff',
    };
  };

  return (
    <div className="lg:flex lg:flex-row-reverse lg:w-[60%] border-black relative">
      {/* Main Image Container */}
      <div className="flex-grow relative group">
        <div
          ref={mainImageRef}
          className="relative overflow-hidden bg-[#F5F5F5] w-full h-[400px] lg:h-[320px] xl:h-[600px]"
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <img
            src={mainImage}
            alt={productName}
            className={`w-full h-full object-contain transition-transform duration-300`}
            draggable={false}
          />
          {/* Lens overlay */}
          <div
            className="absolute pointer-events-none border-2 border-primary bg-white/30 rounded-full shadow-lg"
            style={getLensStyle()}
          />
          {/* Navigation arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrevious}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
              >
                <IoChevronBack className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
              >
                <IoChevronForward className="w-5 h-5" />
              </button>
            </>
          )}
          {/* Fullscreen button */}
          <button
            onClick={() => setShowFullscreen(true)}
            className="absolute top-2 right-2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
          >
            <IoExpand className="w-4 h-4" />
          </button>
          {/* Image counter */}
          {images.length > 1 && (
            <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
              {currentImageIndex + 1} / {images.length}
            </div>
          )}
        </div>
        {/* Magnifier Preview Box (desktop only) */}
        {isZoomed && (
          <div
            className="hidden lg:block absolute z-30"
            style={{ ...getPreviewBoxPosition(), position: 'absolute', width: PREVIEW_BOX_SIZE, height: PREVIEW_BOX_SIZE }}
          >
            <div style={{ ...getZoomedStyle(), width: PREVIEW_BOX_SIZE, height: PREVIEW_BOX_SIZE }} />
          </div>
        )}
      </div>
      {/* Thumbnail Container */}
      <div className="flex p-2 mb-2 lg:mb-0 w-full border-black lg:h-[320px] xl:h-[600px] gap-x-2 lg:w-[150px] overflow-x-auto lg:overflow-y-auto no-scrollbar flex-row lg:flex-col items-center">
        <div 
          ref={thumbnailContainerRef}
          className="flex lg:flex-col gap-2 w-full"
        >
          {images?.map((image, index) => (
            <div
              key={index}
              className={`relative flex-shrink-0 cursor-pointer transition-all duration-200 ${
                currentImageIndex === index ? 'ring-2 ring-primary' : 'ring-1 ring-gray-200 hover:ring-primary'
              }`}
              onClick={() => handleThumbnailClick(image, index)}
            >
              <img
                src={image.url}
                alt={`${productName} - Image ${index + 1}`}
                className="lg:h-[138px] h-[100px] sm:h-[150px] bg-[#F5F5F5] w-[95px] md:w-[140px] lg:w-full object-cover rounded"
              />
              {currentImageIndex === index && (
                <div className="absolute inset-0 bg-primary/20 rounded" />
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Fullscreen Modal */}
      {showFullscreen && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          onClick={() => setShowFullscreen(false)}
        >
          <div className="relative max-w-4xl max-h-full p-4">
            <button
              onClick={() => setShowFullscreen(false)}
              className="absolute top-4 right-4 text-white text-2xl z-10"
            >
              ×
            </button>
            <img
              src={mainImage}
              alt={productName}
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevious();
                  }}
                  className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full"
                >
                  <IoChevronBack className="w-6 h-6" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full"
                >
                  <IoChevronForward className="w-6 h-6" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery; 