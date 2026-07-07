import { getAllRooms } from "./_lib/supabase/rooms";

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://waysideloft.com";

  // Fetch all rooms from Supabase to index room detail pages
  let rooms = [];
  try {
    rooms = await getAllRooms();
  } catch (err) {
    console.error("Sitemap rooms fetch error:", err);
  }

  const roomUrls = rooms?.map((room) => ({
    url: `${baseUrl}/rooms/${room.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  })) || [];

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/rooms`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    ...roomUrls,
  ];
}
