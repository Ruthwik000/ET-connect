import { ArrowUpRight, ArrowRight, Play } from 'lucide-react';

const ResponsiveHeroBanner = ({
  logoUrl,
  logoText = "ImpactFlow",
  backgroundImageUrl = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&h=1080&fit=crop",
  navLinks = [
    { label: "Home", href: "#", isActive: true },
    { label: "Features", href: "#features" },
    { label: "About", href: "#about" }
  ],
  showAuthLinks = false,
  onLoginClick,
  onSignupClick,
  ctaButtonText = "Get Started",
  ctaButtonHref = "#",
  onCtaClick,
  badgeLabel = "New",
  badgeText = "First Commercial Flight to Mars 2026",
  title = "Journey Beyond Earth",
  titleLine2 = "Into the Cosmos",
  description = "Experience the cosmos like never before. Our advanced spacecraft and cutting-edge technology make interplanetary travel accessible, safe, and unforgettable.",
  primaryButtonText = "Book Your Journey",
  primaryButtonHref = "#",
  onPrimaryClick,
  secondaryButtonText = "Watch Launch",
  secondaryButtonHref = "#"
}) => {
  return (
    <section className="w-full isolate min-h-screen overflow-hidden relative">
      <img
        src={backgroundImageUrl}
        alt=""
        className="w-full h-full object-cover absolute top-0 right-0 bottom-0 left-0"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />

      <header className="z-10 xl:top-4 relative">
        <div className="mx-6">
          <div className="flex items-center justify-between pt-4">
            {logoUrl ? (
              <a
                href="#"
                className="inline-flex items-center justify-center bg-center w-[100px] h-[40px] bg-cover rounded"
                style={{ backgroundImage: `url(${logoUrl})` }}
              />
            ) : (
              <a href="#" className="text-xl sm:text-2xl font-serif font-bold text-white tracking-wide">
                {logoText}
              </a>
            )}

            <nav className="flex items-center gap-2 sm:gap-3">
              {navLinks.length > 0 && (
                <div className="hidden md:flex items-center gap-1 rounded-full bg-white/5 px-1 py-1 ring-1 ring-white/10 backdrop-blur">
                  {navLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      className={`px-3 py-2 text-sm font-medium hover:text-white transition-colors ${
                        link.isActive ? 'text-white/90' : 'text-white/80'
                      }`}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
              
              {showAuthLinks && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={onLoginClick}
                    className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-white/90 hover:text-white transition-colors"
                  >
                    Login
                  </button>
                  <button
                    onClick={onSignupClick}
                    className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-white px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-neutral-900 hover:bg-white/90 transition-colors"
                  >
                    Sign Up
                    <ArrowUpRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </button>
                </div>
              )}
              
              {!showAuthLinks && (
                <a
                  href={ctaButtonHref}
                  onClick={(e) => {
                    if (onCtaClick) {
                      e.preventDefault();
                      onCtaClick();
                    }
                  }}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-white/90 transition-colors"
                >
                  {ctaButtonText}
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              )}
            </nav>
          </div>
        </div>
      </header>

      <div className="z-10 relative">
        <div className="sm:pt-28 md:pt-32 lg:pt-40 max-w-7xl mx-auto pt-20 px-4 pb-12 sm:px-6 sm:pb-16">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 sm:mb-6 inline-flex items-center gap-2 sm:gap-3 rounded-full bg-white/10 px-2 sm:px-2.5 py-1.5 sm:py-2 ring-1 ring-white/15 backdrop-blur animate-fade-slide-in-1">
              <span className="inline-flex items-center text-[10px] sm:text-xs font-medium text-neutral-900 bg-white/90 rounded-full py-0.5 px-1.5 sm:px-2">
                {badgeLabel}
              </span>
              <span className="text-xs sm:text-sm font-medium text-white/90 pr-1">
                {badgeText}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight text-white tracking-tight font-serif font-normal animate-fade-slide-in-2">
              {title}
              <br className="hidden sm:block" />
              {titleLine2}
            </h1>

            <p className="text-sm sm:text-lg animate-fade-slide-in-3 text-white/80 max-w-2xl mt-4 sm:mt-6 mx-auto px-2">
              {description}
            </p>

            <div className="flex flex-row gap-2 sm:gap-4 mt-6 sm:mt-10 items-center justify-center animate-fade-slide-in-4 px-2">
              <a
                href={primaryButtonHref}
                onClick={(e) => {
                  if (onPrimaryClick) {
                    e.preventDefault();
                    onPrimaryClick();
                  }
                }}
                className="inline-flex items-center gap-1.5 sm:gap-2 hover:bg-white/15 text-xs sm:text-sm font-medium text-white bg-white/10 ring-white/15 ring-1 rounded-full py-2.5 sm:py-3 px-4 sm:px-5 transition-colors whitespace-nowrap"
              >
                <span className="hidden xs:inline">{primaryButtonText}</span>
                <span className="xs:hidden">Get Started</span>
                <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </a>
              <a
                href={secondaryButtonHref}
                className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-transparent px-4 sm:px-5 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-white/90 hover:text-white transition-colors whitespace-nowrap"
              >
                {secondaryButtonText}
                <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResponsiveHeroBanner;
