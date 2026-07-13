import { motion } from "framer-motion";

export default function QuoteSection() {
  return (
    <section className="py-24 px-6 bg-papaya">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.span
            className="text-6xl text-primary/20 leading-none select-none"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            &ldquo;
          </motion.span>
          <blockquote className="text-2xl sm:text-3xl md:text-4xl font-medium text-main leading-snug -mt-4">
            Your resume gets you noticed. Preparation gets you hired.
          </blockquote>
          <p className="mt-6 text-muted text-sm">
            Every great career starts with a single optimized resume.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
