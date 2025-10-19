"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { collectiveData, Photo } from "@/data/collective";
import { PhotoCard } from "@/components/cards/PhotoCard";
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight, Download } from "lucide-react";

export default function Gallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePhotoClick = (photo: Photo) => {
    const index = collectiveData.photos.findIndex((p) => p.id === photo.id);
    setCurrentIndex(index);
    setSelectedPhoto(photo);
  };

  const handlePrevious = () => {
    const newIndex =
      currentIndex > 0 ? currentIndex - 1 : collectiveData.photos.length - 1;
    setCurrentIndex(newIndex);
    setSelectedPhoto(collectiveData.photos[newIndex]);
  };

  const handleNext = () => {
    const newIndex =
      currentIndex < collectiveData.photos.length - 1 ? currentIndex + 1 : 0;
    setCurrentIndex(newIndex);
    setSelectedPhoto(collectiveData.photos[newIndex]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") handlePrevious();
    if (e.key === "ArrowRight") handleNext();
    if (e.key === "Escape") setSelectedPhoto(null);
  };

  return (
    <section id="gallery" className="py-16 sm:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Notre{" "}
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              Galerie
            </span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Découvrez l'univers visuel d'Urban Roots Collective à travers nos
            moments marquants, sessions studio et performances live.
          </p>
        </motion.div>

        {/* Photos Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4 lg:gap-6"
        >
          {collectiveData.photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.05,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <PhotoCard
                photo={photo}
                onClick={handlePhotoClick}
                index={index}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-12 sm:mt-16"
        >
          <p className="text-muted-foreground text-sm sm:text-base">
            Cliquez sur une photo pour l'agrandir et naviguer dans la galerie
          </p>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <Dialog
        open={!!selectedPhoto}
        onOpenChange={() => setSelectedPhoto(null)}
      >
        <DialogContent
          className="max-w-[95vw] max-h-[95vh] w-auto h-auto p-0 bg-black/95 border-0"
          showCloseButton={false}
          onKeyDown={handleKeyDown}
        >
          {selectedPhoto && (
            <div className="relative flex items-center justify-center min-h-[50vh]">
              {/* Close Button */}
              <DialogClose asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white border-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </DialogClose>

              {/* Navigation Buttons */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handlePrevious}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white border-0 min-h-[44px] min-w-[44px] touch-manipulation"
                aria-label="Photo précédente"
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleNext}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white border-0 min-h-[44px] min-w-[44px] touch-manipulation"
                aria-label="Photo suivante"
              >
                <ChevronRight className="w-6 h-6" />
              </Button>

              {/* Image */}
              <div className="relative max-w-full max-h-[80vh] flex items-center justify-center">
                <Image
                  src={selectedPhoto.src}
                  alt={selectedPhoto.alt}
                  width={1200}
                  height={800}
                  className="max-w-full max-h-full object-contain"
                  priority
                />
              </div>

              {/* Caption and Info */}
              {selectedPhoto.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white text-sm sm:text-base leading-relaxed mb-1">
                        {selectedPhoto.caption}
                      </p>
                      <p className="text-white/60 text-xs">
                        {currentIndex + 1} / {collectiveData.photos.length}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
