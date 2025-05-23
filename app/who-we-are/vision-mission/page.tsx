import Image from "next/image"
import { Heart, Award, TrendingUp, Users, Zap, Globe } from "lucide-react"
 
export default function VisionMissionValuesPage() {
  return (
    <main className="min-h-screen bg-white relative overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl z-0" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-primary-orange/10 rounded-full blur-3xl z-0" />
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-primary-green/5 rounded-full blur-2xl z-0" />
 
      {/* Vision & Mission Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative">
              <h2 className="text-primary-orange font-medium mb-3 font-effra tracking-wide uppercase text-sm">
                Vision & Mission
              </h2>
              <h3 className="text-3xl md:text-4xl font-bold text-primary mb-6 font-richmond leading-tight">
                Our Vision & Mission
              </h3>
              <div className="h-1 w-24 bg-primary-orange rounded mb-8" />
              <p className="text-gray-700 mb-10 font-effra text-lg leading-relaxed">
                We are committed to transforming industries through innovative solutions and sustainable practices,
                creating value for our clients and communities.
              </p>
 
              <div className="mb-10 bg-primary p-8 rounded-lg border-l-4 border-primary-orange shadow-lg transform transition-all duration-300 hover:translate-x-1">
                <h4 className="text-xl font-bold text-white mb-4 font-richmond">Vision</h4>
                <p className="text-white/90 font-effra leading-relaxed">
                  To seamlessly connect the physical and digital worlds, revolutionizing supply chains with cutting-edge
                  financial technology, and become the global leader in intelligent, data-driven solutions that empower
                  businesses to thrive through efficiency, transparency, and sustainable growth.
                </p>
              </div>
 
              {/* Image positioned between Vision and Mission cards on mobile/tablet */}
              <div className="lg:hidden flex justify-center mb-10">
                <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-primary/10 transform transition-all duration-500 hover:scale-[1.02] max-w-md">
                  <Image
                    src="https://res.cloudinary.com/dosxengut/image/upload/v1746784919/1-1-2_geivzn.jpg"
                    width={800}
                    height={600}
                    alt="Legend team collaboration"
                    className="w-full h-auto object-cover"
                    priority
                  />
                </div>
              </div>
 
              <div className="bg-primary p-8 rounded-lg border-l-4 border-primary-green shadow-lg transform transition-all duration-300 hover:translate-x-1">
                <h4 className="text-xl font-bold text-white mb-4 font-richmond">Mission</h4>
                <p className="text-white/90 font-effra leading-relaxed">
                  We are dedicated to fostering happiness and delivering value, focusing on building a sustainable
                  future. Through innovation, collaboration, and excellence, we strive to create meaningful impact for
                  our clients, partners, and the communities we serve.
                </p>
              </div>
            </div>
          </div>
 
          {/* Image positioned on the right side for desktop */}
          <div className="lg:col-span-6 order-1 lg:order-2 hidden lg:flex justify-center items-center">
            <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-primary/10 transform transition-all duration-500 hover:scale-[1.02]">
              <Image
                src="https://res.cloudinary.com/dosxengut/image/upload/v1746784919/1-1-2_geivzn.jpg"
                width={800}
                height={600}
                alt="Legend team collaboration"
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>
 
      {/* Values Section */}
      <section className="py-20 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto bg-white relative z-10">
        <div className="text-center mb-16">
          <div className="relative inline-block">
            <h2 className="text-primary-orange font-medium mb-3 font-effra tracking-wide uppercase text-sm">
              Our Foundation
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-richmond">Our Values</h3>
            <div className="h-1 w-24 bg-primary-orange rounded mx-auto mb-6" />
          </div>
          <p className="text-gray-700 max-w-3xl mx-auto font-effra text-lg leading-relaxed">
            Our core values form the foundation of everything we do, guiding our decisions and actions as we work
            towards our vision and mission.
          </p>
        </div>
 
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <Heart className="w-8 h-8 text-primary-orange" />,
              letter: "L",
              title: "Loyalty",
              desc: "Commitment to our stakeholders and partners, building lasting relationships based on trust and mutual respect.",
            },
            {
              icon: <Award className="w-8 h-8 text-primary-orange" />,
              letter: "E",
              title: "Excellence",
              desc: "Striving for the highest standards in all we do, continuously improving and delivering exceptional results.",
            },
            {
              icon: <TrendingUp className="w-8 h-8 text-primary-green" />,
              letter: "G",
              title: "Growth",
              desc: "Continuous improvement and sustainable development, fostering innovation and embracing new opportunities.",
            },
            {
              icon: <Users className="w-8 h-8 text-primary" />,
              letter: "E",
              title: "Empathy",
              desc: "Understanding and addressing the needs of others, creating solutions that truly make a difference.",
            },
            {
              icon: <Zap className="w-8 h-8 text-primary-orange" />,
              letter: "N",
              title: "Nimble",
              desc: "Agility and adaptability in a changing world, responding quickly to new challenges and opportunities.",
            },
            {
              icon: <Globe className="w-8 h-8 text-primary" />,
              letter: "D",
              title: "Diversity",
              desc: "Embracing different perspectives and backgrounds, fostering an inclusive environment for innovation.",
            },
          ].map((v, index) => (
            <div
              key={v.title}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-b-4 border-primary-orange group hover:scale-[1.03]"
            >
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 flex items-center justify-center bg-secondary-pantone7528 rounded-full p-3 group-hover:bg-primary-orange/10 transition-colors duration-300 mr-4">
                  {v.icon}
                </div>
                <span className="text-4xl font-bold text-primary-orange/20 font-richmond">{v.letter}</span>
              </div>
              <h4 className="text-xl font-bold text-primary mb-4 font-richmond">{v.title}</h4>
              <p className="text-gray-700 font-effra leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}