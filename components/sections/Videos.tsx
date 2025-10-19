"use client";

import { motion } from "framer-motion";
import { collectiveData } from "@/data/collective";
import { VideoCard } from "@/components/cards/VideoCard";
import { Button } from "@/components/ui/button";
import { Youtube, ExternalLink } from "lucide-react";

export default function Videos() {
  return (
    <section id="videos" className="py-16 sm:py-24 bg-secondary/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Nos{" "}
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              Clips
            </span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mb-6">
            Plongez dans notre univers musical à travers nos clips officiels,
            sessions live et contenus exclusifs.
          </p>

          {/* YouTube Channel Link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Button
              variant="outline"
              onClick={() =>
                window.open(
                  collectiveData.socialLinks.youtube,
                  "_blank",
                  "noopener,noreferrer"
                )
              }
              className="border-primary/30 text-primary hover:bg-primary/10 active:bg-primary/20 transition-all duration-300 min-h-[44px] touch-manipulation focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
              aria-label="Voir toutes nos vidéos sur YouTube (ouvre dans un nouvel onglet)"
            >
              <Youtube className="w-4 h-4 mr-2" aria-hidden="true" />
              Voir toutes nos vidéos
              <ExternalLink className="w-4 h-4 ml-2" aria-hidden="true" />
            </Button>
          </motion.div>
        </motion.header>

        {/* Videos Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
        >
          {collectiveData.videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <VideoCard video={video} index={index} />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12 sm:mt-16"
        >
          <div className="bg-card/30 backdrop-blur-sm border border-border/50 rounded-lg p-6 sm:p-8 max-w-2xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-semibold text-foreground mb-3">
              Restez connectés
            </h3>
            <p className="text-muted-foreground text-sm sm:text-base mb-4">
              Abonnez-vous à notre chaîne YouTube pour ne manquer aucune de nos
              nouvelles sorties et contenus exclusifs.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={() =>
                  window.open(
                    collectiveData.socialLinks.youtube,
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
                className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white transition-all duration-300 min-h-[44px] touch-manipulation focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-background"
                aria-label="S'abonner à notre chaîne YouTube (ouvre dans un nouvel onglet)"
              >
                <Youtube className="w-4 h-4 mr-2" aria-hidden="true" />
                S'abonner sur YouTube
              </Button>
              <Button
                variant="outline"
                onClick={() =>
                  window.open(
                    collectiveData.socialLinks.spotify,
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
                className="border-green-500/30 text-green-400 hover:bg-green-500/10 active:bg-green-500/20 min-h-[44px] touch-manipulation focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-background"
                aria-label="Écouter notre musique sur Spotify (ouvre dans un nouvel onglet)"
              >
                <ExternalLink className="w-4 h-4 mr-2" aria-hidden="true" />
                Écouter sur Spotify
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
