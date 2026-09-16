import { useEffect, useId, useRef, useState } from 'react'
import {
  Link,
  NavLink,
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom'
import { classInterests, freeGroups, navigation, newsletterFolderArchives, newsletters, site } from './data'

const newsletterYears = Object.keys(newsletters).sort((yearA, yearB) => Number(yearB) - Number(yearA))
const latestNewsletterYear = newsletterYears[0]
const latestNewsletter = newsletters[latestNewsletterYear][0]
const latestNewsletterLabel = `${latestNewsletter.month} ${latestNewsletterYear}`

type SeoProps = {
  title: string
  description: string
  path?: string
}

function Seo({ title, description, path = '' }: SeoProps) {
  useEffect(() => {
    const fullTitle = title === site.name ? title : `${title} | ${site.shortName}`
    const canonical = `${site.canonicalUrl}${path}`
    document.title = fullTitle
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', fullTitle)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description)
    document.querySelector('meta[property="og:url"]')?.setAttribute('content', canonical)
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', canonical)
  }, [description, path, title])
  return null
}

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width="20" height="20">
      <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CalendarIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width="24" height="24">
      <rect x="3" y="5" width="18" height="16" rx="2" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M8 3v4M16 3v4M3 10h18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

function PinIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width="24" height="24">
      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="10" r="2.5" fill="currentColor" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width="24" height="24">
      <path d="M7 3H4a1 1 0 0 0-1 1c0 9.4 7.6 17 17 17a1 1 0 0 0 1-1v-3l-4-1-1.5 2c-4.3-1.8-7.7-5.2-9.5-9.5L8 7 7 3Z" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  )
}

function ExternalAction({ href, children, className = 'button' }: { href: string; children: React.ReactNode; className?: string }) {
  if (!href) {
    return (
      <span className={`${className} button--pending`} aria-disabled="true" title="This secure registration link is being connected">
        {children}
        <span className="pending-label">Coming soon</span>
      </span>
    )
  }
  return (
    <a className={className} href={href} target="_blank" rel="noopener noreferrer">
      {children}
      <ArrowIcon />
    </a>
  )
}

function ScrollManager() {
  const location = useLocation()
  useEffect(() => {
    if (location.hash) {
      window.setTimeout(() => document.querySelector(location.hash)?.scrollIntoView(), 0)
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [location.pathname, location.hash])
  return null
}

function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const menuId = useId()

  useEffect(() => setOpen(false), [location.pathname])

  return (
    <header className="site-header">
      <div className="utility-bar">
        <div className="container utility-bar__inner">
          <span>Visitors and beginners are always welcome</span>
          <a href={site.phoneHref}>Call {site.phoneDisplay}</a>
        </div>
      </div>
      <div className="container header-main">
        <Link className="brand" to="/" aria-label={`${site.name} home`}>
          <img src="/images/ocwc-logo.png" alt="" width="72" height="72" />
          <span><strong>Oklahoma City</strong><small>Woodcarvers Club</small></span>
        </Link>
        <button
          className="menu-button"
          type="button"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="menu-icon" aria-hidden="true"><i /><i /><i /></span>
          Menu
        </button>
        <nav id={menuId} className={open ? 'primary-nav primary-nav--open' : 'primary-nav'} aria-label="Primary navigation">
          {navigation.map((item) => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => isActive ? 'active' : undefined} end={item.to === '/'}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <img src="/images/ocwc-logo.png" alt="" width="82" height="82" />
          <div>
            <strong>{site.name}</strong>
            <p>Sharing the art of woodcarving since {site.founded}.</p>
          </div>
        </div>
        <div>
          <h2>Visit a meeting</h2>
          <p>{site.meetingSchedule}</p>
          <a href={site.mapUrl} target="_blank" rel="noopener noreferrer">{site.meetingVenue}</a>
        </div>
        <div>
          <h2>Stay connected</h2>
          <ul className="footer-links">
            <li><Link to="/contact">Contact the club</Link></li>
            <li><a href={site.facebookUrl} target="_blank" rel="noopener noreferrer">OCWC on Facebook</a></li>
            <li><Link to="/privacy">Privacy</Link> <span aria-hidden="true">·</span> <Link to="/accessibility">Accessibility</Link></li>
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} {site.name}</span>
        <span>A volunteer-led 501(c)(3) nonprofit organization</span>
      </div>
    </footer>
  )
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  )
}

