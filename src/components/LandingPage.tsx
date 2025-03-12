import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./button";
import { motion } from "motion/react";
import { ArrowRight, Code, Palette, Zap, Github } from "lucide-react";

interface LandingPageProps {
  isDarkMode: boolean;
  onThemeToggle: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  isDarkMode,
  onThemeToggle,
}) => {
  // For debugging
  console.log("LandingPage rendering with isDarkMode:", isDarkMode);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const features = [
    {
      icon: <Code className="h-6 w-6 text-white" />,
      title: "Modern Components",
      description:
        "Beautifully designed, fully accessible UI components built with React and Tailwind CSS.",
      color: "bg-primary-500",
    },
    {
      icon: <Palette className="h-6 w-6 text-white" />,
      title: "Customizable",
      description:
        "Easily customize components to match your brand with our flexible theming system.",
      color: "bg-secondary-500",
    },
    {
      icon: <Zap className="h-6 w-6 text-white" />,
      title: "Fast & Lightweight",
      description:
        "Optimized for performance with minimal bundle size and zero unnecessary dependencies.",
      color: "bg-warning-500",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section
        className="py-20 px-4 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-slate-700 dark:text-white"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Modern UI Components
        </motion.h1>

        <motion.p
          className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-10"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          A beautiful, modern component library for React applications. <br />
          Built with Tailwind CSS and Motion.
        </motion.p>

        <motion.div
          className="flex flex-wrap justify-center gap-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Link to="/components/button">
            <Button
              variant="primary"
              size="lg"
              icon={ArrowRight}
              iconPosition="right"
            >
              Explore Components
            </Button>
          </Link>

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="secondary" size="lg" icon={Github}>
              GitHub
            </Button>
          </a>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="py-16 px-4 bg-gray-100 dark:bg-gray-900"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.h2
          className="text-3xl font-bold text-center mb-12 text-slate-600 dark:text-white"
          variants={item}
        >
          Why Choose Our Components?
        </motion.h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className={`${feature.color} p-6 rounded-lg shadow-sm text-white`}
              variants={item}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-white/90">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="py-20 px-4 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-6 text-slate-900 dark:text-white">
          Ready to Build Beautiful UIs?
        </h2>
        <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-10">
          Get started with our component library today and create stunning user
          interfaces in no time.
        </p>
        <Link to="/components/button">
          <Button
            variant="primary"
            size="lg"
            icon={ArrowRight}
            iconPosition="right"
          >
            Get Started
          </Button>
        </Link>
      </motion.section>
    </div>
  );
};
