import Link from "next/link";
import { LinkedinIcon, GithubIcon, TwitterIcon, MailIcon } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t py-8 md:py-12">
      <div className="container flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <div className="flex flex-col items-center md:items-start">
          <Link href="/" className="font-bold text-xl mb-2">
            <span className="text-primary">Ghazi</span> Rabeh
          </Link>
          <p className="text-sm text-muted-foreground">
            Full Stack Web Developer
          </p>
        </div>
        
        <div className="flex space-x-6">
          <Link 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="LinkedIn"
          >
            <LinkedinIcon className="h-5 w-5" />
          </Link>
          <Link 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="GitHub"
          >
            <GithubIcon className="h-5 w-5" />
          </Link>
          <Link 
            href="https://twitter.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="Twitter"
          >
            <TwitterIcon className="h-5 w-5" />
          </Link>
          <Link 
            href="mailto:hello@ghazirabeh.com" 
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="Email"
          >
            <MailIcon className="h-5 w-5" />
          </Link>
        </div>
        
        <div className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Ghazi Rabeh. All rights reserved.
        </div>
      </div>
    </footer>
  );
}