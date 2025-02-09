import { motion, useAnimation, useInView } from "motion/react";
import { Direction, PageProps } from "../../lib/types";
import styles from "./index.module.scss";
import { useEffect, useRef } from "react";

const Page = ({ heading, paragraph, imageName, direction }: PageProps) => {
  const mainRef = useRef<HTMLElement>(null);
  const inView = useInView(mainRef, {
    once: false,
    margin: "-500px -300px -300px -300px",
  });

  const mainControls = useAnimation();

  useEffect(() => {
    if (inView) {
      console.log(inView);
      document.title = heading;
      mainControls.start("visible");
    }
  }, [inView, heading, mainControls]);

  return (
    <motion.main
      ref={mainRef}
      className={styles.main}
      style={{
        flexDirection: direction === Direction.Left ? "row" : "row-reverse",
      }}
      variants={{
        hidden: {
          opacity: 0,
          x: direction === Direction.Left ? -100 : 100,
        },
        visible: {
          opacity: 1,
          x: 0,
          transition: {
            duration: 0.5,
          },
        },
      }}
      initial="hidden"
      animate={mainControls}
      transition={{
        type: "spring",
      }}
    >
      {/* TODO: left section where the texts live */}
      <motion.section
        className={styles.section}
        variants={{
          hidden: {
            opacity: 0,
            x: direction === Direction.Left ? -100 : 100,
          },
          visible: {
            opacity: 1,
            x: 0,
            transition: {
              duration: 0.5,
            },
          },
        }}
        style={{
          textAlign: direction === Direction.Left ? "left" : "right",
        }}
      >
        <motion.h1
          variants={{
            hidden: {
              opacity: 0,
              x: direction === Direction.Left ? -100 : 100,
            },
            visible: {
              opacity: 1,
              x: 0,
              transition: {
                delay: 0.75,
                duration: 0.5,
              },
            },
          }}
        >
          {heading}
        </motion.h1>
        <motion.p
          variants={{
            hidden: {
              opacity: 0,
              x: direction === Direction.Left ? -100 : 100,
            },
            visible: {
              opacity: 1,
              x: 0,
              transition: {
                duration: 0.75,
                delay: 0.25,
              },
            },
          }}
        >
          {paragraph}
        </motion.p>{" "}
        <motion.div
          variants={{
            hidden: { top: "0" },
            visible: { top: "100%" },
          }}
          initial="hidden"
          animate={mainControls}
          transition={{
            ease: "easeInOut",
            delay: 0.5,
            duration: 0.25,
          }}
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "#FFF9BF",
            zIndex: 99,
          }}
        />
        <motion.div
          variants={{
            hidden: { bottom: "0" },
            visible: { bottom: "100%" },
          }}
          initial="hidden"
          animate={mainControls}
          transition={{
            ease: "easeInOut",
            delay: 0.5,
            duration: 0.25,
          }}
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "#FFF9BF",
            zIndex: 99,
          }}
        />
      </motion.section>

      {/* TODO: right section for the images and stuff */}
      <motion.img
        variants={{
          hidden: {
            opacity: 0,
            x: direction === Direction.Left ? 100 : -100,
          },
          visible: {
            opacity: 1,
            x: 0,
            transition: {
              duration: 0.5,
              delay: 0.5,
            },
          },
        }}
        src={imageName}
        alt={heading}
      />
      <motion.div
        variants={{
          hidden: { [direction]: "0" },
          visible: { [direction]: "100%" },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{
          ease: "easeInOut",
          duration: 0.5,
        }}
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "#FFF9BF",
          zIndex: 99,
        }}
      />
    </motion.main>
  );
};

export default Page;
