"use client";

import { motion } from "framer-motion";
import { collectiveData } from "@/data/collective";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Mail,
  Phone,
  MapPin,
  Instagram,
  Youtube,
  Music,
  Facebook,
  ExternalLink,
} from "lucide-react";

export default function Contact() {
  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case "instagram":
        return <Instagram className="w-5 h-5" />;
      case "youtube":
        return <Youtube className="w-5 h-5" />;
      case "facebook":
        return <Facebook className="w-5 h-5" />;
      case "spotify":
      case "soundcloud":
        return <Music className="w-5 h-5" />;
      default:
        return <ExternalLink className="w-5 h-5" />;
    }
  };

  const getSocialColor = (platform: string) => {
    switch (platform) {
      case "instagram":
        return "hover:bg-pink-500/10 hover:text-pink-400 hover:border-pink-500/30";
      case "youtube":
        return "hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30";
      case "facebook":
        return "hover:bg-blue-500/10 hover:text-blue-400 hover:border-blue-500/30";
      case "spotify":
        return "hover:bg-green-500/10 hover:text-green-400 hover:border-green-500/30";
      case "soundcloud":
        return "hover:bg-orange-500/10 hover:text-orange-400 hover:border-orange-500/30";
      default:
        return "hover:bg-primary/10 hover:text-primary hover:border-primary/30";
    }
  };

  const socialLinks = Object.entries(collectiveData.socialLinks).filter(
    ([_, url]) => url
  );

  return (
    <section id="contact" className="py-16 sm:py-24 bg-secondary/10">
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
            Restons{" "}
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              Connectés
            </span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Suivez-nous sur nos réseaux sociaux et contactez-nous pour toute
            collaboration, booking ou simplement pour échanger sur notre
            musique.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-2xl font-semibold text-foreground mb-6">
                  Informations de Contact
                </h3>

                <div className="space-y-6">
                  {/* Email */}
                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-200"
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <a
                        href={`mailto:${collectiveData.contact.email}`}
                        className="text-foreground hover:text-primary transition-colors duration-200"
                      >
                        {collectiveData.contact.email}
                      </a>
                    </div>
                  </motion.div>

                  {/* Phone */}
                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-200"
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Téléphone</p>
                      <a
                        href={`tel:${collectiveData.contact.phone}`}
                        className="text-foreground hover:text-primary transition-colors duration-200"
                      >
                        {collectiveData.contact.phone}
                      </a>
                    </div>
                  </motion.div>

                  {/* Location */}
                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-200"
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Localisation
                      </p>
                      <p className="text-foreground">
                        {collectiveData.contact.location}
                      </p>
                    </div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Social Media Links */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-6 sm:p-8">
                <h3 className="text-2xl font-semibold text-foreground mb-6">
                  Suivez-nous
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {socialLinks.map(([platform, url], index) => (
                    <motion.div
                      key={platform}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <Button
                        variant="outline"
                        onClick={() => window.open(url, "_blank")}
                        className={`w-full justify-start gap-3 h-12 border-border/50 transition-all duration-300 ${getSocialColor(
                          platform
                        )}`}
                      >
                        {getSocialIcon(platform)}
                        <span className="capitalize font-medium">
                          {platform === "soundcloud" ? "SoundCloud" : platform}
                        </span>
                        <ExternalLink className="w-4 h-4 ml-auto opacity-50" />
                      </Button>
                    </motion.div>
                  ))}
                </div>

                {/* Call to Action */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="mt-8 p-4 bg-primary/5 rounded-lg border border-primary/10"
                >
                  <h4 className="text-lg font-medium text-foreground mb-2">
                    Collaborations & Bookings
                  </h4>
                  <p className="text-muted-foreground text-sm mb-4">
                    Intéressé par une collaboration ou souhaitez-vous nous
                    booker pour un événement ? Contactez-nous directement !
                  </p>
                  <Button
                    onClick={() =>
                      window.open(
                        `mailto:${collectiveData.contact.email}`,
                        "_blank"
                      )
                    }
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Nous Contacter
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Bottom Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12 sm:mt-16"
        >
          <div className="max-w-2xl mx-auto">
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Merci de faire partie de notre communauté. Ensemble, nous
              continuons à faire vibrer la scène rap malgache et à partager
              notre passion pour la musique authentique.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
