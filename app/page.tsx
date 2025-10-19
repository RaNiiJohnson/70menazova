"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { useReducedMotion, useIsMobile } from "@/lib/hooks";
import { Navigation, Footer } from "@/components/layout";
import { Hero, Members, Videos, Gallery, Contact } from "@/components/sections";

export default function HomePage() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isLoaded, setIsLoaded] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const isMobile = useIsMobile();

  // Scroll progress tracking with mobile optimization
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: shouldReduceMotion ? 300 : 100,
    damping: shouldReduceMotion ? 40 : 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    setIsLoaded(true);

    // Intersection Observer for section detection with mobile optimization
    const observerOptions = {
      root: null,
      rootMargin: isMobile ? "-10% 0px -10% 0px" : "-20% 0px -20% 0px",
      threshold: isMobile ? 0.2 : 0.3,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    // Observe all sections
    const sections = ["hero", "members", "videos", "gallery", "contact"];
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [isMobile]);

  const pageVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0.1 : isMobile ? 0.4 : 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.3,
      },
    },
  };

  const sectionVariants = {
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : isMobile ? 10 : 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.1 : isMobile ? 0.5 : 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="homepage"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="min-h-screen bg-background"
      >
        {/* Scroll Progress Indicator */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-primary/10 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-primary via-primary/80 to-primary/60 origin-left"
            style={{ scaleX }}
          />
        </motion.div>

        {/* Navigation */}
        <Navigation activeSection={activeSection} />

        {/* Main Content */}
        <main className="relative">
          {/* Hero Section */}
          <motion.section
            id="hero"
            variants={sectionVariants}
            initial="initial"
            animate={isLoaded ? "animate" : "initial"}
            className="relative"
          >
            <Hero />
          </motion.section>

          {/* Section Divider - Hero to Members */}
          <div className="relative h-20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/30 to-transparent" />
          </div>

          {/* Members Section */}
          <motion.section
            id="members"
            variants={sectionVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="relative"
          >
            <Members />
          </motion.section>

          {/* Section Divider - Members to Videos */}
          <div className="relative h-20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-secondary/10" />
            <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/20 to-transparent" />
          </div>

          {/* Videos Section */}
          <motion.section
            id="videos"
            variants={sectionVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="relative"
          >
            <Videos />
          </motion.section>

          {/* Section Divider - Videos to Gallery */}
          <div className="relative h-20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-secondary/10 via-secondary/5 to-background" />
            <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/20 to-transparent" />
          </div>

          {/* Gallery Section */}
          <motion.section
            id="gallery"
            variants={sectionVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="relative"
          >
            <Gallery />
          </motion.section>

          {/* Section Divider - Gallery to Contact */}
          <div className="relative h-20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-secondary/10" />
            <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/20 to-transparent" />
          </div>

          {/* Contact Section */}
          <motion.section
            id="contact"
            variants={sectionVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            className="relative"
          >
            <Contact />
          </motion.section>
        </main>

        {/* Footer */}
        <Footer />
      </motion.div>
    </AnimatePresence>
  );
}
