import { useState, useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import Page from "./index";
import { Direction } from "../../lib/types";

type Props = {
  data: Array<Record<string, string>>;
};

const PageContainer = ({ data }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const controls = useAnimation();
  const ref = useRef<HTMLElement>(null);

  const inView = useInView(ref!, {
    once: false,
    // margin: "-500px 0px 0px 0px",
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown") {
        event.preventDefault(); // Prevent default scrolling
        setCurrentIndex((prev) => Math.min(prev + 1, data.length - 1));
      } else if (event.key === "ArrowUp") {
        event.preventDefault(); // Prevent default scrolling
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
      }
    };

    if (inView) {
      document.title = data[currentIndex].heading;
      controls.start("visible");
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [data.length, controls, currentIndex, inView, data]);

  return (
    <motion.div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden", // Disable default scrolling
        position: "relative",
      }}
      animate={{ y: `-${currentIndex * 100}vh` }} // Moves pages up/down
      transition={{ duration: 0.6, ease: "easeInOut" }} // Smooth animation
    >
      {data.map((page, index) => (
        <Page
          key={index}
          heading={page.heading}
          paragraph={page.paragraph}
          imageName={page.imageName}
          direction={index % 2 === 0 ? Direction.Left : Direction.Right}
          control={controls}
          refObject={ref}
        />
      ))}
    </motion.div>
  );
};

export default PageContainer;
