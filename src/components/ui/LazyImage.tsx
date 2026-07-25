import { useRef, useState, useEffect } from "react";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
}
// creating a intersection observer API
//-browser tells us when a element enters or exits the viewport,We use this to:
//Know when to start loading a image and trigger a fade-in animation when it becomes visiblw
function LazyImage({
  src,
  alt,
  className,
  containerClassName,
}: LazyImageProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const element = imgRef.current;
    if (!element) return;

    if (typeof IntersectionObserver === "undefined") {
      setIsInView(true);
      return;
    }

    //create a observer  which fires callback when element visisbility changes
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
          observer.unobserve(element);
        }
      },
      {
        rootMargin: "100px",
      },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      {!isLoaded && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[#f1f1f1] animate-pulse"
        />
      )}
      <img
        ref={imgRef}
        src={isInView ? src : undefined}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        className={`transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"} ${className}`}
      />
    </div>
  );
}

export default LazyImage;
//How it Works
// Tracks Visibility: It attaches a ref (imgRef) to an <img> tag and watches as the user scrolls.
// Loads On Demand: When the image is about to appear on screen (100px before), it sets isInView to true to start downloading the image source.
// Optimizes Performance: Once the image is visible, it stops watching the element to save memory.
