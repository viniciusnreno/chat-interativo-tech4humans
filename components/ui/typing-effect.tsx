"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";

const TypingEffect = ({ text = "Typing Effect" }: { text: string }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <h2 ref={ref}>
      {text.split("").map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: index * 0.05 }}
        >
          {letter}
        </motion.span>
      ))}
    </h2>
  );
};

export default TypingEffect;
