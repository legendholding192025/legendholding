export function WhyUs() {
  return (
    <div className="border-t border-gray-100 bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Why Us?</h2>
          <p className="text-base md:text-lg text-gray-600 mb-12">
            We offer more than just a job. Join us and be part of a team that values innovation, growth, and excellence.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              title: "Innovation First",
              description: "Be part of groundbreaking projects and shape the future of mobility.",
              icon: "🚀"
            },
            {
              title: "Growth & Development",
              description: "Continuous learning and career advancement opportunities.",
              icon: "📈"
            },
            {
              title: "Global Impact",
              description: "Make a difference in the global mobility and energy landscape.",
              icon: "🌍"
            },
            {
              title: "Work-Life Balance",
              description: "Flexible work environment that promotes wellness and personal growth.",
              icon: "⭐"
            }
          ].map((value, index) => (
            <div 
              key={index} 
              className="bg-gray-50 p-8 rounded-lg hover:shadow-md transition-shadow"
            >
              <div className="text-3xl mb-4">
                {value.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {value.title}
              </h3>
              <p className="text-base text-gray-600">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 