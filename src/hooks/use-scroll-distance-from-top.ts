import { useEffect, useRef, useState } from 'react';

export function useScrollDistanceFromTop(threshold: number) {
  const [isScrolled, setIsScrolled] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const scrollTop = ref.current.scrollTop;
        if (scrollTop > threshold) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      }
    };

    if (ref.current) {
      ref.current.addEventListener('scroll', handleScroll);
    }

    let cleanup = () => {};
    if (ref.current) {
      ref.current.addEventListener('scroll', handleScroll);
      cleanup = () => {
        ref.current?.removeEventListener('scroll', handleScroll);
      };
    }
    return cleanup;
  }, [ref, threshold]);

  return { ref, isScrolled };
}
