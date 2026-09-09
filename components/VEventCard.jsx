const MAIN_SITE_URL =
  process.env.NEXT_PUBLIC_MAIN_SITE_URL || "https://runningheros.in";

function getImageUrl(image) {
  if (!image) return "";
  if (Array.isArray(image)) return getImageUrl(image[0]);
  if (typeof image === "object") return image.url || image.src || "";
  return image;
}

function formatDate(value) {
  if (!value) return "Date to be announced";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function getPrice(event) {
  const price =
    event?.min_ticket_price ||
    event?.ticket_price ||
    event?.price ||
    event?.starting_price;

  return price ? `From Rs. ${price}` : "Register now";
}

function getCategory(event) {
  return (
    event?.category?.name ||
    event?.event_category?.name ||
    event?.category ||
    "Marathons"
  );
}

function getLocation(event) {
  return event?.venue?.city || event?.location || "Run anywhere";
}

export default function VEventCard({ event }) {
  const image = getImageUrl(event?.image) || getImageUrl(event?.banner_image);
  const href = event?.slug
    ? `${MAIN_SITE_URL.replace(/\/$/, "")}/events/${event.slug}`
    : `${MAIN_SITE_URL.replace(/\/$/, "")}/events`;
  const bookingHref = event?.slug
    ? `${MAIN_SITE_URL.replace(/\/$/, "")}/events/${event.slug}/book`
    : href;

  return (
    <article className="vEventCard">
      <div className="vEventImageWrap">
        <a href={href} className="vEventImageLink">
          {image ? (
            <img src={image} alt={event?.name || "Virtual running event"} />
          ) : (
            <div className="vEventImageFallback" />
          )}
        </a>
        <span>{getCategory(event)}</span>
        <button type="button" className="vEventShare" aria-label="Share event">
          <svg aria-hidden="true" viewBox="0 0 24 24">
            <path
              d="M18 8a3 3 0 1 0-2.83-4H15a3 3 0 0 0 .17 1l-6.34 3.17a3 3 0 1 0 0 3.66L15.17 15A3 3 0 1 0 14 17.33l-6.34-3.17A3 3 0 0 0 8 13a3 3 0 0 0-.34-1.39l6.32-3.16A3 3 0 0 0 18 8Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>

      <div className="vEventBody">
        <h2>{event?.name || "Virtual Running Event"}</h2>
        <p className="vEventMeta vEventDate">{formatDate(event?.start_date)}</p>
        <p className="vEventMeta vEventLocation">{getLocation(event)}</p>
        <p className="vEventPrice">{getPrice(event)}</p>
        <div className="vEventFooter">
          <a href={href} className="vInfoButton">
            View Info
          </a>
          <a href={bookingHref} className="vBookButton">
            Book Now
          </a>
        </div>
      </div>
    </article>
  );
}
