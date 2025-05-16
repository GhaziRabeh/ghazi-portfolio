"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "@/components/ui/motion";
import { Badge } from "@/components/ui/badge";

export function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section
      id="about"
      ref={ref}
      className="py-16 md:py-24 bg-muted/50"
    >
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            About Me
          </h2>
          <div className="w-20 h-1.5 bg-primary rounded-full mb-8"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative overflow-hidden rounded-lg"
          >
            <img
              src="experience.jpg"
              alt="Ghazi Rabeh working"
              className="w-full h-auto object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-primary/10 rounded-lg"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold">
              Full Stack Developer with a passion for creating seamless web experiences
            </h3>
           <p className="text-muted-foreground">
  I'm a passionate full stack developer with a solid foundation in both front-end and back-end development. 
  I've worked on various projects that helped me gain practical experience in building functional and user-friendly web applications.
</p>
<p className="text-muted-foreground">
  I focus on creating responsive interfaces using modern JavaScript frameworks like React, Angular, and Next.js, 
  and I also enjoy building reliable back-end systems with technologies such as Node.js, Spring Boot, and Laravel.
</p>

            <div className="flex flex-wrap gap-2 pt-2">
           <Badge variant="secondary">Fast Learner</Badge>
           <Badge variant="secondary">Team Player</Badge>
           <Badge variant="secondary">Detail Oriented</Badge>
           <Badge variant="secondary">UI/UX Curious</Badge>
           <Badge variant="secondary">Motivated Developer</Badge>

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}