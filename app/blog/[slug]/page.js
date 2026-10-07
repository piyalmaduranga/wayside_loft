import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts } from "../../_lib/blogsData";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return { title: "Article Not Found | Wayside Loft" };

  return {
    title: `${post.title} | Wayside Loft Mirissa Blog`,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  const otherPosts = blogPosts.filter((p) => p.slug !== params.slug).slice(0, 2);

  // Pre-filled WhatsApp link for the recommended service
  const whatsappNumber = "94760087674";
  const whatsappUrl = post.recommendedService?.whatsappText
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(post.recommendedService.whatsappText)}`
    : `https://wa.me/${whatsappNumber}`;

  return (
    <article className="bg-[#FAF9F5] min-h-screen pb-24">
      
      {/* Header Banner */}
      <header className="py-16 md:py-24 bg-[#0E0D0B] text-white">
        <div className="container max-w-4xl mx-auto px-4 text-center space-y-6">
          <div className="flex items-center justify-center gap-3 text-xs font-sans">
            <Link href="/blog" className="text-[#C4A87A] hover:underline uppercase tracking-wider font-bold">
              Journal
            </Link>
            <span className="text-white/40">•</span>
            <span className="text-white/80 uppercase tracking-widest">{post.category}</span>
          </div>

          <h1 className="font-serif font-medium text-3xl sm:text-4xl md:text-5xl text-white leading-tight">
            {post.title}
          </h1>

          <p className="text-white/70 font-sans font-light text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {post.subtitle}
          </p>

          <div className="pt-4 flex items-center justify-center gap-4 border-t border-white/10 max-w-xs mx-auto">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-10 h-10 rounded-full object-cover border border-[#C4A87A]"
            />
            <div className="text-left font-sans">
              <p className="text-xs font-medium text-white">{post.author.name}</p>
              <p className="text-[11px] text-white/60">{post.date} • {post.readTime}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Cover Image */}
      <div className="container max-w-4xl mx-auto px-4 -mt-10 md:-mt-14 relative z-10 mb-12">
        <div className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-xl border border-black/10">
          <Image
            src={post.coverImage}
            alt={post.imageAlt}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Article Content Layout */}
      <div className="container max-w-3xl mx-auto px-4 space-y-12">
        
        {/* Content Blocks */}
        <div className="prose prose-lg max-w-none font-sans text-[#33302B] space-y-8 leading-relaxed">
          {post.content.map((block, idx) => {
            if (block.type === "paragraph") {
              return (
                <p key={idx} className="text-base sm:text-lg text-[#33302B] leading-relaxed font-light">
                  {block.text}
                </p>
              );
            }

            if (block.type === "heading") {
              return (
                <h2 key={idx} className="font-serif font-medium text-2xl sm:text-3xl text-[#1A1815] pt-4 border-b border-black/5 pb-3">
                  {block.text}
                </h2>
              );
            }

            if (block.type === "subheading") {
              return (
                <h3 key={idx} className="font-serif font-medium text-xl text-[#1A1815] pt-2">
                  {block.text}
                </h3>
              );
            }

            if (block.type === "list") {
              return (
                <ul key={idx} className="space-y-3 my-4">
                  {block.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-[#33302B]">
                      <span className="w-5 h-5 rounded-full bg-[#C4A87A]/20 text-[#C4A87A] flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              );
            }

            if (block.type === "image") {
              return (
                <figure key={idx} className="my-8 space-y-3">
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-sm border border-black/5">
                    <Image src={block.url} alt={block.caption || post.title} fill className="object-cover" />
                  </div>
                  {block.caption && (
                    <figcaption className="text-center text-xs text-[#6C6760] font-sans italic">
                      {block.caption}
                    </figcaption>
                  )}
                </figure>
              );
            }

            if (block.type === "callout") {
              return (
                <div key={idx} className="bg-[#FAF3E8] border-l-4 border-[#C4A87A] p-6 rounded-r-2xl my-6 space-y-2">
                  <h4 className="font-sans font-bold text-sm text-[#1A1815] uppercase tracking-wider flex items-center gap-2">
                    <span>💡</span> {block.title}
                  </h4>
                  <p className="font-sans text-xs sm:text-sm text-[#524E48] leading-relaxed">
                    {block.text}
                  </p>
                </div>
              );
            }

            return null;
          })}
        </div>

        {/* Recommended Wayside Loft Service Box */}
        {post.recommendedService && (
          <div className="bg-[#0E0D0B] text-white rounded-3xl p-8 sm:p-10 shadow-xl border border-[#C4A87A]/30 space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C4A87A] font-sans">
                Official Wayside Loft Recommendation
              </span>
              <span className="text-xs font-semibold text-white/80 bg-white/10 px-3 py-1 rounded-full font-sans">
                {post.recommendedService.price}
              </span>
            </div>

            <h3 className="font-serif font-medium text-2xl sm:text-3xl text-white">
              {post.recommendedService.title}
            </h3>

            <ul className="space-y-2.5 font-sans text-xs sm:text-sm text-white/90">
              {post.recommendedService.perks.map((perk, pIdx) => (
                <li key={pIdx} className="flex items-center gap-3">
                  <span className="text-[#C4A87A] font-bold">✓</span>
                  <span>{perk}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <Link
                href={post.recommendedService.link}
                className="w-full sm:w-auto px-8 py-4 bg-[#C4A87A] hover:bg-[#A8895E] text-white font-sans text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 shadow-md text-center"
              >
                {post.recommendedService.ctaText}
              </Link>
              
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-sans text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300 flex items-center justify-center gap-2 shadow-md"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.504-5.724-1.465L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.59 1.966 14.122.942 11.998.942c-5.437 0-9.864 4.371-9.868 9.8.001 1.814.502 3.59 1.451 5.158L2.613 21.33l5.59-1.455c.002-.001.002-.001.044-.021zM17.48 14.65c-.302-.152-1.793-.883-2.073-.984-.282-.102-.487-.152-.692.152-.205.304-.795.984-.974 1.186-.18.203-.36.228-.662.076-1.566-.783-2.584-1.378-3.611-2.148-.82-.618-1.517-1.332-1.929-2.043-.18-.305-.019-.47.132-.621.136-.137.302-.355.454-.533.151-.178.202-.304.302-.508.101-.203.05-.38-.025-.532-.075-.152-.693-1.67-.949-2.28-.25-.6-.525-.52-.722-.53-.186-.01-.399-.01-.612-.01-.213 0-.56.08-.853.406-.293.324-1.12 1.09-1.12 2.659 0 1.57 1.144 3.09 1.304 3.3 1.6 2.1 3.099 3.2 4.979 3.82.912.3 1.81.35 2.47.25.75-.11 2.29-.93 2.61-1.83.32-.9 0-1.67-.1-1.83-.1-.15-.3-.23-.6-.38z" />
                </svg>
                <span>Book via WhatsApp</span>
              </a>
            </div>
          </div>
        )}

        {/* Back to Blog Button */}
        <div className="pt-6 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#6C6760] hover:text-[#C4A87A] font-sans transition-all"
          >
            <span>← Back to all journal articles</span>
          </Link>
        </div>

        {/* Related Articles */}
        {otherPosts.length > 0 && (
          <div className="pt-12 border-t border-black/10 space-y-6">
            <h3 className="font-serif font-medium text-2xl text-[#1A1815]">More from Wayside Loft Journal</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {otherPosts.map((op) => (
                <div key={op.slug} className="bg-white rounded-2xl p-5 border border-black/5 shadow-sm space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#C4A87A] font-sans">
                      {op.category}
                    </span>
                    <h4 className="font-serif font-medium text-lg text-[#1A1815] leading-snug">
                      <Link href={`/blog/${op.slug}`} className="hover:text-[#C4A87A] transition-colors">
                        {op.title}
                      </Link>
                    </h4>
                  </div>
                  <Link
                    href={`/blog/${op.slug}`}
                    className="text-xs font-bold uppercase tracking-wider text-[#C4A87A] font-sans pt-2 block"
                  >
                    Read Article ➔
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </article>
  );
}
