export default function HeroSection() {
  return (
    <section
      className="relative w-full h-screen flex items-center justify-center text-center px-4 py-16 md:py-0"
      style={{
        backgroundImage: "url('https://res.cloudinary.com/dosxengut/image/upload/v1748416201/Asset_4_bp4k9t.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="relative z-10 max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6">
          <span className="text-orange-400 block mb-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">Welcome to</span>
          <span className="text-white">Legend Holding Group</span>
        </h1>
        <p className="text-orange-300 text-base sm:text-lg md:text-xl lg:text-2xl font-medium tracking-wider">
          We are the future
        </p>
      </div>
    </section>
  )
}
