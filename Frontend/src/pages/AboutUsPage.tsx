import { useRef } from 'react';
import { ScrollProgress } from '@/components/ui/scroll-progress';
import { Link } from '../components/Router';
import OrbitingSkills from '@/components/ui/orbiting-skills';
import { motion } from 'framer-motion';

export default function AboutUsPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-black pt-20">
      <div className="relative h-[calc(100vh-5rem)] overflow-y-auto" ref={containerRef}>
        <div className="pointer-events-none fixed left-0 top-20 w-full z-50">
          <div className="absolute left-0 top-0 h-1 w-full bg-gray-200 dark:bg-gray-800" />
          <ScrollProgress 
            containerRef={containerRef} 
            className="absolute top-0 bg-gradient-to-r from-blue-500 to-purple-500" 
          />
        </div>

        <div className="max-w-4xl mx-auto px-8 py-16">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-between items-center mb-12"
          >
            <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-200 dark:to-gray-400 bg-clip-text text-transparent">
              About Us
            </h1>
            <Link href="/" className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
              ← Back
            </Link>
          </motion.div>

          <div className="space-y-8 text-gray-700 dark:text-gray-300 leading-relaxed">
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Smart Classroom & Lab Electronic Management System
              </h2>
              <p className="text-lg">
                Modern educational institutions rely heavily on electronic infrastructure such as computers, 
                smart boards, projectors, and lab equipment. Managing these resources efficiently and reporting 
                technical issues in a timely manner is essential for smooth academic operations.
              </p>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="text-lg">
                Our <span className="text-blue-600 dark:text-blue-400 font-semibold">Smart Classroom & Lab Electronic Management System</span> is 
                a web-based platform designed to simplify the process of monitoring, managing, and reporting issues 
                related to classroom and laboratory electronic equipment.
              </p>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <p className="text-lg">
                The system allows students and faculty to easily select a classroom or lab, choose the specific 
                electronic device (such as a PC, fan, or smart board), describe the issue, and submit a query in 
                just a few steps. These reports are instantly made available on the Admin Dashboard, where 
                administrators can track, filter, and update the status of each complaint.
              </p>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <p className="text-lg">
                By centralizing issue reporting and asset management, our platform reduces manual communication, 
                improves response time, and ensures better maintenance of institutional resources. The system is 
                built using modern web technologies like <span className="text-purple-600 dark:text-purple-400 font-semibold">React</span>, 
                <span className="text-blue-600 dark:text-blue-400 font-semibold"> TypeScript</span>, and 
                <span className="text-cyan-600 dark:text-cyan-400 font-semibold"> Tailwind CSS</span>, providing a fast, reliable, 
                and user-friendly experience.
              </p>
            </motion.section>

            <motion.section 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white dark:bg-gray-800/50 p-8 rounded-xl border border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Goal</h3>
              <p className="text-lg">
                Our goal is to create a smart, scalable, and efficient solution that enhances transparency, 
                accountability, and operational efficiency within educational environments.
              </p>
            </motion.section>

            <motion.section 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="pt-8"
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Key Features</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { icon: '🎯', title: 'Easy Reporting', desc: 'Simple interface to report issues in just a few clicks' },
                  { icon: '📊', title: 'Admin Dashboard', desc: 'Centralized dashboard to track and manage all complaints' },
                  { icon: '⚡', title: 'Real-time Updates', desc: 'Instant notifications and status updates for all reports' },
                  { icon: '🔒', title: 'Secure & Reliable', desc: 'Built with modern security practices and reliable infrastructure' }
                ].map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
                    className="bg-white dark:bg-gray-800/30 p-6 rounded-lg border border-gray-200 dark:border-gray-700 cursor-pointer"
                  >
                    <div className="text-3xl mb-3">{feature.icon}</div>
                    <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h4>
                    <p>{feature.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            <motion.section 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="pt-8 pb-16"
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">Technology Stack</h3>
              <div className="flex justify-center items-center min-h-[500px]">
                <OrbitingSkills />
              </div>
            </motion.section>
          </div>
        </div>

        <div className="pointer-events-none fixed bottom-0 left-0 h-24 w-full bg-gradient-to-t from-gray-50 dark:from-gray-900 to-transparent" />
      </div>
    </div>
  );
}
