"use client";

import { motion } from "framer-motion";
import { Video } from "@/data/collective";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useReducedMotion, useIsMobile } from "@/lib/hooks";

interface VideoCardProps {
  video: Video;
  index?: number;
}

export function VideoCard({ video, index = 0 }: VideoCardProps) {
  const shouldReduceMotion = useReducedMotion();
  const isMobile = useIsMobile();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : isMobile ? 20 : 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: shouldReduceMotion ? 0.1 : isMobile ? 0.4 : 0.6,
        delay: shouldReduceMotion ? 0 : isMobile ? index * 0.05 : index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={
        !isMobile && !shouldReduceMotion
          ? {
              scale: 1.02,
              transition: { duration: 0.2 },
            }
          : {}
      }
      whileTap={isMobile ? { scale: 0.98 } : {}}
      className="group touch-manipulation"
      role="article"
      aria-label={`Vidéo: ${video.title}`}
    >
      <Card className="overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/20 transition-all duration-300">
        <CardContent className="p-0">
          {/* Video Container */}
          <div className="relative aspect-video overflow-hidden">
            <motion.div
              whileHover={
                !isMobile && !shouldReduceMotion ? { scale: 1.05 } : {}
              }
              transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
              className="w-full h-full"
            >
              <iframe
                src={`https://www.youtube.com/embed/${
                  video.youtubeId
                }?rel=0&modestbranding=1${isMobile ? "&playsinline=1" : ""}`}
                title={`Vidéo: ${video.title} - ${formatDate(video.date)}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
                loading="lazy"
                aria-label={`Lecteur vidéo YouTube pour ${video.title}`}
              />
            </motion.div>

            {/* Overlay gradient */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              aria-hidden="true"
            />
          </div>

          {/* Content */}
          <div className="p-4 space-y-3">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-lg leading-tight text-foreground group-hover:text-primary transition-colors duration-200">
                {video.title}
              </h3>
              <Badge
                variant="secondary"
                className="shrink-0 text-xs"
                role="text"
                aria-label={`Date de publication: ${formatDate(video.date)}`}
              >
                {formatDate(video.date)}
              </Badge>
            </div>

            <p
              className="text-muted-foreground text-sm leading-relaxed line-clamp-3"
              aria-label={`Description: ${video.description}`}
            >
              {video.description}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.article>
  );
}
