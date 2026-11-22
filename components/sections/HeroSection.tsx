import { PERSONAL_INFO } from "@/constants/portfolio";

export function HeroSection() {
  return (
    <section id="about" className="hero">
      <div className="hero-copy">
        <h1 className="hero-name">
          <span className="line">
            <span>{PERSONAL_INFO.firstName}</span>
          </span>{" "}
          <span className="line">
            <span>{PERSONAL_INFO.lastName}</span>
          </span>
        </h1>
        <div className="hero-intro">
          <p className="hero-bio">{PERSONAL_INFO.bio}</p>
          <div className="actions">
            <a className="button button-haldi" href="#projects">
              <span>See my projects</span>
            </a>
            <a className="button button-outline" href="#contact">
              <span>Get in touch</span>
            </a>
          </div>
          <p className="hero-status">Open to opportunities, based in {PERSONAL_INFO.location}</p>
        </div>
      </div>
    </section>
  );
}
