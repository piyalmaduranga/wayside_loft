import Image from "next/image";
import Link from "next/link";
import { blogPosts } from "../_lib/blogsData";

export const metadata = {
  title: "Blog & Travel Guides | Wayside Loft Mirissa",
  description: "Explore local travel guides, scooter rental tips, arrival assistance, and top things to do in Mirissa, Sri Lanka.",
};

export default function BlogListingPage() {
  const featuredPost = blogPosts[0];
  const otherPosts = blogPosts.slice(1);

  return (
    <div className="bg-[#FAF9F5] min-h-screen pb-20">
      
      {/* Hero Section */}
      <section className="relative w-full py-20 md:py-28 bg-[#0E0D0B] text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-25">
          <Image
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80"
            alt="Mirissa Travel Journal Wayside Loft"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E0D0B] via-[#0E0D0B]/70 to-transparent z-0"></div>

        <div className="container max-w-6xl mx-auto px-4 relative z-10 text-center">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C4A87A] block mb-3 font-sans">
            Wayside Loft Journal & Guides
          </span>
          <h1 className="font-serif font-medium text-4xl sm:text-5xl md:text-6xl text-white mb-6 tracking-tight">
            Explore Mirissa & Beyond
          </h1>
          <p className="text-white/80 font-sans font-light text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Insider travel tips, coastal scooter routes, arrival concierge assistance, and curated Sri Lankan experiences.
          </p>
        </div>
      </section>

      <div className="container max-w-6xl mx-auto px-4 pt-16 space-y-16">

        {/* Featured Post Card */}
        {featuredPost && (
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-black/5 grid grid-cols-1 lg:grid-cols-12 group transition-all duration-300 hover:shadow-md">
            <div className="lg:col-span-7 relative min-h-[300px] sm:min-h-[380px] overflow-hidden">
              <Image
                src={featuredPost.coverImage}
                alt={featuredPost.imageAlt}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-[#1A1815] text-[#C4A87A] text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full font-sans shadow-sm">
                  Featured Guide
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-xs font-sans text-[#6C6760]">
                  <span className="text-[#C4A87A] font-semibold uppercase tracking-wider">{featuredPost.category}</span>
                  <span>•</span>
                  <span>{featuredPost.readTime}</span>
                </div>
                
                <h2 className="font-serif font-medium text-2xl sm:text-3xl text-[#1A1815] leading-snug group-hover:text-[#C4A87A] transition-colors duration-200">
                  <Link href={`/blog/${featuredPost.slug}`}>
                    {featuredPost.title}
                  </Link>
                </h2>

                <p className="text-[#6C6760] font-sans text-sm leading-relaxed line-clamp-3">
                  {featuredPost.excerpt}
                </p>
              </div>

              <div className="pt-4 border-t border-black/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={featuredPost.author.avatar}
                    alt={featuredPost.author.name}
                    className="w-9 h-9 rounded-full object-cover border border-[#C4A87A]/30"
                  />
                  <div>
                    <p className="text-xs font-medium text-[#1A1815] font-sans">{featuredPost.author.name}</p>
                    <p className="text-[10px] text-[#6C6760] font-sans">{featuredPost.date}</p>
                  </div>
                </div>

                <Link
                  href={`/blog/${featuredPost.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C4A87A] hover:text-[#A8895E] font-sans transition-all group-hover:translate-x-1"
                >
                  <span>Read Article</span>
                  <span>➔</span>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Other Posts Grid */}
        <div className="space-y-8">
          <div className="flex items-center justify-between border-b border-black/5 pb-4">
            <h2 className="font-serif font-medium text-2xl text-[#1A1815]">Latest Articles & Travel Guides</h2>
            <span className="text-xs text-[#6C6760] font-sans">{otherPosts.length + 1} Articles</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherPosts.map((post) => (
              <article
                key={post.slug}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-black/5 flex flex-col group transition-all duration-300 hover:shadow-md"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.coverImage}
                    alt={post.imageAlt}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-[#1A1815]/90 backdrop-blur-sm text-[#C4A87A] text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full font-sans">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-[11px] font-sans text-[#6C6760]">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h3 className="font-serif font-medium text-xl text-[#1A1815] leading-snug group-hover:text-[#C4A87A] transition-colors duration-200">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>

                    <p className="text-[#6C6760] font-sans text-xs sm:text-sm leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-black/5 flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-7 h-7 rounded-full object-cover border border-[#C4A87A]/30"
                      />
                      <span className="text-xs text-[#1A1815] font-sans font-medium">{post.author.name}</span>
                    </div>

                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-xs font-bold uppercase tracking-wider text-[#C4A87A] hover:text-[#A8895E] font-sans transition-all group-hover:translate-x-1"
                    >
                      Read ➔
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Featured Service Recommendation Banner */}
        <div className="bg-[#0E0D0B] text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-2xl space-y-6">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C4A87A] font-sans block">
              Experience Mirissa Effortlessly
            </span>
            <h3 className="font-serif text-3xl sm:text-4xl text-white font-medium leading-tight">
              Ready to Explore Mirissa on Two Wheels or Need Arrival Assistance?
            </h3>
            <p className="text-white/80 font-sans text-sm sm:text-base leading-relaxed">
              Rent a modern automatic scooter for just 2,500 LKR/day with free hotel delivery, or request our dedicated Reach Service for airport & station pickups.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/services/scooter-rental"
                className="px-6 py-3.5 bg-[#C4A87A] hover:bg-[#A8895E] text-white font-sans text-xs font-bold uppercase tracking-wider rounded-full transition-all shadow-md"
              >
                Scooter Rental (2,500 LKR)
              </Link>
              <Link
                href="/reach-service"
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-sans text-xs font-bold uppercase tracking-wider rounded-full transition-all"
              >
                Explore Reach Service
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
