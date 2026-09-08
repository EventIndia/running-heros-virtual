import VEventCard from "@/components/VEventCard";

export default function VEvents({ events = [] }) {
  return (
    <section id="events" className="vEventsSection">
      <div className="vContainer">
        <div className="vSectionTitleRow">
          <div>
            <h1>Trending Event</h1>
          </div>
          <a href="#events" className="vSectionAction">
            View All
          </a>
        </div>

        {events.length > 0 ? (
          <div className="vEventsGrid">
            {events.map((event, index) => (
              <VEventCard key={event.id || event.slug || index} event={event} />
            ))}
          </div>
        ) : (
          <div className="vEmptyState">
            No virtual events found. Add virtual events in Running Heros CMS/API
            and they will appear here automatically.
          </div>
        )}
      </div>
    </section>
  );
}
