"use client";

import { useRef } from "react";
import { motion, useInView } from "@/components/ui/motion";
import { cn } from "@/lib/utils";

type Technology = {
  name: string;
  icon: string;
  color: string;
};

export function TechnologiesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const technologies: Technology[] = [
    {
      name: "Angular",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg",
      color: "text-[#DD0031] dark:text-[#DD0031]",
    },
    {
      name: "Next.js",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
      color: "text-foreground dark:text-foreground",
    },
    {
      name: "Spring Boot",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
      color: "text-[#6DB33F] dark:text-[#6DB33F]",
    },
    {
      name: "Laravel",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/laravel/laravel-original.svg",
      color: "text-[#FF2D20] dark:text-[#FF2D20]",
    },
    {
      name: "React",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      color: "text-[#61DAFB] dark:text-[#61DAFB]",
    },
    {
      name: "Node.js",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      color: "text-[#339933] dark:text-[#339933]",
    },
    {
      name: "MySQL",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
      color: "text-[#4479A1] dark:text-[#4479A1]",
    },
    {
      name: "MongoDB",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
      color: "text-[#47A248] dark:text-[#47A248]",
    },
  ];

  return (
    <section
      id="technologies"
      ref={ref}
      className="py-16 md:py-24"
    >
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Technologies I Work With
          </h2>
          <div className="w-20 h-1.5 bg-primary rounded-full mb-8"></div>
          <p className="text-muted-foreground max-w-2xl">
            I have experience with a variety of modern web technologies, frameworks, and databases,
            allowing me to build complete and scalable applications.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 md:gap-12">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="flex flex-col items-center p-6 rounded-lg bg-card hover:shadow-md transition-all duration-300"
            >
              <div className="w-16 h-16 mb-4 relative flex items-center justify-center">
                <img 
                  src={tech.icon} 
                  alt={tech.name} 
                  className="w-12 h-12"
                />
              </div>
              <h3 className={cn("font-medium", tech.color)}>{tech.name}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}