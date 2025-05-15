"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "@/components/ui/motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarIcon, BriefcaseIcon, CodeIcon, ExternalLinkIcon } from "lucide-react";

// Types
interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
  technologies: string[];
  details: string[];
  link?: string;
}

export function ExperienceSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [selectedExperience, setSelectedExperience] = useState<ExperienceItem | null>(null);

  // Professional Experience Data
  const professionalExperience: ExperienceItem[] = [
    {
      id: "exp1",
      title: "Senior Full Stack Developer",
      company: "TechCorp International",
      location: "New York, NY",
      period: "Jan 2021 - Present",
      description: "Leading development of enterprise-level web applications with React and Spring Boot.",
      technologies: ["React", "Spring Boot", "AWS", "MySQL", "Redis"],
      details: [
        "Led a team of 5 developers in creating a new customer management platform",
        "Optimized database queries resulting in 40% faster load times",
        "Implemented CI/CD pipeline using GitHub Actions and AWS",
        "Mentored junior developers and conducted code reviews"
      ]
    },
    {
      id: "exp2",
      title: "Full Stack Developer",
      company: "Digital Solutions Inc.",
      location: "San Francisco, CA",
      period: "Mar 2018 - Dec 2020",
      description: "Developed responsive web applications using Angular and Laravel.",
      technologies: ["Angular", "Laravel", "PostgreSQL", "Docker"],
      details: [
        "Built and maintained 3 major client-facing applications",
        "Implemented authentication system with multi-factor authentication",
        "Optimized front-end performance achieving 95+ Lighthouse scores",
        "Contributed to internal component library used across multiple projects"
      ]
    },
    {
      id: "exp3",
      title: "Web Developer",
      company: "InnovateTech",
      location: "Boston, MA",
      period: "Jun 2016 - Feb 2018",
      description: "Created custom websites and web applications for clients across various industries.",
      technologies: ["React", "Node.js", "MongoDB", "Express"],
      details: [
        "Developed 12+ client websites from design to deployment",
        "Created RESTful APIs for mobile application integration",
        "Implemented responsive designs for optimal viewing on all devices",
        "Collaborated with design team to implement pixel-perfect UI"
      ]
    }
  ];

  // Freelance Projects Data
  const freelanceProjects: ExperienceItem[] = [
    {
      id: "proj1",
      title: "E-commerce Platform",
      company: "Fashion Boutique",
      location: "Remote",
      period: "Nov 2022 - Feb 2023",
      description: "Built a custom e-commerce platform with Next.js and Stripe integration.",
      technologies: ["Next.js", "Stripe", "Tailwind CSS", "MongoDB"],
      details: [
        "Implemented secure payment processing with Stripe",
        "Created admin dashboard for inventory management",
        "Built responsive product catalog with advanced filtering",
        "Integrated with shipping API for real-time shipping calculations"
      ],
      link: "https://fashion-boutique.com"
    },
    {
      id: "proj2",
      title: "Real Estate Listing Application",
      company: "PropertyFinder",
      location: "Remote",
      period: "May 2021 - Aug 2021",
      description: "Developed a property listing platform with advanced search functionality.",
      technologies: ["React", "Node.js", "MongoDB", "Google Maps API"],
      details: [
        "Implemented geolocation search with Google Maps integration",
        "Created advanced filtering options for property searches",
        "Built user authentication and property saving features",
        "Developed admin tools for property management and verification"
      ],
      link: "https://propertyfinder.com"
    },
    {
      id: "proj3",
      title: "Learning Management System",
      company: "EducateMe",
      location: "Remote",
      period: "Jan 2020 - Apr 2020",
      description: "Created a custom LMS for online courses with interactive features.",
      technologies: ["Angular", "Spring Boot", "MySQL", "AWS"],
      details: [
        "Built course creation and management tools",
        "Implemented video streaming with adaptive bitrate",
        "Created interactive quizzes and assignment submission system",
        "Developed analytics dashboard for course performance"
      ],
      link: "https://educateme.com"
    }
  ];

  const ExperienceCard = ({ experience, index }: { experience: ExperienceItem, index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.4, delay: 0.1 * index }}
    >
      <Card 
        className="h-full hover:shadow-md transition-all duration-300 cursor-pointer"
        onClick={() => setSelectedExperience(experience)}
      >
        <CardHeader>
          <div className="flex justify-between items-start mb-2">
            <CardTitle className="text-xl">{experience.title}</CardTitle>
            <Badge variant="outline">{experience.period}</Badge>
          </div>
          <CardDescription className="flex items-center gap-1">
            <BriefcaseIcon className="h-4 w-4" />
            {experience.company} • {experience.location}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{experience.description}</p>
        </CardContent>
        <CardFooter>
          <div className="flex flex-wrap gap-2">
            {experience.technologies.slice(0, 3).map((tech) => (
              <Badge key={tech} variant="secondary">{tech}</Badge>
            ))}
            {experience.technologies.length > 3 && (
              <Badge variant="secondary">+{experience.technologies.length - 3}</Badge>
            )}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );

  const ExperienceDetailDialog = () => (
    <Dialog open={!!selectedExperience} onOpenChange={(open) => !open && setSelectedExperience(null)}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl">{selectedExperience?.title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <BriefcaseIcon className="h-4 w-4" />
              <span className="font-medium">{selectedExperience?.company}</span>
              <span>•</span>
              <span>{selectedExperience?.location}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <CalendarIcon className="h-4 w-4" />
              <span>{selectedExperience?.period}</span>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Description</h4>
            <p className="text-muted-foreground">{selectedExperience?.description}</p>
          </div>

          <div>
            <h4 className="font-medium mb-2">Key Responsibilities</h4>
            <ul className="space-y-2">
              {selectedExperience?.details.map((detail, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span className="text-muted-foreground">{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-2">Technologies Used</h4>
            <div className="flex flex-wrap gap-2">
              {selectedExperience?.technologies.map((tech) => (
                <Badge key={tech} variant="secondary">{tech}</Badge>
              ))}
            </div>
          </div>

          {selectedExperience?.link && (
            <div className="pt-2">
              <Button variant="outline" size="sm" asChild>
                <a 
                  href={selectedExperience.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ExternalLinkIcon className="h-4 w-4" />
                  Visit Project
                </a>
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <section
      id="experience"
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
            Experience
          </h2>
          <div className="w-20 h-1.5 bg-primary rounded-full mb-8"></div>
          <p className="text-muted-foreground max-w-2xl">
            My professional journey includes both enterprise experience and freelance projects.
            Click on any item to see more details.
          </p>
        </motion.div>

        <Tabs defaultValue="professional" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="professional" className="flex items-center gap-2">
                <BriefcaseIcon className="h-4 w-4" />
                <span>Professional</span>
              </TabsTrigger>
              <TabsTrigger value="freelance" className="flex items-center gap-2">
                <CodeIcon className="h-4 w-4" />
                <span>Freelance</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="professional" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {professionalExperience.map((exp, index) => (
                <ExperienceCard key={exp.id} experience={exp} index={index} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="freelance" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {freelanceProjects.map((project, index) => (
                <ExperienceCard key={project.id} experience={project} index={index} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <ExperienceDetailDialog />
      </div>
    </section>
  );
}