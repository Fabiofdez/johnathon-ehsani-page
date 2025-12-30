import { localFetch } from "@/util/fetch";
import { Personal } from "@/util/info";
import { IconArrowRight, IconExternalLink, IconPdf } from "@tabler/icons-react";
import Image from "next/image";

function parseReadableLink(md: string) {
  const [_, title, href] = md.match(/\[(.*)\]\((.*)\)/) || [];
  const { host } = new URL(href);

  return { title, href, host };
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
          <h2 className="max-sm:justify-self-center">About Me</h2>

          <p>{AboutMe}</p>

          <a className="main-cta max-sm:mx-auto" href="/contact">
            Get in Touch
            <IconArrowRight />
          </a>
        </div>
      </section>

      <section className="papers-events">
        <div className="text-col links">
          <h2>Selected Papers</h2>

          {PaperLinks.map((link, idx) => (
            <p key={idx} className="link">
              <a href={link.href}>
                <b id="paper-title">
                  {link.title}
                  {link.href?.endsWith(".pdf") && (
                    <IconPdf className="pdf-link" />
                  )}
                </b>
                <br />
                <i id="paper-host">{link.host}</i>
              </a>
            </p>
          ))}
        </div>

        <div className="text-col events">
          <h2 className="with-sep centered">Upcoming Events</h2>

          {UpcomingEvents.map((event, idx) => (
            <p key={idx} className="event">
              <i id="event-date">{event.date}: </i>
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
                <b id="product-title">{link.title}</b>
                <br />
                <i id="product-host">{link.host}</i>
              </a>
            </p>
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
