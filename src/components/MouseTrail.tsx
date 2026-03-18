import { useEffect, useMemo, useRef, useState } from 'react';
import './MouseTrail.scss';

const TRAIL_COUNT = 6;
const LERP = 0.26;

type Point = { x: number; y: number };
type Ripple = { id: number; x: number; y: number };

export default function MouseTrail() {
  const [enabled, setEnabled] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const targetRef = useRef<Point>({
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0,
  });
  const pointsRef = useRef<Point[]>(
    Array.from({ length: TRAIL_COUNT }, () => ({
      x: targetRef.current.x,
      y: targetRef.current.y,
    })),
  );
  const dotRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const rafRef = useRef<number | null>(null);
  const rippleIdRef = useRef(0);

  const dots = useMemo(() => Array.from({ length: TRAIL_COUNT }), []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    setEnabled(finePointer.matches && !reducedMotion.matches);

    const onPointerMove = (event: PointerEvent) => {
      targetRef.current.x = event.clientX;
      targetRef.current.y = event.clientY;
    };

    const onPointerDown = (event: PointerEvent) => {
      rippleIdRef.current += 1;
      const nextRipple: Ripple = {
        id: rippleIdRef.current,
        x: event.clientX,
        y: event.clientY,
      };

      setRipples((previous) => [...previous.slice(-2), nextRipple]);
    };

    const animate = () => {
      pointsRef.current[0].x +=
        (targetRef.current.x - pointsRef.current[0].x) * LERP;
      pointsRef.current[0].y +=
        (targetRef.current.y - pointsRef.current[0].y) * LERP;

      for (let index = 1; index < TRAIL_COUNT; index += 1) {
        const previous = pointsRef.current[index - 1];
        const point = pointsRef.current[index];
        point.x += (previous.x - point.x) * LERP;
        point.y += (previous.y - point.y) * LERP;
      }

      pointsRef.current.forEach((point, index) => {
        const element = dotRefs.current[index];
        if (!element) return;
        element.style.transform = `translate3d(${point.x}px, ${point.y}px, 0) translate(-50%, -50%)`;
      });

      rafRef.current = window.requestAnimationFrame(animate);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    rafRef.current = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      className='mouseTrail'
      aria-hidden='true'
    >
      {dots.map((_, index) => (
        <span
          key={index}
          className='mouseTrail__dot'
          style={{
            opacity: `${0.5 * (1 - index / (TRAIL_COUNT + 0.9))}`,
            width: `${10.5 - index * 1.25}px`,
            height: `${10.5 - index * 1.25}px`,
          }}
          ref={(element) => {
            dotRefs.current[index] = element;
          }}
        />
      ))}

      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className='mouseTrail__ripple'
          style={{ left: ripple.x, top: ripple.y }}
          onAnimationEnd={() => {
            setRipples((previous) =>
              previous.filter((item) => item.id !== ripple.id),
            );
          }}
        />
      ))}
    </div>
  );
}
