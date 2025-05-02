
import { animate } from "framer-motion";
import { useEffect, useRef } from "react";

interface AnimatedCounterProps {
  from: number;
  to: number;
  duration?: number;
  formatter?: (value: number) => string;
}

const AnimatedCounter = ({ 
  from, 
  to, 
  duration = 2, 
  formatter = (value) => Math.floor(value).toString() 
}: AnimatedCounterProps) => {
  const nodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    const controls = animate(from, to, {
      duration,
      onUpdate(value) {
        node.textContent = formatter(value);
      },
      ease: "easeOut",
    });

    return () => controls.stop();
  }, [from, to, duration, formatter]);

  return <span ref={nodeRef}>{formatter(from)}</span>;
};

export default AnimatedCounter;
