import Page from "./components/pages";
import { Direction } from "./lib/types";
import data from "./data.json";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";

function App() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const keyHandler = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        setIndex((prev) => Math.min(prev + 1, data.length - 1));
      } else if (e.key === "ArrowUp") {
        setIndex((prev) => Math.max(prev - 1, 0));
      }
    };

    window.addEventListener("keydown", keyHandler);
    return () => window.removeEventListener("keydown", keyHandler);
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <AnimatePresence mode="wait">
        <Page
          key={index}
          heading={data[index].heading}
          paragraph={data[index].paragraph}
          imageName={data[index].imageName}
          direction={index % 2 === 0 ? Direction.Left : Direction.Right}
        />
      </AnimatePresence>
    </div>
  );
}

export default App;
