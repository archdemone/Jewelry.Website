import Link from 'next/link';

const HeroSection = () => {
  return (
    <section className="relative h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden">
      <img
        src="/images/home/header1.jpg"
        alt="Handcrafted jewelry collection showcase"
        className="h-full w-full object-cover"
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
      
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-white px-4">
        <h1 className="mb-4 font-serif text-4xl font-bold md:text-6xl lg:text-7xl drop-shadow-lg">
          Timeless Craftsmanship, Unforgettable Moments
        </h1>
        <p className="mb-8 max-w-2xl text-lg md:text-xl drop-shadow-md">
          Discover handcrafted rings where passion meets precision, designed to celebrate your unique story.
        </p>
        <Link href="/products" passHref>
          <button className="rounded-full bg-gold-600 px-8 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:bg-gold-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gold-500 focus:ring-offset-2">
            Explore Collections
          </button>
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
