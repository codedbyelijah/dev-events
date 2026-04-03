import EventCard from "@/components/event-card";
import ExploreBtn from "@/components/explore-btn";
import { IEvent } from "@/database";
import { BASE_URL } from "@/lib/constant";
import { cacheLife } from "next/cache";

export default async function Home() {
  "use cache";
  cacheLife("hours");
  const res = await fetch(`${BASE_URL}/api/events`);
  const { events } = await res.json();
  return (
    <section>
      <h1 className="text-center">
        The Hub for Every Dev <br /> Event You Can&apos;t Miss{" "}
      </h1>
      <p className="text-center mt-5 ">
        Hackathons, Meetups, and Conferences. All in One Place
      </p>
      <ExploreBtn />

      <div className="mt-20 space-y-7">
        <h3>Featured Event</h3>

        <ul className="events">
          {events &&
            events.length > 0 &&
            events.map((event: IEvent) => (
              <li key={event.slug} className="list-none">
                <EventCard {...event} />
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
}
