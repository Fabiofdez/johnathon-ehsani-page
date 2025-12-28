import { localFetch } from "@/util/fetch";
import { Personal } from "@/util/info";
import Image from "next/image";

function parseReadableLink(mdString: string) {
  const [_, title, href] = mdString.match(/\[(.*)\]\((.*)\)/) || [];

  return {
    title,
    href,
    domain: new URL(href).host,
  };
}

function isNonEmpty(str: string) {
  return /[^\s]/.test(str);
}

const Home = () => {
  const AboutMe = localFetch("/txt/about-me.md");

  const PaperLinks = localFetch("/txt/paper-links.md")
    .split("\n")
    .filter(isNonEmpty)
    .map((link) => parseReadableLink(link.trim()));

  const UpcomingEvents = localFetch("/txt/upcoming-events.md")
    .split("\n")
    .filter(isNonEmpty)
    .map((event) => event.trim().split(":"))
    .map(([date, ...eventInfo]) => ({ date, info: eventInfo.join(":") }));

  const ResearchProducts = localFetch("/txt/research-products.md")
    .split("\n")
    .filter(isNonEmpty)
    .map((link) => parseReadableLink(link.trim()));

  return (
    <>
      <section className="about-me">
        <div className="self-photo">
          <Image
            src="/jpehsani-headshot.jpg"
            alt={`Photo of ${Personal.name}`}
            width={3024}
            height={3024}
            priority
          />
        </div>

        <div className="text-col">
          <h2>About Me</h2>

          <p>{AboutMe}</p>

          {/* <a className="main-cta" href="/contact">
            Get in Touch
          </a> */}
        </div>
      </section>

      <section className="papers-events">
        <div className="text-col links">
          <h2>Selected Papers</h2>

          {PaperLinks.map((link, idx) => (
            <p className="link" key={idx}>
              <a href={link.href}>
                <b>{link.title}</b>
                <br />
                <i>{link.domain}</i>
              </a>
            </p>
          ))}
        </div>

        <div className="text-col events">
          <h2 className="with-sep centered">Upcoming Events</h2>

          {UpcomingEvents.map((event, idx) => (
            <p key={idx}>
              <i>{event.date}: </i>
              {event.info}
            </p>
          ))}
        </div>
      </section>

      <section className="products">
        <div className="text-col links">
          <h2 className="with-sep">Research Products</h2>

          {ResearchProducts.map((link, idx) => (
            <p className="link" key={idx}>
              <a href={link.href}>
                <b>{link.title}</b>
                <br />
                <i>{link.domain}</i>
              </a>
            </p>
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
