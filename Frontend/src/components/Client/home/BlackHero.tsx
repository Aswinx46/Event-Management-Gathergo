const BlackHero = () => {
    return (
      <div className="h-1/2 mt-52 bg-black text-white">
        <main className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-slide-down">
              Welcome to <span className="text-cyan-400">BRAND</span>X
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 animate-slide-up">
              The best place to showcase your creativity
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors duration-300">
                Get Started
              </button>
              <button className="px-8 py-3 border border-white font-semibold rounded-lg hover:bg-white/10 transition-colors duration-300">
                Learn More
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  };
  
  export default BlackHero;