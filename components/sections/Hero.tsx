"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { collectiveData } from "@/data/collective";

interface HeroProps {
  onScrollToSection?: (sectionId: string) => void;
}

export default function Hero({ onScrollToSection }: HeroProps) {
  const handleScrollToMembers = () => {
    if (onScrollToSection) {
      onScrollToSection("members");
    } else {
      // Fallback smooth scroll
      const membersSection = document.getElementById("members");
      if (membersSection) {
        membersSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-secondary/20"
      aria-label="Section d'accueil du collectif"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_48%,rgba(255,255,255,0.05)_49%,rgba(255,255,255,0.05)_51%,transparent_52%)] bg-[length:20px_20px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* Collective Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6 tracking-tight"
        >
          <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
            {collectiveData.name}
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          {collectiveData.tagline}
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-sm sm:text-base text-muted-foreground/80 mb-12 max-w-xl mx-auto leading-relaxed"
        >
          {collectiveData.description}
        </motion.p>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            onClick={handleScrollToMembers}
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary/80 transition-all duration-300 transform hover:scale-105 active:scale-95 px-8 py-4 text-base font-medium min-h-[48px] touch-manipulation w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
            aria-label="Découvrir les membres du collectif"
          >
            Découvrir le Collectif
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={() => {
              const videosSection = document.getElementById("videos");
              if (videosSection) {
                videosSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="border-primary/30 text-primary hover:bg-primary/10 active:bg-primary/20 transition-all duration-300 px-8 py-4 text-base font-medium min-h-[48px] touch-manipulation w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
            aria-label="Voir les clips vidéo du collectif"
          >
            Voir nos Clips
          </Button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        aria-label="Indicateur de défilement"
        role="img"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center"
          aria-hidden="true"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-3 bg-primary/60 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
