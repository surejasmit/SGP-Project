import { HeroGeometric } from '@/components/ui/shape-landing-hero';
import { MinimalFooter } from '@/components/ui/minimal-footer';
import { GlowingShadow } from '@/components/ui/glowing-shadow';
import { StarButton } from '@/components/ui/star-button';
import { Link } from '../components/Router';
import { Typewriter } from '@/components/ui/typewriter-text';

export default function LandingPage() {
  return (
    <>
      <HeroGeometric 
        badge="Smart Management System" 
        title1="Smart Classroom &" 
        title2="Lab Management" 
      />
      
      <section className="bg-black py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Link href="/locations">
              <StarButton lightColor="#ffffff" className="h-auto py-4 px-8 text-lg">
                Get Started
              </StarButton>
            </Link>
          </div>

          <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">
            <Typewriter 
              text={["Select Location", "Choose Your Workspace", "Report Equipment Issues"]}
              speed={80}
              deleteSpeed={50}
              delay={2000}
              loop={true}
            />
          </h2>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            Choose your location to report equipment issues
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <Link href="/classrooms">
              <GlowingShadow>
                <div className="flex flex-col items-center text-center p-8 cursor-pointer hover:scale-105 transition-transform">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center text-white text-3xl font-bold mb-4">
                    🏫
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-3">Classrooms</h3>
                  <p className="text-gray-400 text-sm">
                    Report issues in any of the 15 classrooms
                  </p>
                </div>
              </GlowingShadow>
            </Link>
            
            <Link href="/labs">
              <GlowingShadow>
                <div className="flex flex-col items-center text-center p-8 cursor-pointer hover:scale-105 transition-transform">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg flex items-center justify-center text-white text-3xl font-bold mb-4">
                    🔬
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-3">Labs</h3>
                  <p className="text-gray-400 text-sm">
                    Report issues in any of the 15 computer labs
                  </p>
                </div>
              </GlowingShadow>
            </Link>
          </div>
        </div>
      </section>
      
      <section className="bg-black py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">
            How to Use Our Website
          </h2>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            Follow these simple steps to report and track equipment issues
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <GlowingShadow>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg flex items-center justify-center text-white text-2xl font-bold mb-4">
                  1
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Select Location</h3>
                <p className="text-gray-400 text-sm">
                  Choose from 15 classrooms or 15 labs where the equipment issue is located.
                </p>
              </div>
            </GlowingShadow>
            
            <GlowingShadow>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg flex items-center justify-center text-white text-2xl font-bold mb-4">
                  2
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Report Issue</h3>
                <p className="text-gray-400 text-sm">
                  Click "Report Issue" and fill out the complaint form with details about the equipment problem.
                </p>
              </div>
            </GlowingShadow>
            
            <GlowingShadow>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-800 rounded-lg flex items-center justify-center text-white text-2xl font-bold mb-4">
                  3
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Track Status</h3>
                <p className="text-gray-400 text-sm">
                  Monitor your complaint status in real-time and receive updates on resolution progress.
                </p>
              </div>
            </GlowingShadow>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-gray-900 via-black to-gray-900 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Why Use Our System?
          </h2>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            Discover the benefits of our smart management platform
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <GlowingShadow>
              <div className="flex flex-col items-center text-center p-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center text-white text-3xl mb-4">
                  ⚡
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Fast & Efficient</h3>
                <p className="text-gray-400 text-sm">
                  Report issues instantly and get quick responses from administrators. No more waiting in long queues.
                </p>
              </div>
            </GlowingShadow>
            
            <GlowingShadow>
              <div className="flex flex-col items-center text-center p-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center text-white text-3xl mb-4">
                  📊
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Real-Time Tracking</h3>
                <p className="text-gray-400 text-sm">
                  Monitor your query status in real-time. Stay updated on resolution progress and admin responses.
                </p>
              </div>
            </GlowingShadow>
            
            <GlowingShadow>
              <div className="flex flex-col items-center text-center p-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-700 rounded-full flex items-center justify-center text-white text-3xl mb-4">
                  🔒
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Secure & Reliable</h3>
                <p className="text-gray-400 text-sm">
                  Your data is protected with secure authentication. All queries are tracked and stored safely.
                </p>
              </div>
            </GlowingShadow>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-8">
            <GlowingShadow>
              <div className="flex flex-col items-center text-center p-6">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-700 rounded-full flex items-center justify-center text-white text-3xl mb-4">
                  💬
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Direct Communication</h3>
                <p className="text-gray-400 text-sm">
                  Receive personalized responses from admins. Clear communication for better problem resolution.
                </p>
              </div>
            </GlowingShadow>
            
            <GlowingShadow>
              <div className="flex flex-col items-center text-center p-6">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-700 rounded-full flex items-center justify-center text-white text-3xl mb-4">
                  📱
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Easy to Use</h3>
                <p className="text-gray-400 text-sm">
                  Simple and intuitive interface. Report issues in just a few clicks from any device.
                </p>
              </div>
            </GlowingShadow>
            
            <GlowingShadow>
              <div className="flex flex-col items-center text-center p-6">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-cyan-700 rounded-full flex items-center justify-center text-white text-3xl mb-4">
                  🎯
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">Organized System</h3>
                <p className="text-gray-400 text-sm">
                  All equipment issues are categorized by location and type. Easy management for everyone.
                </p>
              </div>
            </GlowingShadow>
          </div>
        </div>
      </section>
      
      <MinimalFooter />
    </>
  );
}
