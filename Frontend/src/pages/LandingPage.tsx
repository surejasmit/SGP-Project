import { MinimalistHero } from '@/components/ui/minimalist-hero';
import { MinimalFooter } from '@/components/ui/minimal-footer';
import { Link } from '../components/Router';
import { Typewriter } from '@/components/ui/typewriter-text';
import { motion } from 'framer-motion';

export default function LandingPage() {
  return (
    <div className="bg-background text-foreground">
      <MinimalistHero
        mainText=""
        overlayText={{
          part1: 'Smart',
          part2: 'Classroom.',
        }}
        locationText="Smart Classroom Management"
      />
      
      {/* Get Started Section */}
      <section className="bg-background py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Link href="/locations">
              <button className="h-auto py-4 px-8 text-lg rounded-full border-2 border-foreground/20 bg-foreground text-background font-medium hover:bg-foreground/90 transition-all">
                Get Started
              </button>
            </Link>
          </div>

          <h2 className="text-4xl font-bold text-center mb-4 text-foreground">
            <Typewriter 
              text={["Select Location", "Choose Your Workspace", "Report Equipment Issues"]}
              speed={80}
              deleteSpeed={50}
              delay={2000}
              loop={true}
            />
          </h2>
          <p className="text-foreground/60 text-center mb-16 max-w-2xl mx-auto">
            Choose your location to report equipment issues
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <Link href="/classrooms">
              <motion.div 
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center text-center p-8 cursor-pointer bg-background rounded-xl border border-foreground/10 hover:border-foreground/30 transition-colors"
              >
                <div className="w-20 h-20 bg-yellow-400/90 rounded-full flex items-center justify-center text-3xl font-bold mb-4">
                  🏫
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-3">Classrooms</h3>
                <p className="text-foreground/60 text-sm">
                  Report issues in any of the 15 classrooms
                </p>
              </motion.div>
            </Link>
            
            <Link href="/labs">
              <motion.div 
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center text-center p-8 cursor-pointer bg-background rounded-xl border border-foreground/10 hover:border-foreground/30 transition-colors"
              >
                <div className="w-20 h-20 bg-yellow-400/90 rounded-full flex items-center justify-center text-3xl font-bold mb-4">
                  🔬
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-3">Labs</h3>
                <p className="text-foreground/60 text-sm">
                  Report issues in any of the 15 computer labs
                </p>
              </motion.div>
            </Link>
          </div>
        </div>
      </section>
      
      {/* How to Use Section */}
      <section className="bg-background py-20 px-4 border-t border-foreground/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 text-foreground">
            How to Use Our Website
          </h2>
          <p className="text-foreground/60 text-center mb-16 max-w-2xl mx-auto">
            Follow these simple steps to report and track equipment issues
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { num: '1', title: 'Select Location', desc: 'Choose from 15 classrooms or 15 labs where the equipment issue is located.' },
              { num: '2', title: 'Report Issue', desc: 'Click "Report Issue" and fill out the complaint form with details about the equipment problem.' },
              { num: '3', title: 'Track Status', desc: 'Monitor your complaint status in real-time and receive updates on resolution progress.' },
            ].map((step) => (
              <motion.div
                key={step.num}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center text-center bg-background p-6 rounded-xl border border-foreground/10"
              >
                <div className="w-12 h-12 bg-yellow-400/90 rounded-full flex items-center justify-center text-foreground text-2xl font-bold mb-4">
                  {step.num}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{step.title}</h3>
                <p className="text-foreground/60 text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Use Section */}
      <section className="bg-background py-20 px-4 border-t border-foreground/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 text-foreground">
            Why Use Our System?
          </h2>
          <p className="text-foreground/60 text-center mb-16 max-w-2xl mx-auto">
            Discover the benefits of our smart management platform
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '⚡', title: 'Fast & Efficient', desc: 'Report issues instantly and get quick responses from administrators.' },
              { icon: '📊', title: 'Real-Time Tracking', desc: 'Monitor your query status in real-time. Stay updated on resolution progress.' },
              { icon: '🔒', title: 'Secure & Reliable', desc: 'Your data is protected with secure authentication.' },
              { icon: '💬', title: 'Direct Communication', desc: 'Receive personalized responses from admins.' },
              { icon: '📱', title: 'Easy to Use', desc: 'Simple and intuitive interface. Report issues in just a few clicks.' },
              { icon: '🎯', title: 'Organized System', desc: 'All equipment issues are categorized by location and type.' },
            ].map((feature) => (
              <motion.div
                key={feature.title}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center text-center p-6 bg-background rounded-xl border border-foreground/10"
              >
                <div className="w-16 h-16 bg-yellow-400/90 rounded-full flex items-center justify-center text-3xl mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-foreground/60 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <MinimalFooter />
    </div>
  );
}
