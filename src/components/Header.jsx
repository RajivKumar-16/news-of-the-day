function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <a href="/" className="brand">
          <img
            src="/logo.png"
            alt="News of the Day"
            className="brand-logo"
          />

          <span className="brand-name">
            NEWS OF THE DAY
          </span>
        </a>

        <div className="header-right">
          <span className="header-date">
            {new Date().toLocaleDateString(
              "en-IN",
              {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              }
            )}
          </span>
        </div>
      </div>
    </header>
  );
}

export default Header;