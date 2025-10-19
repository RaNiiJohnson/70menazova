"use client";

import { motion } from "framer-motion";
import {
  Youtube,
  Instagram,
  Facebook,
  Music,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
} from "lucide-react";
import { collectiveData } from "@/data/collective";

const socialIcons = {
  youtube: Youtube,
  instagram: Instagram,
  facebook: Facebook,
  spotify: Music,
  soundcloud: Music,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const socialIconVariants = {
  hidden: { opacity: 0, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 260,
      damping: 20,
    },
  },
  hover: {
    scale: 1.2,
    rotate: 5,
    transition: {
      type: "spring" as const,
      stiffness: 400,
      damping: 10,
    },
  },
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-border/50 mt-20">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {/* Collective Info */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center">
                <span className="text-primary-foreground font-bold">
                  {collectiveData.name
                    .split(" ")
                    .map((word) => word[0])
                    .join("")}
                </span>
              </div>
              <h3 className="text-xl font-bold text-foreground">
                {collectiveData.name}
              </h3>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              {collectiveData.tagline}
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {collectiveData.description.substring(0, 200)}...
            </p>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold text-foreground mb-4">
              Contact
            </h4>
            <div className="space-y-3">
              <motion.a
                href={`mailto:${collectiveData.contact.email}`}
                className="flex items-center space-x-3 text-muted-foreground hover:text-foreground transition-colors group"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <Mail className="w-4 h-4 group-hover:text-primary transition-colors" />
                <span className="text-sm">{collectiveData.contact.email}</span>
              </motion.a>

              <motion.a
                href={`tel:${collectiveData.contact.phone}`}
                className="flex items-center space-x-3 text-muted-foreground hover:text-foreground transition-colors group"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <Phone className="w-4 h-4 group-hover:text-primary transition-colors" />
                <span className="text-sm">{collectiveData.contact.phone}</span>
              </motion.a>

              <motion.div
                className="flex items-center space-x-3 text-muted-foreground"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <MapPin className="w-4 h-4" />
                <span className="text-sm">
                  {collectiveData.contact.location}
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold text-foreground mb-4">
              Suivez-nous
            </h4>
            <div className="grid grid-cols-3 gap-3">
              {Object.entries(collectiveData.socialLinks).map(
                ([platform, url]) => {
                  if (!url) return null;

                  const IconComponent =
                    socialIcons[platform as keyof typeof socialIcons];
                  if (!IconComponent) return null;

                  return (
                    <motion.a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      variants={socialIconVariants}
                      whileHover="hover"
                      className="flex items-center justify-center w-12 h-12 bg-secondary hover:bg-primary rounded-lg transition-colors group"
                    >
                      <IconComponent className="w-5 h-5 text-muted-foreground group-hover:text-primary-foreground transition-colors" />
                      <span className="sr-only">{platform}</span>
                    </motion.a>
                  );
                }
              )}
            </div>

            {/* External Link Indicator */}
            <motion.p
              variants={itemVariants}
              className="text-xs text-muted-foreground mt-3 flex items-center space-x-1"
            >
              <ExternalLink className="w-3 h-3" />
              <span>Liens externes</span>
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="border-t border-border/50 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
        >
          <p className="text-sm text-muted-foreground">
            © {currentYear} {collectiveData.name}. Tous droits réservés.
          </p>

          <div className="flex items-center space-x-6 text-sm text-muted-foreground">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hover:text-foreground transition-colors"
            >
              Politique de confidentialité
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hover:text-foreground transition-colors"
            >
              Conditions d'utilisation
            </motion.button>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
