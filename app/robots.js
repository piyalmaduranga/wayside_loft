export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://waysideloft.com";
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/account/", "/reservations/"],
      },
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "Google-Extended",
          "Anthropic-AI",
          "Claude-Web",
          "PerplexityBot",
          "cohere-ai"
        ],
        allow: "/",
        disallow: ["/api/", "/account/", "/reservations/"],
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
