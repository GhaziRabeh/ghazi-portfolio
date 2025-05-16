"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "@/components/ui/motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/components/ui/use-toast";
import { MailIcon, PhoneIcon, MapPinIcon, SendIcon, LoaderIcon } from "lucide-react";

// Define country codes for phone
const countryCodes = [
  { value: "+1", label: "United States (+1)" },
  { value: "+44", label: "United Kingdom (+44)" },
  { value: "+33", label: "France (+33)" },
  { value: "+49", label: "Germany (+49)" },
  { value: "+216", label: "Tunisia (+216)" },
  { value: "+971", label: "UAE (+971)" },
  { value: "+91", label: "India (+91)" },
  { value: "+86", label: "China (+86)" },
  { value: "+81", label: "Japan (+81)" },
  { value: "+82", label: "South Korea (+82)" },
];

// Form schema with validation
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  countryCode: z.string().min(2, { message: "Please select a country code." }),
  phone: z.string().min(5, { message: "Please enter a valid phone number." }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
  recaptcha: z.boolean().refine(val => val === true, {
    message: "Please verify that you are not a robot.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailVerified, setEmailVerified] = useState<boolean | null>(null);
  const [phoneVerified, setPhoneVerified] = useState<boolean | null>(null);

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      countryCode: "+1",
      phone: "",
      subject: "",
      message: "",
      recaptcha: false,
    },
  });

  // Email verification simulation
  const verifyEmail = async (email: string) => {
    // In a real app, this would call an API verification service
    // For demo, we'll simulate API call with timeout
    setEmailVerified(null);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simple regex check + random verification for demo
    const isValidFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const randomVerify = Math.random() > 0.2; // 80% chance of success for demo
    
    setEmailVerified(isValidFormat && randomVerify);
    return isValidFormat && randomVerify;
  };

  // Phone verification simulation
  const verifyPhone = async (countryCode: string, phone: string) => {
    // In a real app, this would call an API verification service
    // For demo, we'll simulate API call with timeout
    setPhoneVerified(null);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simple validation + random verification for demo
    const isValidFormat = /^\d{5,15}$/.test(phone.replace(/\D/g, ''));
    const randomVerify = Math.random() > 0.2; // 80% chance of success for demo
    
    setPhoneVerified(isValidFormat && randomVerify);
    return isValidFormat && randomVerify;
  };

  // Handle form submission
  const onSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true);
      
      // Verify email and phone
      const isEmailValid = await verifyEmail(data.email);
      if (!isEmailValid) {
        form.setError("email", { 
          type: "manual", 
          message: "This email appears to be invalid or doesn't exist." 
        });
        setIsSubmitting(false);
        return;
      }
      
      const isPhoneValid = await verifyPhone(data.countryCode, data.phone);
      if (!isPhoneValid) {
        form.setError("phone", { 
          type: "manual", 
          message: "This phone number appears to be invalid." 
        });
        setIsSubmitting(false);
        return;
      }
      
      // Simulate API submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success notification
      toast({
        title: "Message sent!",
        description: "Thank you for your message. I'll get back to you soon.",
      });
      
      // Reset form
      form.reset();
      setEmailVerified(null);
      setPhoneVerified(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
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
            Get In Touch
          </h2>
          <div className="w-20 h-1.5 bg-primary rounded-full mb-8"></div>
          <p className="text-muted-foreground max-w-2xl">
            Interested in working together? Fill out the form below and I'll get back to you as soon as possible.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 flex flex-col space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <ul className="space-y-6">
                <li className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <MailIcon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Email</h4>
                    <a 
                      href="mailto:rabehghazi81@gmail.com"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      rabehghazi81@gmail.com
                    </a>
                  </div>
                </li>
                <li className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <PhoneIcon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Phone</h4>
                    <a 
                      href="tel:+21650159397"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      +216 50 159 397
                    </a>
                  </div>
                </li>
                <li className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <MapPinIcon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Location</h4>
                    <p className="text-muted-foreground">
                      Korba, Tunisia
                    </p>
                  </div>
                </li>
              </ul>
            </div>

 
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-3"
          >
            <div className="bg-card rounded-xl shadow-sm p-6 md:p-8">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <div className="relative">
                            <FormControl>
                              <Input 
                                placeholder="your.email@example.com" 
                                {...field} 
                                className={emailVerified === true ? "pr-10 border-green-500" : emailVerified === false ? "pr-10 border-red-500" : ""}
                                onBlur={async (e) => {
                                  field.onBlur();
                                  if (e.target.value) await verifyEmail(e.target.value);
                                }}
                              />
                            </FormControl>
                            {emailVerified === true && (
                              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                              </div>
                            )}
                            {emailVerified === false && (
                              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                              </div>
                            )}
                          </div>
                          <FormDescription className="text-xs">
                            We'll verify this email for validity.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex space-x-2">
                      <FormField
                        control={form.control}
                        name="countryCode"
                        render={({ field }) => (
                          <FormItem className="w-1/3">
                            <FormLabel>Code</FormLabel>
                            <Select 
                              defaultValue={field.value} 
                              onValueChange={field.onChange}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Code" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent className="max-h-64">
                                {countryCodes.map((code) => (
                                  <SelectItem key={code.value} value={code.value}>
                                    {code.value}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Phone</FormLabel>
                            <div className="relative">
                              <FormControl>
                                <Input 
                                  placeholder="Phone number" 
                                  type="tel" 
                                  {...field} 
                                  className={phoneVerified === true ? "pr-10 border-green-500" : phoneVerified === false ? "pr-10 border-red-500" : ""}
                                  onBlur={async (e) => {
                                    field.onBlur();
                                    if (e.target.value) {
                                      const countryCode = form.getValues("countryCode");
                                      await verifyPhone(countryCode, e.target.value);
                                    }
                                  }}
                                />
                              </FormControl>
                              {phoneVerified === true && (
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
                                </div>
                              )}
                              {phoneVerified === false && (
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                </div>
                              )}
                            </div>
                            <FormDescription className="text-xs">
                              We'll verify this phone number.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <FormControl>
                            <Input placeholder="What's this about?" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Your message..." 
                            className="min-h-32" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="recaptcha"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            I'm not a robot
                          </FormLabel>
                          <FormDescription>
                            Verify that you are a human.
                          </FormDescription>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <SendIcon className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}