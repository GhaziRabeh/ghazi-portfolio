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
    title: "Full Stack Developer Intern",
    company: "Tekno Island",
    location: "Hammamet, Tunisia",
    period: "Mar 2025 - Present",
    description: "Contributing to the development of Investini, a microservices-based platform connecting entrepreneurs and investors.",
    technologies: ["Spring Boot", "Next.js", "Microservices", "JWT", "REST API"],
    details: [
      "Developed secure authentication service using JWT with centralized identity management",
      "Built and connected REST APIs between distributed microservices",
      "Implemented circuit breakers for inter-service communication",
      "Developed responsive front-end interfaces using Next.js"
    ]
  },
  {
    id: "exp2",
    title: "Full Stack Developer Intern",
    company: "Think Trend",
    location: "Nabeul, Tunisia",
    period: "Jan 2025 - Present",
    description: "Worked on a business management web application following Scrum methodology.",
    technologies: ["Spring Boot", "Angular", "REST API", "JWT", "Scrum"],
    details: [
      "Developed secure authentication system using JWT",
      "Built modular and reusable components with Angular",
      "Created and documented RESTful APIs with Spring Boot",
      "Collaborated in Agile team and participated in sprint planning and reviews"
    ]
  },
  {
    id: "exp3",
    title: "Web Developer Intern",
    company: "Tekno Island",
    location: "Hammamet, Tunisia",
    period: "Sept 2024 - Oct 2024",
    description: "Observed professional web development practices and contributed to an e-commerce project.",
    technologies: ["Laravel", "JavaScript", "Bootstrap", "CSS3", "HTML5"],
    details: [
      "Built a complete responsive e-commerce site using Laravel and Bootstrap",
      "Designed front-end components with HTML, CSS, and JavaScript",
      "Integrated front-end with Laravel back-end features",
      "Participated in basic web security practices and responsive design implementation"
    ]
  }
];


  // Freelance Projects Data
  const freelanceProjects: ExperienceItem[] = [
  {
    id: "proj1",
    title: "CRUD Web Application",
    company: "Local Client",
    location: "Remote",
    period: "Feb 2025 - Mar 2025",
    description: "Developed a full CRUD system for managing resources using Laravel.",
    technologies: ["Laravel", "MySQL", "Bootstrap", "Blade"],
    details: [
      "Created CRUD operations for managing entities (create, read, update, delete)",
      "Implemented server-side form validation and error handling",
      "Designed responsive UI with Bootstrap and Blade templates",
      "Connected MySQL database with Eloquent ORM for data operations"
    ],
    link: ""
  },
  {
    id: "proj2",
    title: "Authentication System",
    company: "Startup Client",
    location: "Remote",
    period: "Jan 2025 - Feb 2025",
    description: "Built a secure user authentication system using Spring Boot and JWT.",
    technologies: ["Spring Boot", "Spring Security", "JWT", "PostgreSQL"],
    details: [
      "Implemented login, registration, and role-based access control",
      "Used JWT tokens for secure authentication and stateless sessions",
      "Integrated password hashing and validation",
      "Tested endpoints using Postman and documented with Swagger"
    ],
    link: ""
  },
  {
    id: "proj3",
    title: "Resource Management System",
    company: "Freelance Client",
    location: "Remote",
    period: "Nov 2024 - Dec 2024",
    description: "Created a web-based CRUD system using Spring Boot.",
    technologies: ["Spring Boot", "MySQL", "Bootstrap"],
    details: [
      "Developed CRUD functionality for managing data entities",
      "Used Thymeleaf for server-side rendering and dynamic views",
      "Connected H2 in-memory database for development and testing",
      "Applied MVC pattern for better code organization"
    ],
    link: ""
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