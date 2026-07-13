import { motion } from "framer-motion";
import { Shield, Brain, Zap, Lock, Building2 } from "lucide-react";

const items = [
  { icon: Shield, label: "Secure Analysis" },
  { icon: Brain, label: "AI Powered" },
  { icon: Zap, label: "Fast Processing" },
  { icon: Lock, label: "Privacy First" },
  { icon: Building2, label: "Modern ATS Engine" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function TrustSection() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="flex flex-wrap justify-center gap-8 md:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {items.map((item) => (
            <motion.div
              key={item.label}
              variants={itemVariants}
              className="flex items-center gap-3"
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm font-medium text-main">{item.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
