"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Member } from "@/data/collective";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Instagram, Twitter, Music, Youtube } from "lucide-react";

interface MemberCardProps {
  member: Member;
  index?: number;
}

export function MemberCard({ member, index = 0 }: MemberCardProps) {
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
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{
        y: -8,
        transition: { duration: 0.2 },
      }}
      className="group"
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
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-black/60 flex items-center justify-center"
            >
              <div className="flex gap-2">
                {socialLinks.map(([platform, url]) => (
                  <motion.div
                    key={platform}
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Button
                      size="sm"
                      variant="secondary"
                      className="w-10 h-10 p-0 bg-white/20 hover:bg-white/30 backdrop-blur-sm"
                      onClick={() => window.open(url, "_blank")}
                    >
                      {getSocialIcon(platform)}
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
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
