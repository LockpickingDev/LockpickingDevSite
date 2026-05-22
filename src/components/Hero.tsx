export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <div className="lock-wrapper">
          <svg className="lock-svg" viewBox="0 0 100 130" aria-hidden="true">
            <rect className="lock-body-rect" x="10" y="55" width="80" height="65" rx="6" />
            <path className="lock-shackle-path" d="M 28 55 L 28 34 A 22 22 0 0 1 72 34 L 72 55" />
            <circle cx="50" cy="82" r="10" fill="var(--cyan)" opacity="0.15" />
            <rect x="46" y="82" width="8" height="14" rx="3" fill="var(--cyan)" opacity="0.15" />
            <circle cx="50" cy="82" r="3" fill="var(--cyan)" className="lock-dot" />
          </svg>
        </div>
        <div className="hero-tag">
          <span className="status-dot" />
          ONLINE · ST. LOUIS, MO · TRAVEL AVAILABLE
        </div>
        <h1>
          <span className="cyan">Lockpicking</span>Dev
          <span className="hero-cursor" />
        </h1>
        <p className="hero-subtitle">
          <span className="comment">// </span>
          Gateway Locksport Founder · Security Educator · Event Specialist
        </p>
        <p className="hero-desc">
          Private lessons, corporate team-building, and full lockpicking villages for conferences,
          conventions, and events. Groups of 5 to 500.
        </p>
        <div className="hero-buttons">
          <a href="#contact" className="btn-terminal btn-primary-t">&gt; request_session</a>
          <a href="#services" className="btn-terminal btn-secondary-t">&gt; view_services</a>
        </div>
      </div>
    </section>
  )
}
