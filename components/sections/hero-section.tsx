"use client";

import { useState, useEffect } from "react";
import { motion } from "@/components/ui/motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section 
      id="home"
      className="relative min-h-[90vh] flex items-center"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl max-h-4xl rounded-full bg-primary/5 blur-3xl"></div>
      </div>

      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col space-y-4"
          >
            <div className="inline-block">
              <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium mb-4 bg-background/50 backdrop-blur-sm">
                <span className="text-primary mr-1">✓</span> Available for new projects
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Hi, I&apos;m <span className="text-primary">Ghazi Rabeh</span>
            </h1>
            <h2 className="text-xl md:text-2xl lg:text-3xl text-muted-foreground">
              Full Stack Web Developer
            </h2>
            <p className="text-muted-foreground max-w-md text-base md:text-lg">
              I build modern, responsive, and performant web applications with cutting-edge technologies.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Button size="lg" asChild>
                <Link href="#contact">
                  Hire Me <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="/resume.pdf" download>
                  Download Resume <Download className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="relative aspect-square w-full max-w-md mx-auto md:ml-auto"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/20 to-primary/10 shadow-xl"></div>
            <div className="absolute inset-2 rounded-full bg-background flex items-center justify-center overflow-hidden">
              <img
                src="ghazi-rabeh.jpg"
                alt="Ghazi Rabeh"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}