import { motion } from "framer-motion";

const BouncingDots = () => {
  return (
    <div className="flex items-center justify-center space-x-1">
      {Array.from({ length: 3 }).map((_, index) => (
        <motion.span
          key={index}
          className="h-2 w-2 rounded-full bg-primary"
          animate={{
            y: [2, -7, 2],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            repeatType: "loop",
            delay: index * 0.4,
          }}
        />
      ))}
    </div>
  );
};

export default BouncingDots;
