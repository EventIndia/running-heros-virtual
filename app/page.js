import VEvents from "@/components/VEvents";
import VFooter from "@/components/VFooter";
import VHeader from "@/components/VHeader";
import VHero from "@/components/VHero";
import { fetchVirtualBanners, fetchVirtualEvents } from "@/lib/api";

export const dynamic = "force-dynamic";

const MAIN_SITE_URL =
  process.env.NEXT_PUBLIC_MAIN_SITE_URL || "https://runningheros.in";

function getImageUrl(image) {
  if (!image) return "";
  if (Array.isArray(image)) return getImageUrl(image[0]);
  if (typeof image === "object") return image.url || image.src || "";
  return image;
}

function getDistanceLabel(item) {
  const values = [...(item?.distances || []), ...(item?.activity_types || [])];

  return values
    .map((value) =>
      typeof value === "object"
        ? value?.name || value?.label || value?.title || ""
        : value,
    )
    .filter(Boolean)
    .slice(0, 5)
    .join(" | ");
}

function normalizeHref(href, fallback) {
  const rawHref = typeof href === "object" ? href?.url : href;
  const finalHref = rawHref || fallback || "/";

  if (finalHref.startsWith("http://") || finalHref.startsWith("https://")) {
    return finalHref;
  }

  const path = finalHref.startsWith("/") ? finalHref : `/${finalHref}`;
  return `${MAIN_SITE_URL.replace(/\/$/, "")}${path}`;
}

function toHeroSlide(item) {
  const meta = item?.event_meta || {};
  const eventImage = getImageUrl(item?.banner_image) || getImageUrl(item?.image);
  const eventHref = item?.slug ? `/events/${item.slug}` : "/";

  return {
    id: item?.id || item?.slug || item?.name,
    title: meta.title || item?.name || "Virtual Running Event",
    subtitle: meta.subtitle || getDistanceLabel(item),
    date: meta.date || item?.start_date || "",
    location:
      meta.location || item?.venue?.city || item?.location || "Virtual Event",
    href: normalizeHref(meta.href, eventHref),
    image: getImageUrl(meta.image) || eventImage,
    status: item?.sold_out ? "Registration Closed" : "Registration Open",
  };
}

function buildHeroSlides(bannerItems, eventItems) {
  const seen = new Set();

  return [...bannerItems, ...eventItems]
    .map(toHeroSlide)
    .filter((slide) => {
      const key = slide.id || slide.href || slide.image || slide.title;
      if (!key || !slide.image || seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, 3);
}

export default async function HomePage() {
  const [bannerItems, eventItems] = await Promise.all([
    fetchVirtualBanners(3),
    fetchVirtualEvents(24),
  ]);

  const heroSlides = buildHeroSlides(bannerItems, eventItems);

  return (
    <>
      <VHeader />
      <main>
        <VHero slides={heroSlides} />
        <VEvents events={eventItems} />
      </main>
      <VFooter />
    </>
  );
}
