"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Member } from "@/data/collective";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Instagram, Twitter, Music, Youtube } from "lucide-react";
import { useState, useEffect } from "react";
import { useReducedMotion, useIsMobile } from "@/lib/hooks";

interface MemberCardProps {
  member: Member;
  index?: number;
}

export function MemberCard({ member, index = 0 }: MemberCardProps) {
  const [showSocials, setShowSocials] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const isMobile = useIsMobile();

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case "instagram":
        return <Instagram className="w-4 h-4" />;
      case "twitter":
        return <Twitter className="w-4 h-4" />;
      case "spotify":
      case "soundcloud":
        return <Music className="w-4 h-4" />;
      case "youtube":
        return <Youtube className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const socialLinks = member.socialLinks
    ? Object.entries(member.socialLinks)
    : [];

  return (
    <motion.div
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
              y: -8,
              transition: { duration: 0.2 },
            }
          : {}
      }
      whileTap={isMobile ? { scale: 0.98 } : {}}
      className="group touch-manipulation"
      onTouchStart={() => isMobile && setShowSocials(true)}
      onTouchEnd={() =>
        isMobile && setTimeout(() => setShowSocials(false), 3000)
      }
    >
      <Card className="overflow-hidden bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/20 transition-all duration-300 h-full">
        <CardContent className="p-0">
          {/* Image Container */}
          <div className="relative aspect-square overflow-hidden">
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.4 }}
              className="w-full h-full"
            >
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </motion.div>

            {/* Overlay with social links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: (isMobile && showSocials) || !isMobile ? 0 : 0,
              }}
              whileHover={!isMobile ? { opacity: 1 } : {}}
              transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
              className="absolute inset-0 bg-black/60 flex items-center justify-center group-hover:opacity-100"
            >
              <div className="flex gap-2">
                {socialLinks.map(([platform, url]) => (
                  <motion.div
                    key={platform}
                    initial={{ scale: 0 }}
                    whileHover={!shouldReduceMotion ? { scale: 1.1 } : {}}
                    animate={{ scale: 1 }}
                    transition={{ delay: shouldReduceMotion ? 0 : 0.1 }}
                  >
                    <Button
                      size="sm"
                      variant="secondary"
                      className="w-12 h-12 p-0 bg-white/20 hover:bg-white/30 backdrop-blur-sm touch-manipulation min-h-[44px] min-w-[44px]"
                      onClick={() => window.open(url, "_blank")}
                      aria-label={`Voir ${member.name} sur ${platform}`}
                    >
                      {getSocialIcon(platform)}
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Mobile social links - always visible on mobile */}
            {isMobile && socialLinks.length > 0 && (
              <div className="absolute bottom-2 right-2 flex gap-1">
                {socialLinks.slice(0, 2).map(([platform, url]) => (
                  <Button
                    key={platform}
                    size="sm"
                    variant="secondary"
                    className="w-8 h-8 p-0 bg-black/60 hover:bg-black/80 backdrop-blur-sm"
                    onClick={() => window.open(url, "_blank")}
                    aria-label={`Voir ${member.name} sur ${platform}`}
                  >
                    {getSocialIcon(platform)}
                  </Button>
                ))}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-4 space-y-3">
            <div className="space-y-1">
              <h3 className="font-semibold text-lg leading-tight text-foreground group-hover:text-primary transition-colors duration-200">
                {member.name}
              </h3>
              <Badge variant="outline" className="text-xs">
                {member.role}
              </Badge>
            </div>

            <p className="text-muted-foreground text-sm leading-relaxed line-clamp-4">
              {member.bio}
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