function PageHero({ eyebrow, title, intro, image }: { eyebrow: string; title: string; intro: string; image?: { src: string; alt: string } }) {
  return (
    <section className={image ? 'page-hero page-hero--image' : 'page-hero'}>
      <div className="container page-hero__grid">
        <div className="page-hero__content">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="lead">{intro}</p>
        </div>
        {image && <img className="page-hero__image" src={image.src} alt={image.alt} />}
      </div>
    </section>
  )
}

function SectionHeading({ eyebrow, title, intro, center = false }: { eyebrow?: string; title: string; intro?: string; center?: boolean }) {
  return (
    <div className={center ? 'section-heading section-heading--center' : 'section-heading'}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2>{title}</h2>
      {intro && <p>{intro}</p>}
    </div>
  )
}

function CalendarEmbed({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? 'calendar-shell calendar-shell--compact' : 'calendar-shell'}>
      <iframe
        title="Oklahoma City Woodcarvers Club upcoming events calendar"
        src={site.calendarEmbedUrl}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <p className="embed-fallback">
        Having trouble viewing the calendar?{' '}
        <a href={site.calendarPublicUrl} target="_blank" rel="noopener noreferrer">Open the club calendar in a new window</a>.
      </p>
    </div>
  )
}

function NewsletterSignup() {
  const formContainer = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = formContainer.current
    if (!container) return

    const script = document.createElement('script')
    script.async = true
    script.src = site.emailOctopusScriptUrl
    script.dataset.form = site.emailOctopusFormId
    container.replaceChildren(script)

    return () => container.replaceChildren()
  }, [])

  return (
    <section className="newsletter-callout" id="newsletter-signup" aria-labelledby="newsletter-signup-title">
      <div>
        <p className="eyebrow eyebrow--light">Club news, once a month</p>
        <h2 id="newsletter-signup-title">Keep creativity in your inbox</h2>
        <p>Get meeting reminders, class announcements, show information, and the latest OCWC newsletter through EmailOctopus.</p>
      </div>
      <div className="newsletter-signup-form" ref={formContainer} aria-label="Email newsletter signup form">
        <p className="newsletter-form-loading">Loading the signup form…</p>
      </div>
    </section>
  )
}

