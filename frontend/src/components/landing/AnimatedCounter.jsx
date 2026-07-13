import { useEffect, useRef } from "react";
import { animate, useInView, useMotionValue, useTransform, motion } from "framer-motion";

export default function AnimatedCounter({ target, suffix = "", decimals = 0, duration = 2 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Number(v.toFixed(decimals)));

  useEffect(() => {
    if (isInView) {
      const animation = animate(count, target, {
        duration,
        ease: [0.16, 1, 0.3, 1],
      });
      return animation.stop;
    }
  }, [isInView, count, target, duration]);

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>{suffix}
    </span>
  );
}
