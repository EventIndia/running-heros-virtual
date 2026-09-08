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

function getDistance(event) {
  const values = [...(event?.distances || []), ...(event?.activity_types || [])];
  const label = values
    .map((value) =>
      typeof value === "object"
        ? value?.name || value?.label || value?.title || ""
        : value,
    )
    .filter(Boolean)
    .slice(0, 3)
    .join(" | ");

  return label || "Virtual Run";
}

export default function VEventCard({ event }) {
  const image = getImageUrl(event?.image) || getImageUrl(event?.banner_image);
  const href = event?.slug
    ? `${MAIN_SITE_URL.replace(/\/$/, "")}/events/${event.slug}`
    : `${MAIN_SITE_URL.replace(/\/$/, "")}/events`;

  return (
    <article className="vEventCard">
      <a href={href} className="vEventImageWrap">
        {image ? (
          <img src={image} alt={event?.name || "Virtual running event"} />
        ) : (
          <div className="vEventImageFallback" />
        )}
        <span>{event?.sold_out ? "Closed" : "Open"}</span>
      </a>

      <div className="vEventBody">
        <p className="vEventDistance">{getDistance(event)}</p>
        <h2>{event?.name || "Virtual Running Event"}</h2>
        <p className="vEventMeta">
          {formatDate(event?.start_date)} |{" "}
          {event?.venue?.city || event?.location || "Run anywhere"}
        </p>
        <div className="vEventFooter">
          <strong>{getPrice(event)}</strong>
          <a href={href}>Register</a>
        </div>
      </div>
    </article>
  );
}