function HomePage() {
  return (
    <>
      <Seo title={site.name} description="Learn, create, and connect through woodcarving with free carving groups, classes, meetings, and the Artistry in Wood show in Oklahoma City." />
      <section className="home-hero">
        <div className="container home-hero__grid">
          <div className="home-hero__content">
            <p className="eyebrow">Carving community since {site.founded}</p>
            <h1>Learn, create, and connect through woodcarving.</h1>
            <p className="lead">Whether you are holding a carving knife for the first time or have years of experience, there is a seat at the table for you.</p>
            <div className="button-row">
              <Link className="button" to="/classes#free-groups">Find a free carving group <ArrowIcon /></Link>
              <Link className="button button--outline" to="/classes#paid-classes">View paid classes</Link>
            </div>
            <Link className="text-link" to="/membership">Join the club for $24 per household</Link>
          </div>
          <div className="hero-gallery" aria-label="Woodcarving at work">
            <img className="hero-gallery__main" src="/images/club-24.webp" alt="A woodcarver shaping a piece by hand in a workshop" />
            <img className="hero-gallery__accent" src="/images/winner-unusual-wood.webp" alt="A detailed cottage carved into a piece of natural bark" />
            <span className="hero-gallery__caption">Made by hand. Shared in community.</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Welcome to OCWC" title="Woodcarving is better together" intro="The Oklahoma City Woodcarvers Club is a nonprofit community devoted to learning, teaching, and celebrating woodcarving through weekly gatherings, instruction, demonstrations, exhibitions, and fellowship." center />
          <div className="path-grid">
            <article className="path-card path-card--green">
              <span className="path-card__number">01</span>
              <h3>Learn for free</h3>
              <p>Visit a friendly weekly carve-in around the Oklahoma City metro. Beginners are welcome.</p>
              <Link to="/classes#free-groups">Find a location <ArrowIcon /></Link>
            </article>
            <article className="path-card path-card--blue">
              <span className="path-card__number">02</span>
              <h3>Take a class</h3>
              <p>Learn from experienced local and visiting instructors in focused, hands-on sessions.</p>
              <Link to="/classes#paid-classes">Explore classes <ArrowIcon /></Link>
            </article>
            <article className="path-card path-card--gold">
              <span className="path-card__number">03</span>
              <h3>Join the club</h3>
              <p>Household membership is only $24 per year and supports programs across our community.</p>
              <Link to="/membership">Membership details <ArrowIcon /></Link>
            </article>
          </div>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container split-heading">
          <SectionHeading eyebrow="What’s happening" title="Upcoming club events" intro="Meetings, carve-ins, classes, demonstrations, and shows are kept current through the club’s public Google Calendar." />
          <div className="meeting-note">
            <CalendarIcon />
            <p><strong>Monthly club meeting</strong><br />{site.meetingSchedule}</p>
          </div>
        </div>
        <div className="container"><CalendarEmbed compact /></div>
      </section>

      <section className="section show-feature">
        <div className="container show-feature__grid">
          <img src="/images/carvings-collection.webp" alt="A colorful collection of carved animals, holiday figures, and relief artwork" loading="lazy" />
          <div>
            <p className="eyebrow">Our signature annual event</p>
            <h2>Artistry in Wood</h2>
            <p className="lead">A public celebration of the imagination, craftsmanship, and community behind art made from wood.</p>
            <p>The next show is planned for October 2027. Explore the show, exhibit your work, reserve a vendor table, or volunteer.</p>
            <Link className="button" to="/artistry-in-wood">Explore Artistry in Wood <ArrowIcon /></Link>
          </div>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container newsletter-preview">
          <div>
            <p className="eyebrow">From the club</p>
            <h2>Read the latest newsletter</h2>
            <p>Catch up on club news, upcoming programs, member projects, and ways to participate.</p>
          </div>
          <div className="latest-newsletter-card">
            <span>Latest issue</span>
            <strong>{latestNewsletterLabel}</strong>
            <a href={latestNewsletter.url} target="_blank" rel="noopener noreferrer">Read the newsletter PDF <ArrowIcon /></a>
            <Link to="/newsletters">Browse the full archive</Link>
          </div>
        </div>
      </section>

      <div className="container section"><NewsletterSignup /></div>

      <section className="section visit-section">
        <div className="container visit-grid">
          <div>
            <p className="eyebrow">Come say hello</p>
            <h2>Your first meeting is easy</h2>
            <p className="lead">Visitors are always welcome. Bring a project, bring a friend, or simply come see what the club is about.</p>
            <Link className="button" to="/contact">Plan your visit <ArrowIcon /></Link>
          </div>
          <div className="visit-details">
            <div><CalendarIcon /><p><strong>{site.meetingSchedule}</strong><br />Check the calendar for holiday changes.</p></div>
            <div><PinIcon /><p><strong>{site.meetingVenue}</strong><br />{site.meetingAddress}</p></div>
          </div>
        </div>
      </section>
    </>
  )
}

