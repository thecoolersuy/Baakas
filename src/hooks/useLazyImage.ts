import { useState, useEffect, useRef } from "react";

// creating a intersection observer API
//-browser tells us when a element enters or exits the viewport,We use this to:
//Know when to start loading a image and trigger a fade-in animation when it becomes visiblw
interface UseLazyImageReturn {
  imgRef: React.RefObject<HTMLImageElement | null>;
  isInView: boolean;
}

function useLazyImage(src: string): UseLazyImageReturn {
  const imgRef = useRef<HTMLImageElement>(null);
  const [isInView, setIsInView] = useState(false);

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
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(element);
          }
        });
      },
      {
        rootMargin: "100px",
      },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [src]);

  return { imgRef, isInView };
}

export default useLazyImage;

//How it Works at a Glance:
// Tracks Visibility: It attaches a ref (imgRef) to an <img> tag and watches as the user scrolls.
// Loads On Demand: When the image is about to appear on screen (100px before), it sets isInView to true to start downloading the image source.
// Optimizes Performance: Once the image is visible, it stops watching the element to save memory.
