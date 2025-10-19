"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { Photo } from "@/data/collective";
import { Card, CardContent } from "@/components/ui/card";
import { Expand, Loader2 } from "lucide-react";

interface PhotoCardProps {
  photo: Photo;
  onClick: (photo: Photo) => void;
  index?: number;
}

export function PhotoCard({ photo, onClick, index = 0 }: PhotoCardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  const handleClick = () => {
    if (!hasError) {
      onClick(photo);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 },
      }}
      className="group cursor-pointer"
      onClick={handleClick}
    >
      <Card className="overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/20 transition-all duration-300">
        <CardContent className="p-0">
          <div className="relative aspect-square overflow-hidden">
            {/* Loading State */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-muted">
                <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
              </div>
            )}

            {/* Error State */}
            {hasError && (
              <div className="absolute inset-0 flex items-center justify-center bg-muted">
                <div className="text-center text-muted-foreground">
                  <div className="text-sm">Image non disponible</div>
                </div>
              </div>
            )}

            {/* Image */}
            {!hasError && (
              <>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                  />
                </motion.div>

                {/* Hover Overlay */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-black/60 flex items-center justify-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white/20 backdrop-blur-sm rounded-full p-3"
                  >
                    <Expand className="w-6 h-6 text-white" />
                  </motion.div>
                </motion.div>

                {/* Caption Overlay */}
                {photo.caption && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4"
                  >
                    <p className="text-white text-sm leading-relaxed">
                      {photo.caption}
                    </p>
                  </motion.div>
                )}
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