function ClassesPage() {
  return (
    <>
      <Seo title="Woodcarving Groups and Classes" description="Find free weekly carving groups and paid instructor-led woodcarving classes in the Oklahoma City area." path="/classes" />
      <PageHero eyebrow="Learn at your pace" title="Free carving groups and paid classes—all in one place." intro="Start with a friendly weekly carve-in or deepen your skills through an instructor-led class. Beginners and experienced carvers are welcome." image={{ src: '/images/club-17.webp', alt: 'Carving knives, chisels, a saw, and wood shavings arranged on a workbench' }} />

      <section className="section" id="free-groups">
        <div className="container">
          <SectionHeading eyebrow="Always welcoming" title="Free weekly carving groups" intro="Carve-ins are informal gatherings where people work on their own projects, share ideas, and help newer carvers. Schedules can change, so contact the facility before your first visit." />
          <div className="location-grid">
            {freeGroups.map((group) => (
              <article className="location-card" key={group.name}>
                <div className="location-card__icon"><PinIcon /></div>
                <h3>{group.name}</h3>
                <p className="location-card__schedule">{group.schedule}</p>
                <p>{group.address}</p>
                <p className="small-text">{group.note}</p>
                <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(group.address)}`} target="_blank" rel="noopener noreferrer">View map <ArrowIcon /></a>
              </article>
            ))}
          </div>
          <aside className="info-banner">
            <strong>New to carving?</strong>
            <p>Beginner projects are available at many locations. Call ahead to confirm that a volunteer and project materials will be available. Ask about safety equipment before purchasing tools.</p>
          </aside>
        </div>
      </section>

      <section className="section section--tint" id="paid-classes">
        <div className="container class-layout">
          <div>
            <SectionHeading eyebrow="Learn from an instructor" title="Paid classes" intro="Class dates, prices, projects, and registration links are published when an instructor and enough participants are confirmed. Zeffy will handle secure registration and payment." />
            <div className="empty-state">
              <span className="empty-state__mark" aria-hidden="true">✦</span>
              <h3>No paid class is currently open for registration</h3>
              <p>Watch the club calendar and newsletter for the next class announcement. Registration will appear here as soon as details are final.</p>
              <div className="button-row">
                <Link className="button button--small" to="/membership#calendar">View calendar</Link>
                <Link to="/newsletters#newsletter-signup" className="button button--outline button--small">Get class announcements</Link>
              </div>
            </div>
          </div>
          <aside className="interest-panel">
            <h3>Classes may include</h3>
            <ul className="check-list">
              {classInterests.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <p className="small-text">Topics are examples from past and planned club programming, not confirmed current offerings.</p>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container narrow">
          <SectionHeading eyebrow="Before you register" title="How paid classes work" center />
          <div className="steps-grid">
            <div><span>1</span><h3>Review the details</h3><p>Check skill level, dates, location, member price, and any separate wood or roughout cost.</p></div>
            <div><span>2</span><h3>Register through Zeffy</h3><p>Zeffy handles capacity, registration information, and secure payment.</p></div>
            <div><span>3</span><h3>Watch for confirmation</h3><p>Your confirmation will include the latest instructor, supply, and arrival information.</p></div>
          </div>
        </div>
      </section>
    </>
  )
}

function MembershipPage() {
  return (
    <>
      <Seo title="Membership" description="Join or renew an Oklahoma City Woodcarvers Club household membership and see upcoming club events." path="/membership" />
      <PageHero eyebrow="Belong, learn, and share" title="Join the Oklahoma City Woodcarvers Club." intro="For $24 per household each year, membership connects you with fellow carvers and supports instruction, demonstrations, meetings, and the annual Artistry in Wood show." image={{ src: '/images/winner-stylized.webp', alt: 'A polished stylized wooden sculpture displayed on a natural wood base' }} />

      <section className="section">
        <div className="container membership-grid">
          <div>
            <SectionHeading eyebrow="Membership benefits" title="More than a membership card" />
            <ul className="benefit-list">
              <li><strong>Monthly club meetings</strong><span>Programs, demonstrations, show and tell, door prizes, snacks, and fellowship.</span></li>
              <li><strong>Member class pricing</strong><span>Reduced registration prices when a paid class offers member and nonmember rates.</span></li>
              <li><strong>A creative community</strong><span>Meet people who enjoy sharing techniques, resources, encouragement, and ideas.</span></li>
              <li><strong>Support the art</strong><span>Your dues help the club offer programs, exhibits, demonstrations, and community outreach.</span></li>
            </ul>
          </div>
          <aside className="membership-card">
            <p className="eyebrow eyebrow--light">Annual household dues</p>
            <p className="price"><strong>$24</strong><span>per household<br />per year</span></p>
            <p>Apply or renew securely through Zeffy. Any separate contribution Zeffy displays at checkout is optional and may be changed to $0.</p>
            <ExternalAction href={site.zeffyMembershipUrl} className="button button--light button--full">Join or renew online</ExternalAction>
            <p className="fine-print">Prefer paper? Applications may also be turned in at a monthly meeting. Mailing instructions will be added when confirmed.</p>
          </aside>
        </div>
      </section>

      <section className="section section--tint" id="calendar">
        <div className="container">
          <SectionHeading eyebrow="Plan your next visit" title="Upcoming meetings and events" intro="The calendar below is maintained by the club. It is the best place to check meeting dates, holiday changes, classes, demonstrations, and special events." />
          <CalendarEmbed />
        </div>
      </section>

      <div className="container section"><NewsletterSignup /></div>
    </>
  )
}

function ArtistryPage() {
  return (
    <>
      <Seo title="Artistry in Wood" description="Learn about the Oklahoma City Woodcarvers Club Artistry in Wood show, planned for October 2027." path="/artistry-in-wood" />
      <section className="show-hero">
        <div className="container show-hero__grid">
          <div>
            <p className="eyebrow eyebrow--light">Oklahoma City’s celebration of carved art</p>
            <h1>Artistry in Wood</h1>
            <p className="show-year">October 2027</p>
            <p className="lead">See remarkable works of art in wood, meet the makers, watch demonstrations, shop from vendors, and celebrate the creativity of regional carvers.</p>
            <p className="show-detail-note">Exact 2027 dates, hours, venue, and admission details will be announced when confirmed.</p>
          </div>
          <img src="/images/carvings-collection.webp" alt="A display of detailed carved wolves, a floral relief, and colorful holiday figures" />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Be part of the show" title="There is a place for you at Artistry in Wood" center />
          <div className="show-action-grid">
            <article><span>Exhibit</span><h3>Enter your artwork</h3><p>Artists of different ages, experience levels, styles, and subjects are invited to participate. The 2027 entry form and rules will be published here.</p><span className="status-chip">2027 details coming soon</span></article>
            <article><span>Sell</span><h3>Reserve a vendor table</h3><p>Connect with visitors and regional artists. Zeffy will securely collect the vendor application and table payment.</p><ExternalAction href={site.zeffyVendor2027Url} className="text-action">Reserve a table</ExternalAction></article>
            <article><span>Help</span><h3>Volunteer with us</h3><p>Help with setup, hospitality, demonstrations, guest assistance, the raffle table, or cleanup.</p><ExternalAction href={site.zeffyVolunteer2027Url} className="text-action">Choose a volunteer shift</ExternalAction></article>
          </div>
        </div>
      </section>

      <section className="section section--tint">
        <div className="container art-feature-grid">
          <img src="/images/winner-unusual-wood.webp" alt="A small storybook cottage carved into natural bark" loading="lazy" />
          <div>
            <p className="eyebrow">Art in every grain</p>
            <h2>From first carvings to blue-ribbon work</h2>
            <p>Artistry in Wood welcomes a wide range of carving traditions—from birds, wildlife, and caricatures to relief, chip carving, pyrography, holiday work, gourds, and imaginative pieces in unusual woods.</p>
            <p>The show is designed for artists, families, curious beginners, collectors, and anyone who appreciates the patience and imagination behind handcrafted work.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container archive-panel">
          <div>
            <p className="eyebrow">Previous show information</p>
            <h2>2026 documents</h2>
            <p>These documents are preserved for historical reference. They are not the rules or application for the 2027 show.</p>
          </div>
          <div className="document-links">
            <a href={site.showApplication2026} target="_blank" rel="noopener noreferrer">2026 show application <span>PDF</span></a>
            <a href={site.showRules2026} target="_blank" rel="noopener noreferrer">2026 judging rules and categories <span>PDF</span></a>
          </div>
        </div>
      </section>

      <section className="section section--dark">
        <div className="container faq-grid">
          <div><p className="eyebrow eyebrow--light">Questions</p><h2>Planning for 2027</h2></div>
          <div className="faq-list">
            <details><summary>When will table reservations open?</summary><p>The Zeffy application and payment link will appear on this page when the club finalizes 2027 table sizes, pricing, and capacity.</p></details>
            <details><summary>Can beginners enter artwork?</summary><p>Past shows have included novice and youth categories. The official 2027 categories and eligibility rules will be posted before registration opens.</p></details>
            <details><summary>Can I volunteer without being a carver?</summary><p>Yes. Several show jobs focus on hospitality, guest assistance, registration, setup, and cleanup rather than carving.</p></details>
          </div>
        </div>
      </section>
    </>
  )
}

function NewslettersPage() {
  return (
    <>
      <Seo title="Newsletters" description="Read current and past Oklahoma City Woodcarvers Club newsletters and subscribe for club updates." path="/newsletters" />
      <PageHero eyebrow="Club stories and updates" title="The OCWC newsletter archive" intro="Read meeting news, upcoming programs, class information, member projects, carving tips, and ways to get involved." />
      <section className="section">
        <div className="container">
          <article className="featured-issue">
            <div>
              <p className="eyebrow eyebrow--light">Current issue</p>
              <h2>{latestNewsletterLabel}</h2>
              <p>The latest news from the Oklahoma City Woodcarvers Club.</p>
            </div>
            <a className="button button--light" href={latestNewsletter.url} target="_blank" rel="noopener noreferrer">Read current issue <ArrowIcon /></a>
          </article>

          <div className="archive-years">
            {newsletterYears.map((year) => {
              const issues = newsletters[year]
              return (
              <section className="archive-year" key={year} aria-labelledby={`year-${year}`}>
                <h2 id={`year-${year}`}>{year}</h2>
                <div className="issue-grid">
                  {issues.map((issue) => (
                    <a key={`${year}-${issue.month}`} href={issue.url} target="_blank" rel="noopener noreferrer">
                      <span>{issue.month}</span>
                      <small>PDF · {issue.size}</small>
                      <ArrowIcon />
                    </a>
                  ))}
                </div>
              </section>
              )
            })}
          </div>
          <section className="earlier-archives" aria-labelledby="earlier-archive-title">
            <div>
              <h2 id="earlier-archive-title">Earlier newsletter folders</h2>
              <p>Browse every issue currently preserved in the club’s public Google Drive archive.</p>
            </div>
            <div className="archive-folder-links">
              {newsletterFolderArchives.map((archive) => (
                <a key={archive.year} href={archive.url} target="_blank" rel="noopener noreferrer">
                  {archive.year} newsletters <ArrowIcon />
                </a>
              ))}
            </div>
          </section>
        </div>
      </section>
      <div className="container section section--no-top"><NewsletterSignup /></div>
    </>
  )
}

function ShopPage() {
  return (
    <>
      <Seo title="Club Merchandise" description="Find Oklahoma City Woodcarvers Club shirts, caps, and branded merchandise." path="/shop" />
      <PageHero eyebrow="Wear your carving community" title="OCWC shirts, caps, and club merchandise" intro="Show your club pride at meetings, demonstrations, classes, and the annual show." image={{ src: '/images/ocwc-logo.png', alt: 'Oklahoma City Woodcarvers Club round logo' }} />
      <section className="section">
        <div className="container shop-grid">
          <div>
            <SectionHeading eyebrow="Order directly" title="Embroidered shirts and caps" intro="Club-logo embroidery has been available through local providers. Contact the provider before ordering to confirm current products, colors, pricing, taxes, and turnaround time." />
            <div className="provider-card">
              <h3>Inspirations Logos by We R 1 Clothing</h3>
              <p>Ask about shirts and caps embroidered with the OCWC name and logo.</p>
              <a className="button" href="mailto:insp@wer1okc.com">Email the provider <ArrowIcon /></a>
            </div>
          </div>
          <aside className="shop-note">
            <h3>Before ordering</h3>
            <ul className="check-list">
              <li>Confirm current item availability</li>
              <li>Ask about sizes and colors</li>
              <li>Confirm the final price and sales tax</li>
              <li>Ask about pickup or delivery</li>
            </ul>
            <p className="small-text">The provider fulfills these orders directly. The club website does not collect payment or store order information.</p>
          </aside>
        </div>
      </section>
    </>
  )
}

function AboutPage() {
  const years = new Date().getFullYear() - site.founded
  return (
    <>
      <Seo title="About the Club" description="Learn about the history and mission of the Oklahoma City Woodcarvers Club, founded in 1965." path="/about" />
      <PageHero eyebrow={`${years}+ years of craft and community`} title="A welcoming home for Oklahoma woodcarvers." intro="OCWC brings together artists, craftspeople, and hobbyists who enjoy turning raw wood into something meaningful—and helping others learn to do the same." image={{ src: '/images/carvings-collection.webp', alt: 'A group of finished woodcarvings representing several artistic styles' }} />
      <section className="section">
        <div className="container story-grid">
          <div>
            <p className="eyebrow">Our beginning</p>
            <h2>Rooted in teaching and friendship</h2>
          </div>
          <div className="prose">
            <p>The club began in 1965 after Leonard Payne and Nathan Jarnigan met through a community woodcarving class offered at St. Luke’s Methodist Church’s School of Continuing Education.</p>
            <p>With organizer Carl Tanger and founding officers Bob Adkins and Richard Harrison, they formed an independent club that welcomed carvers of all skill levels. OCWC has remained a friendly place to learn, create, and connect ever since.</p>
          </div>
        </div>
      </section>
      <section className="section section--tint">
        <div className="container mission-grid">
          <div className="mission-card"><span>01</span><h3>Promote the art</h3><p>Build interest in and appreciation for woodcarving as a creative art and living tradition.</p></div>
          <div className="mission-card"><span>02</span><h3>Help people learn</h3><p>Share knowledge through demonstrations, instruction, workshops, weekly groups, and mentorship.</p></div>
          <div className="mission-card"><span>03</span><h3>Strengthen community</h3><p>Create welcoming opportunities for exhibitions, social connection, service, and creative growth.</p></div>
        </div>
      </section>
      <section className="section">
        <div className="container story-grid">
          <div><p className="eyebrow">Across Oklahoma</p><h2>Sharing skills beyond the club</h2></div>
          <div className="prose"><p>Across the decades, members have demonstrated and taught woodcarving at fairs, libraries, schools, and arts events throughout the region.</p><p>Past community partners have included Rose State College, the Sam Noble Oklahoma Museum of Natural History, the Oklahoma County library system, and Septemberfest at the Oklahoma State Capitol.</p><div className="button-row"><Link className="button" to="/classes">Learn with us</Link><Link className="button button--outline" to="/membership">Become a member</Link></div></div>
        </div>
      </section>
    </>
  )
}

function ContactPage() {
  return (
    <>
      <Seo title="Contact" description="Contact the Oklahoma City Woodcarvers Club and plan a visit to a monthly meeting." path="/contact" />
      <PageHero eyebrow="We would love to meet you" title="Contact the club" intro="Questions about meetings, classes, membership, demonstrations, or Artistry in Wood? Call us or visit our public Facebook group." />
      <section className="section">
        <div className="container contact-grid">
          <article className="contact-card"><PhoneIcon /><h2>Call the club</h2><a href={site.phoneHref}>{site.phoneDisplay}</a><p>The number spells 572-228-OCWC.</p></article>
          <article className="contact-card"><CalendarIcon /><h2>Visit a meeting</h2><p>{site.meetingSchedule}</p><a href={site.mapUrl} target="_blank" rel="noopener noreferrer">Get directions <ArrowIcon /></a></article>
          <article className="contact-card"><span className="contact-card__f" aria-hidden="true">f</span><h2>Facebook</h2><p>Follow club conversation and announcements.</p><a href={site.facebookUrl} target="_blank" rel="noopener noreferrer">Open the OCWC Facebook group <ArrowIcon /></a></article>
        </div>
        <div className="container narrow contact-location">
          <p className="eyebrow">Meeting location</p>
          <h2>{site.meetingVenue}</h2>
          <p>{site.meetingAddress}</p>
          <p>Visitors are welcome. Check the calendar before traveling, especially around holidays or severe weather.</p>
          <Link className="button" to="/membership#calendar">Check the calendar <ArrowIcon /></Link>
        </div>
      </section>
    </>
  )
}

function PrivacyPage() {
  return (
    <>
      <Seo title="Privacy" description="Privacy information for the Oklahoma City Woodcarvers Club website." path="/privacy" />
      <PageHero eyebrow="Plain-language privacy" title="Your information belongs to you." intro="This website is designed to collect as little personal information as possible." />
      <section className="section"><div className="container legal-copy">
        <h2>Information handled by other services</h2>
        <p>Membership applications, payments, paid class registrations, and vendor reservations are processed by Zeffy. Newsletter subscriptions and email delivery are handled by EmailOctopus. Each service applies its own privacy practices when you choose to use it.</p>
        <h2>Google Calendar and Google Drive</h2>
        <p>The club calendar is displayed through Google Calendar. Newsletters and some historical documents open from Google Drive. Google may receive standard technical information when those services load.</p>
        <h2>What this website stores</h2>
        <p>The first release does not include website accounts, a member directory, custom payment processing, advertising pixels, or a website database. It does not intentionally store membership, payment, class, vendor, or volunteer submissions.</p>
        <h2>Email choices</h2>
        <p>Newsletter emails will include an unsubscribe option managed by EmailOctopus.</p>
        <h2>Questions</h2>
        <p>Call the club at <a href={site.phoneHref}>{site.phoneDisplay}</a> with questions about information connected to club activities.</p>
      </div></section>
    </>
  )
}

function AccessibilityPage() {
  return (
    <>
      <Seo title="Accessibility" description="Accessibility statement for the Oklahoma City Woodcarvers Club website." path="/accessibility" />
      <PageHero eyebrow="A website for everyone" title="Accessibility is part of the design." intro="OCWC wants members, visitors, and prospective carvers of all ages and abilities to be able to use this website." />
      <section className="section"><div className="container legal-copy">
        <h2>Our approach</h2>
        <p>The site uses large readable text, high contrast, generous spacing, clear headings, keyboard-accessible navigation, visible focus styles, descriptive links, reduced-motion support, and alternatives for embedded content.</p>
        <h2>External services</h2>
        <p>Some registration forms, newsletters, and calendar information are provided through Zeffy, EmailOctopus, and Google. If an embedded item is difficult to use, the site provides a link to open it in a separate window.</p>
        <h2>Need help?</h2>
        <p>If you have trouble accessing club information, call <a href={site.phoneHref}>{site.phoneDisplay}</a>. Please tell us which page or task caused trouble and what device or assistive technology you were using.</p>
      </div></section>
    </>
  )
}

function NotFoundPage() {
  return (
    <section className="not-found">
      <Seo title="Page Not Found" description="The requested page could not be found." path="/404" />
      <div className="container narrow">
        <span className="not-found__number">404</span>
        <h1>This page wandered off with the wood chips.</h1>
        <p className="lead">The page may have moved during the website rebuild. Try one of the main sections below.</p>
        <div className="button-row"><Link className="button" to="/">Return home</Link><Link className="button button--outline" to="/contact">Contact the club</Link></div>
      </div>
    </section>
  )
}

function App() {
  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.id = 'organization-schema'
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: site.name,
      alternateName: site.shortName,
      url: site.canonicalUrl,
      logo: `${site.canonicalUrl}/images/ocwc-logo.png`,
      foundingDate: String(site.founded),
      nonprofitStatus: 'Nonprofit501c3',
      telephone: site.phoneDisplay,
      sameAs: [site.facebookUrl],
    })
    document.head.appendChild(script)
    return () => script.remove()
  }, [])

  return (
    <Layout>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/classes" element={<ClassesPage />} />
        <Route path="/learn-to-carve" element={<Navigate to="/classes#free-groups" replace />} />
        <Route path="/events" element={<Navigate to="/membership#calendar" replace />} />
        <Route path="/membership" element={<MembershipPage />} />
        <Route path="/artistry-in-wood" element={<ArtistryPage />} />
        <Route path="/artistry-in-wood/vendors" element={<Navigate to="/artistry-in-wood" replace />} />
        <Route path="/artistry-in-wood/volunteer" element={<Navigate to="/artistry-in-wood" replace />} />
        <Route path="/newsletters" element={<NewslettersPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/accessibility" element={<AccessibilityPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Layout>
  )
}

export default App
