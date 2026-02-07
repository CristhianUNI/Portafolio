import React, { useMemo, useState } from "react";
import { content } from "./content";

const DEFAULT_EMAIL = "cristhianaguirre75@gmail.com";

const normalizeSkillItem = (item) =>
  typeof item === "string" ? { label: item } : item;

const resolveAssetUrl = (path) => {
  if (!path) return path;
  if (/^(https?:)?\/\//.test(path) || path.startsWith("data:")) return path;
  const normalizedPath = path.startsWith("/") ? path.slice(1) : path;
  return `${import.meta.env.BASE_URL}${normalizedPath}`;
};

const toPercent = (value, maxValue) =>
  Math.round((value / maxValue) * 100);

const detectLanguage = () => {
  if (typeof window === "undefined") return "en";
  const saved = window.localStorage.getItem("portfolio-language");
  if (saved === "en" || saved === "es") return saved;
  const browser = navigator.language.toLowerCase();
  return browser.startsWith("es") ? "es" : "en";
};

export default function App() {
  const [language, setLanguage] = useState(detectLanguage);
  const [activeSkillIndex, setActiveSkillIndex] = useState(0);
  const copy = useMemo(() => content[language], [language]);
  const activeAxis =
    copy.skills.radar.axes[activeSkillIndex] ?? copy.skills.radar.axes[0];

  const toggleLanguage = () => {
    const next = language === "en" ? "es" : "en";
    setLanguage(next);
    window.localStorage.setItem("portfolio-language", next);
  };

  return (
    <div className="page">
      <span id="top" className="top-anchor" />
      <header className="site-header">
        <nav className="nav">
          <a href="#skills">{copy.nav.skills}</a>
          <a href="#certifications">{copy.nav.certifications}</a>
          <a href="#stack">{copy.nav.stack}</a>
          <a href="#focus">{copy.nav.focus}</a>
          <a href="#contact">{copy.nav.contact}</a>
        </nav>
        <div className="header-actions">
          {[copy.social.linkedin, copy.social.github].map((item) => (
            <a
              key={item.label}
              className="social-link"
              href={item.url}
              target="_blank"
              rel="noreferrer"
              aria-label={item.label}
            >
              <img src={item.icon} alt="" />
              <span>{item.label}</span>
            </a>
          ))}
          <button className="lang-toggle" onClick={toggleLanguage}>
            {language === "en" ? "ES" : "EN"}
            <span>{copy.languageLabel}</span>
          </button>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-content">
            <p className="eyebrow">{copy.hero.eyebrow}</p>
            {copy.hero.photo && (
              <div className="hero-photo-wrapper">
                <img src={resolveAssetUrl(copy.hero.photo)} alt={copy.hero.photoAlt} loading="lazy" />
              </div>
            )}
            <h1>{copy.hero.name}</h1>
            <h2>{copy.hero.role}</h2>
            <p className="hero-company">
              <span>{copy.hero.companyLabel}</span>
              <strong>{copy.hero.company}</strong>
            </p>
            <p className="hero-intro">{copy.hero.intro}</p>
            <div className="hero-actions">
              <a className="btn primary" href="#skills">
                {copy.hero.ctaPrimary}
              </a>
              <a className="btn ghost" href={`mailto:${DEFAULT_EMAIL}`}>
                {copy.hero.ctaSecondary}
              </a>
            </div>
          </div>
          <div className="hero-card">
            <div className="hero-card-top">
              <span>01</span>
              <span>2026</span>
            </div>
            <h3>{copy.hero.cardTitle}</h3>
            <div className="chip-grid">
              {copy.skills.groups[0].items.slice(0, 5).map((item) => {
                const entry = normalizeSkillItem(item);
                return (
                  <span className="chip" key={entry.label}>
                    {entry.icon && (
                      <img
                        className="chip-icon"
                        src={resolveAssetUrl(entry.icon)}
                        alt={`${entry.label} icon`}
                        loading="lazy"
                      />
                    )}
                    {entry.label}
                  </span>
                );
              })}
            </div>
            <div className="divider" />
            <p className="hero-card-note">{copy.hero.cardNote}</p>
          </div>
        </section>

        <section id="focus" className="focus">
          <div className="section-heading">
            <p className="eyebrow">{copy.nav.focus}</p>
            <h2>{copy.focus.title}</h2>
            <p>{copy.focus.subtitle}</p>
          </div>
          <div className="focus-grid">
            {copy.focus.items.map((item) => (
              <article className="focus-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="skills" className="skills">
          <div className="section-heading">
            <p className="eyebrow">{copy.nav.skills}</p>
            <h2>{copy.skills.title}</h2>
            <p>{copy.skills.subtitle}</p>
            <div className="experience-grid">
              {copy.skills.experience.map((item) => (
                <div className="experience-item" key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
          </div>
          <div className="skills-layout">
            <aside className="levels-card">
              <div className="levels-header">
                <h3>{copy.skills.radar.title}</h3>
                <p>{copy.skills.radar.subtitle}</p>
              </div>
              <div className="levels-list">
                {copy.skills.radar.axes.map((axis, index) => {
                  const percent = toPercent(axis.value, copy.skills.radar.maxValue);
                  return (
                    <button
                      className={`level-card${index === activeSkillIndex ? " active" : ""}`}
                      key={axis.label}
                      onClick={() => setActiveSkillIndex(index)}
                      type="button"
                      style={{ "--level-color": axis.color ?? "#ff7a59" }}
                    >
                      <div
                        className="level-chart"
                        style={{
                          "--level": `${percent}%`,
                          "--level-color": axis.color ?? "#ff7a59"
                        }}
                      >
                        <span>{percent}%</span>
                      </div>
                      <div className="level-meta">
                        <span className="level-label">{axis.label}</span>
                        <strong className="level-value">
                          {axis.value}/{copy.skills.radar.maxValue}
                        </strong>
                      </div>
                    </button>
                  );
                })}
              </div>
            </aside>
            <div className="skills-grid">
              {copy.skills.groups.map((group, index) => {
                const entryAxis = copy.skills.radar.axes[index];
                const isActive = index === activeSkillIndex;
                return (
                  <article
                    className={`skill-card${isActive ? " active" : ""}`}
                    key={group.label}
                    style={isActive && entryAxis?.color ? { "--level-color": entryAxis.color } : {}}
                  >
                    <h3>{group.label}</h3>
                    <div className="chip-grid">
                      {group.items.map((item) => {
                        const entry = normalizeSkillItem(item);
                        return (
                          <span className="chip" key={entry.label}>
                            {entry.icon && (
                              <img
                                className="chip-icon"
                                src={resolveAssetUrl(entry.icon)}
                                alt={`${entry.label} icon`}
                                loading="lazy"
                              />
                            )}
                            {entry.label}
                          </span>
                        );
                      })}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="certifications" className="certifications">
          <div className="section-heading">
            <p className="eyebrow">{copy.nav.certifications}</p>
            <h2>{copy.certifications.title}</h2>
            <p>{copy.certifications.subtitle}</p>
          </div>
          <div className="certifications-grid">
            {copy.certifications.items.map((item) => (
              <article className="cert-card" key={item.title}>
                <div className="cert-badge">
                  <img src={resolveAssetUrl(item.badge)} alt={item.badgeAlt} loading="lazy" />
                </div>
                <div className="cert-details">
                  <h3>{item.title}</h3>
                  <p className="cert-issuer">{item.issuer}</p>
                  <div className="cert-meta">
                    <span>{item.codeLabel}</span>
                    <strong>{item.code}</strong>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="stack" className="stack">
          <div className="section-heading">
            <p className="eyebrow">{copy.nav.stack}</p>
            <h2>{copy.stack.title}</h2>
            <p>{copy.stack.subtitle}</p>
          </div>
          <div className="stack-grid">
            {copy.stack.items.map((item) => (
              <article className="stack-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="contact">
          <div className="contact-card">
            <div>
              <p className="eyebrow">{copy.nav.contact}</p>
              <h2>{copy.contact.title}</h2>
              <p>{copy.contact.subtitle}</p>
            </div>
            <div className="contact-details">
              <div>
                <span>{copy.contact.emailLabel}</span>
                <a href={`mailto:${DEFAULT_EMAIL}`}>{DEFAULT_EMAIL}</a>
              </div>
              <p className="availability">{copy.contact.availability}</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>© 2026 {copy.hero.name}. All rights reserved.</p>
      </footer>
    </div>
  );
}
