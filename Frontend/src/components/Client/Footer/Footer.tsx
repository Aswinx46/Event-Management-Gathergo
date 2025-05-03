
import { motion } from "framer-motion";
import { Facebook, Instagram, Linkedin, Twitter, Copyright } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setEmail("");
      setTimeout(() => setIsSubmitted(false), 3000);
    }
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const linkVariants = {
    hover: {
      scale: 1.05,
      color: "#A855F7",
      transition: {
        duration: 0.2,
      },
    },
  };

  const glowVariants = {
    hover: {
      boxShadow: "0 0 15px rgba(168, 85, 247, 0.5)",
      transition: {
        duration: 0.3,
      },
    },
  };

  const socialLinks = [
    { icon: <Facebook size={18} />, href: "#", name: "Facebook" },
    { icon: <Instagram size={18} />, href: "#", name: "Instagram" },
    { icon: <Twitter size={18} />, href: "#", name: "Twitter" },
    { icon: <Linkedin size={18} />, href: "#", name: "LinkedIn" },
  ];

  const quickLinks = [
    { name: "Events", href: "#" },
    { name: "Organizers", href: "#" },
    { name: "Venues", href: "#" },
    { name: "Blog", href: "#" },
  ];

  const supportLinks = [
    { name: "Help Center", href: "#" },
    { name: "Contact Us", href: "#" },
    { name: "FAQs", href: "#" },
    { name: "Privacy Policy", href: "#" },
  ];

  return (
    <motion.footer
      className="bg-black text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="px-6 py-12 mx-8 ">
        <motion.div
          className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Company Info */}
          <motion.div variants={itemVariants}>
            <motion.h2 
              className="mb-6 text-2xl font-bold bg-gradient-to-r from-purple-500 via-purple-400 to-purple-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              EventMaster
            </motion.h2>
            <motion.p className="mb-4 text-gray-300"
              variants={itemVariants}
            >
              Creating unforgettable experiences and bringing people together through perfectly organized events.
            </motion.p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-all duration-300"
                  variants={glowVariants}
                  whileHover="hover"
                  aria-label={link.name}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="mb-6 text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li key={index}>
                  <motion.a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors"
                    variants={linkVariants}
                    whileHover="hover"
                  >
                    {link.name}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div variants={itemVariants}>
            <h3 className="mb-6 text-lg font-semibold">Support</h3>
            <ul className="space-y-3">
              {supportLinks.map((link, index) => (
                <motion.li key={index}>
                  <motion.a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors"
                    variants={linkVariants}
                    whileHover="hover"
                  >
                    {link.name}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div variants={itemVariants}>
            <h3 className="mb-6 text-lg font-semibold">Stay Updated</h3>
            <p className="mb-4 text-gray-300">
              Subscribe to our newsletter for the latest events and offers.
            </p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="relative">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="bg-gray-800 border-gray-700 text-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button
                  type="submit"
                  variant="outline"
                  className="w-full border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white transition-colors"
                >
                  {isSubmitted ? "Thank you!" : "Subscribe"}
                </Button>
              </motion.div>
            </form>
          </motion.div>
        </motion.div>

        {/* Bottom */}
        <motion.div
          className="pt-8 mt-12 border-t border-gray-800 text-center sm:flex sm:justify-between sm:text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-center sm:justify-start text-gray-400">
            <Copyright size={16} className="mr-2" />
            <span>{new Date().getFullYear()} EventMaster. All rights reserved.</span>
          </div>
          <div className="mt-4 sm:mt-0">
            <motion.div className="flex space-x-6 justify-center sm:justify-start">
              <motion.a
                href="#"
                className="text-gray-400 hover:text-white"
                variants={linkVariants}
                whileHover="hover"
              >
                Terms
              </motion.a>
              <motion.a
                href="#"
                className="text-gray-400 hover:text-white"
                variants={linkVariants}
                whileHover="hover"
              >
                Privacy
              </motion.a>
              <motion.a
                href="#"
                className="text-gray-400 hover:text-white"
                variants={linkVariants}
                whileHover="hover"
              >
                Cookies
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Animated glow effect on the bottom */}
      <div className="relative h-1">
        <motion.div
          className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 via-purple-400 to-purple-600"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
    </motion.footer>
  );
};

export default Footer;
