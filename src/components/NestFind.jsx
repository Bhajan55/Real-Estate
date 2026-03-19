import { useState, useEffect, useRef } from "react";

const ACCENT = "#00d4aa";
const DARK = "#08080f";
const LIGHT = "#e4e4e8";

const properties = [
  { id: 1, title: "Skyline Penthouse", type: "Sale", category: "Flat", beds: 3, baths: 2, area: "1,850 sqft", price: "₹1.2 Cr", location: "Connaught Place, Delhi", tag: "Premium", img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=80" },
  { id: 2, title: "Urban Studio Loft", type: "Rent", category: "Flat", beds: 1, baths: 1, area: "650 sqft", price: "₹25,000/mo", location: "Koramangala, Bangalore", tag: "New", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80" },
  { id: 3, title: "Green Valley Villa", type: "Sale", category: "House", beds: 4, baths: 3, area: "3,200 sqft", price: "₹2.8 Cr", location: "Jubilee Hills, Hyderabad", tag: "Featured", img: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=600&q=80" },
  { id: 4, title: "Sunrise PG for Women", type: "PG", category: "PG", beds: 1, baths: 1, area: "120 sqft", price: "₹8,500/mo", location: "Hinjewadi, Pune", tag: "Popular", img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80" },
  { id: 5, title: "Heritage Row House", type: "Sale", category: "House", beds: 3, baths: 2, area: "2,100 sqft", price: "₹95 L", location: "Salt Lake, Kolkata", tag: "", img: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=600&q=80" },
  { id: 6, title: "Metro Edge Apartment", type: "Rent", category: "Flat", beds: 2, baths: 2, area: "1,100 sqft", price: "₹35,000/mo", location: "Andheri West, Mumbai", tag: "Hot", img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80" },
];

const filters = ["All", "Rent", "Sale", "PG"];

// ─── Icons (inline SVGs) ────────────────────────────
const IconBed = () => <svg width="16" height="16" fill="none" stroke={LIGHT} strokeWidth="1.5" viewBox="0 0 24 24"><path d="M3 7v11m0-4h18m0 0V7a2 2 0 00-2-2H5a2 2 0 00-2 2v7m18 0v4M3 18h18"/></svg>;
const IconBath = () => <svg width="16" height="16" fill="none" stroke={LIGHT} strokeWidth="1.5" viewBox="0 0 24 24"><path d="M4 12h16a1 1 0 011 1v3a4 4 0 01-4 4H7a4 4 0 01-4-4v-3a1 1 0 011-1zm3-6v6m0-6a2 2 0 012-2h1"/></svg>;
const IconArea = () => <svg width="16" height="16" fill="none" stroke={LIGHT} strokeWidth="1.5" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 3v18"/></svg>;
const IconLocation = () => <svg width="14" height="14" fill={ACCENT} viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z"/></svg>;
const IconClose = () => <svg width="24" height="24" fill="none" stroke={LIGHT} strokeWidth="2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>;
const IconArrow = () => <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14m-7-7l7 7-7 7"/></svg>;
const IconPhone = () => <svg width="18" height="18" fill="none" stroke={ACCENT} strokeWidth="1.5" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2A19.86 19.86 0 013.09 5.18 2 2 0 015.11 3h3a2 2 0 012 1.72c.13.81.36 1.6.68 2.34a2 2 0 01-.45 2.11L8.09 11.5a16 16 0 006.41 6.41l2.33-2.25a2 2 0 012.11-.45c.74.32 1.53.55 2.34.68a2 2 0 011.72 2.03z"/></svg>;
const IconMail = () => <svg width="18" height="18" fill="none" stroke={ACCENT} strokeWidth="1.5" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4l-10 8L2 4"/></svg>;
const IconMapPin = () => <svg width="18" height="18" fill="none" stroke={ACCENT} strokeWidth="1.5" viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1118 0z"/><circle cx="12" cy="10" r="3"/></svg>;

// ─── Animated section wrapper ───────────────────────
function FadeIn({ children, delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(36px)", transition: `opacity 0.7s ${delay}s cubic-bezier(.16,1,.3,1), transform 0.7s ${delay}s cubic-bezier(.16,1,.3,1)` }}>
      {children}
    </div>
  );
}

// ─── Property Card ──────────────────────────────────
function PropertyCard({ p, onClick, idx }) {
  return (
    <FadeIn delay={idx * 0.08}>
      <div onClick={() => onClick(p)} style={{ cursor: "pointer", background: "#101018", borderRadius: 16, overflow: "hidden", border: "1px solid #1a1a28", transition: "transform .35s cubic-bezier(.16,1,.3,1), box-shadow .35s ease", position: "relative" }}
        onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = `0 12px 40px ${ACCENT}15`; }}
        onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
        <div style={{ position: "relative", height: 200, overflow: "hidden" }}>
          <img src={p.img} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .5s ease" }}
            onMouseEnter={e => e.target.style.transform = "scale(1.08)"}
            onMouseLeave={e => e.target.style.transform = "scale(1)"} />
          <div style={{ position: "absolute", top: 12, left: 12, display: "flex", gap: 8 }}>
            <span style={{ background: ACCENT, color: DARK, fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 20, letterSpacing: 0.5, textTransform: "uppercase" }}>{p.type}</span>
            {p.tag && <span style={{ background: "rgba(255,255,255,.12)", backdropFilter: "blur(8px)", color: LIGHT, fontSize: 11, fontWeight: 600, padding: "4px 12px", borderRadius: 20 }}>{p.tag}</span>}
          </div>
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 60, background: "linear-gradient(transparent, #101018)" }} />
        </div>
        <div style={{ padding: "16px 20px 20px" }}>
          <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: LIGHT, fontFamily: "'Outfit', sans-serif" }}>{p.title}</h3>
          <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 6, color: "#888" }}>
            <IconLocation /> <span style={{ fontSize: 13 }}>{p.location}</span>
          </div>
          <div style={{ display: "flex", gap: 16, marginTop: 14, paddingTop: 14, borderTop: "1px solid #1a1a28" }}>
            <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 13, color: "#aaa" }}><IconBed /> {p.beds} Bed</span>
            <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 13, color: "#aaa" }}><IconBath /> {p.baths} Bath</span>
            <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 13, color: "#aaa" }}><IconArea /> {p.area}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16 }}>
            <span style={{ fontSize: 20, fontWeight: 800, color: ACCENT, fontFamily: "'Outfit', sans-serif" }}>{p.price}</span>
            <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13, fontWeight: 600, color: ACCENT, opacity: .8 }}>Details <IconArrow /></span>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}

// ─── Property Detail Modal ──────────────────────────
function DetailModal({ property, onClose }) {
  if (!property) return null;
  const p = property;
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,.75)", backdropFilter: "blur(12px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20, animation: "fadeIn .3s ease" }}>
      <div onClick={e => e.stopPropagation()} style={{ background: "#0e0e18", borderRadius: 20, maxWidth: 720, width: "100%", maxHeight: "90vh", overflow: "auto", border: `1px solid #1a1a28`, position: "relative" }}>
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, zIndex: 10, background: "rgba(0,0,0,.5)", border: "none", borderRadius: "50%", width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", backdropFilter: "blur(4px)" }}><IconClose /></button>
        <img src={p.img} alt={p.title} style={{ width: "100%", height: 320, objectFit: "cover", borderRadius: "20px 20px 0 0" }} />
        <div style={{ padding: "28px 32px 36px" }}>
          <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
            <span style={{ background: ACCENT, color: DARK, fontSize: 12, fontWeight: 700, padding: "5px 14px", borderRadius: 20, textTransform: "uppercase" }}>{p.type}</span>
            <span style={{ background: "#1a1a28", color: LIGHT, fontSize: 12, fontWeight: 600, padding: "5px 14px", borderRadius: 20 }}>{p.category}</span>
          </div>
          <h2 style={{ margin: 0, fontSize: 28, fontWeight: 800, color: LIGHT, fontFamily: "'Outfit', sans-serif" }}>{p.title}</h2>
          <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 8, color: "#888" }}><IconLocation /> <span style={{ fontSize: 14 }}>{p.location}</span></div>
          <div style={{ fontSize: 32, fontWeight: 800, color: ACCENT, marginTop: 20, fontFamily: "'Outfit', sans-serif" }}>{p.price}</div>
          <div style={{ display: "flex", gap: 24, marginTop: 20, padding: "20px 0", borderTop: "1px solid #1a1a28", borderBottom: "1px solid #1a1a28" }}>
            {[{ icon: <IconBed />, label: `${p.beds} Bedrooms` }, { icon: <IconBath />, label: `${p.baths} Bathrooms` }, { icon: <IconArea />, label: p.area }].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, color: "#bbb", fontSize: 14 }}>{item.icon} {item.label}</div>
            ))}
          </div>
          <h4 style={{ color: LIGHT, fontSize: 16, fontWeight: 700, marginTop: 24, marginBottom: 10, fontFamily: "'Outfit', sans-serif" }}>About this property</h4>
          <p style={{ color: "#888", fontSize: 14, lineHeight: 1.7, margin: 0 }}>
            A beautiful {p.category.toLowerCase()} located in the heart of {p.location}. This property offers modern amenities, excellent connectivity, and a vibrant neighborhood. Ideal for {p.type === "PG" ? "students and working professionals" : p.type === "Rent" ? "families and professionals looking for a comfortable home" : "buyers seeking a premium investment opportunity"}. Well-maintained interiors with natural lighting and ample ventilation throughout.
          </p>
          <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
            <button style={{ flex: 1, padding: "14px 0", background: ACCENT, color: DARK, border: "none", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "'Outfit', sans-serif", transition: "opacity .2s" }}
              onMouseEnter={e => e.target.style.opacity = .85} onMouseLeave={e => e.target.style.opacity = 1}>Schedule Visit</button>
            <button style={{ flex: 1, padding: "14px 0", background: "transparent", color: ACCENT, border: `1.5px solid ${ACCENT}`, borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "'Outfit', sans-serif", transition: "background .2s" }}
              onMouseEnter={e => e.target.style.background = `${ACCENT}12`} onMouseLeave={e => e.target.style.background = "transparent"}>Contact Owner</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main App ───────────────────────────────────────
export default function NestFind() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filtered = filter === "All" ? properties : properties.filter(p => p.type === filter);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const handleSubmit = () => {
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setTimeout(() => { setSubmitted(false); setFormData({ name: "", email: "", phone: "", message: "" }); }, 3000);
    }
  };

  return (
    <div style={{ background: DARK, minHeight: "100vh", fontFamily: "'Outfit', 'Segoe UI', sans-serif", color: LIGHT, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Sora:wght@300;400;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: ${DARK}; }
        ::selection { background: ${ACCENT}40; color: ${LIGHT}; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${DARK}; }
        ::-webkit-scrollbar-thumb { background: ${ACCENT}40; border-radius: 3px; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        @keyframes pulse { 0%,100% { opacity: .6; } 50% { opacity: 1; } }
        @keyframes shimmer { 0% { background-position: -400px 0; } 100% { background-position: 400px 0; } }
        input:focus, textarea:focus { outline: none; border-color: ${ACCENT} !important; box-shadow: 0 0 0 3px ${ACCENT}18; }
      `}</style>

      {/* ═══ NAVBAR ═══ */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 900, padding: "0 40px", height: 72, display: "flex", alignItems: "center", justifyContent: "space-between", background: scrolled ? "rgba(8,8,15,.92)" : "transparent", backdropFilter: scrolled ? "blur(16px)" : "none", borderBottom: scrolled ? "1px solid #1a1a28" : "none", transition: "all .35s ease" }}>
        <div onClick={() => scrollTo("hero")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT}88)`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 18, color: DARK }}>N</div>
          <span style={{ fontSize: 22, fontWeight: 800, fontFamily: "'Outfit', sans-serif", letterSpacing: -0.5 }}>Nest<span style={{ color: ACCENT }}>Find</span></span>
        </div>
        <div style={{ display: "flex", gap: 36, alignItems: "center" }}>
          {["Listings", "Contact"].map(s => (
            <span key={s} onClick={() => scrollTo(s.toLowerCase())} style={{ cursor: "pointer", fontSize: 14, fontWeight: 500, color: "#999", letterSpacing: 0.5, transition: "color .2s", fontFamily: "'Sora', sans-serif" }}
              onMouseEnter={e => e.target.style.color = ACCENT} onMouseLeave={e => e.target.style.color = "#999"}>{s}</span>
          ))}
          <button onClick={() => scrollTo("contact")} style={{ padding: "10px 22px", background: ACCENT, color: DARK, border: "none", borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "'Outfit', sans-serif", transition: "transform .2s, opacity .2s" }}
            onMouseEnter={e => { e.target.style.transform = "scale(1.04)"; e.target.style.opacity = .9; }} onMouseLeave={e => { e.target.style.transform = "scale(1)"; e.target.style.opacity = 1; }}>Get Started</button>
        </div>
      </nav>

      {/* ═══ HERO ═══ */}
      <section id="hero" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", padding: "120px 40px 80px" }}>
        {/* Background elements */}
        <div style={{ position: "absolute", top: "10%", right: "10%", width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(circle, ${ACCENT}08 0%, transparent 70%)`, animation: "float 8s ease-in-out infinite" }} />
        <div style={{ position: "absolute", bottom: "15%", left: "5%", width: 300, height: 300, borderRadius: "50%", background: `radial-gradient(circle, ${ACCENT}05 0%, transparent 70%)`, animation: "float 10s ease-in-out infinite 2s" }} />
        {/* Grid pattern */}
        <div style={{ position: "absolute", inset: 0, opacity: .03, backgroundImage: `linear-gradient(${ACCENT} 1px, transparent 1px), linear-gradient(90deg, ${ACCENT} 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />

        <div style={{ textAlign: "center", maxWidth: 800, position: "relative", zIndex: 1 }}>
          <FadeIn>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 18px", background: `${ACCENT}10`, borderRadius: 30, border: `1px solid ${ACCENT}25`, marginBottom: 28 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: ACCENT, animation: "pulse 2s infinite" }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: ACCENT, fontFamily: "'Sora', sans-serif", letterSpacing: 0.5 }}>500+ Properties Live</span>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 style={{ fontSize: "clamp(36px, 6vw, 72px)", fontWeight: 900, lineHeight: 1.05, fontFamily: "'Outfit', sans-serif", letterSpacing: -2, color: LIGHT }}>
              Find Your<br /><span style={{ color: ACCENT }}>Perfect Space</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p style={{ fontSize: 18, color: "#777", marginTop: 24, lineHeight: 1.6, fontFamily: "'Sora', sans-serif", maxWidth: 540, margin: "24px auto 0" }}>
              Discover premium homes, flats, PGs, and more — whether you're buying, selling, or renting. All in one place.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", marginTop: 40 }}>
              <button onClick={() => scrollTo("listings")} style={{ padding: "16px 36px", background: ACCENT, color: DARK, border: "none", borderRadius: 14, fontSize: 16, fontWeight: 700, cursor: "pointer", fontFamily: "'Outfit', sans-serif", display: "flex", alignItems: "center", gap: 8, transition: "transform .25s, box-shadow .25s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 8px 32px ${ACCENT}30`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                Browse Listings <IconArrow />
              </button>
              <button onClick={() => scrollTo("contact")} style={{ padding: "16px 36px", background: "transparent", color: LIGHT, border: "1.5px solid #2a2a38", borderRadius: 14, fontSize: 16, fontWeight: 600, cursor: "pointer", fontFamily: "'Outfit', sans-serif", transition: "border-color .25s" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = ACCENT} onMouseLeave={e => e.currentTarget.style.borderColor = "#2a2a38"}>
                List Property
              </button>
            </div>
          </FadeIn>
          <FadeIn delay={0.45}>
            <div style={{ display: "flex", justifyContent: "center", gap: 48, marginTop: 64 }}>
              {[{ num: "500+", label: "Properties" }, { num: "200+", label: "Happy Clients" }, { num: "15+", label: "Cities" }].map((s, i) => (
                <div key={i} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 28, fontWeight: 800, color: ACCENT, fontFamily: "'Outfit', sans-serif" }}>{s.num}</div>
                  <div style={{ fontSize: 13, color: "#666", marginTop: 4, fontFamily: "'Sora', sans-serif" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ LISTINGS ═══ */}
      <section id="listings" style={{ padding: "80px 40px 100px", maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: ACCENT, textTransform: "uppercase", letterSpacing: 2, fontFamily: "'Sora', sans-serif" }}>Explore</span>
            <h2 style={{ fontSize: 40, fontWeight: 800, marginTop: 8, fontFamily: "'Outfit', sans-serif", letterSpacing: -1 }}>Featured Properties</h2>
          </div>
        </FadeIn>
        <FadeIn delay={0.1}>
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 40 }}>
            {filters.map(f => (
              <button key={f} onClick={() => setFilter(f)} style={{ padding: "10px 24px", borderRadius: 10, border: `1.5px solid ${filter === f ? ACCENT : "#1a1a28"}`, background: filter === f ? `${ACCENT}15` : "transparent", color: filter === f ? ACCENT : "#888", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "'Sora', sans-serif", transition: "all .25s ease" }}>{f}</button>
            ))}
          </div>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340, 1fr))", gap: 24 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 24 }}>
            {filtered.map((p, i) => <PropertyCard key={p.id} p={p} onClick={setSelected} idx={i} />)}
          </div>
        </div>
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#555", fontSize: 16 }}>No properties found for this filter.</div>
        )}
      </section>

      {/* ═══ CONTACT ═══ */}
      <section id="contact" style={{ padding: "80px 40px 120px", maxWidth: 1000, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: ACCENT, textTransform: "uppercase", letterSpacing: 2, fontFamily: "'Sora', sans-serif" }}>Reach Out</span>
            <h2 style={{ fontSize: 40, fontWeight: 800, marginTop: 8, fontFamily: "'Outfit', sans-serif", letterSpacing: -1 }}>Get In Touch</h2>
          </div>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: 40, alignItems: "start" }}>
          <FadeIn delay={0.1}>
            <div style={{ background: "#101018", borderRadius: 20, padding: 36, border: "1px solid #1a1a28" }}>
              <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8, fontFamily: "'Outfit', sans-serif" }}>Contact Info</h3>
              <p style={{ color: "#666", fontSize: 14, lineHeight: 1.6, marginBottom: 28, fontFamily: "'Sora', sans-serif" }}>Have questions or want to list your property? We'd love to hear from you.</p>
              {[
                { icon: <IconPhone />, label: "+91 98765 43210" },
                { icon: <IconMail />, label: "hello@nestfind.in" },
                { icon: <IconMapPin />, label: "Connaught Place, New Delhi" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 0", borderBottom: i < 2 ? "1px solid #1a1a28" : "none" }}>
                  <div style={{ width: 42, height: 42, borderRadius: 12, background: `${ACCENT}10`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{item.icon}</div>
                  <span style={{ fontSize: 14, color: "#aaa", fontFamily: "'Sora', sans-serif" }}>{item.label}</span>
                </div>
              ))}
            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div style={{ background: "#101018", borderRadius: 20, padding: 36, border: "1px solid #1a1a28" }}>
              {submitted ? (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <div style={{ width: 64, height: 64, borderRadius: "50%", background: `${ACCENT}15`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                    <svg width="28" height="28" fill="none" stroke={ACCENT} strokeWidth="2.5" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5"/></svg>
                  </div>
                  <h3 style={{ fontSize: 22, fontWeight: 700, fontFamily: "'Outfit', sans-serif" }}>Message Sent!</h3>
                  <p style={{ color: "#888", fontSize: 14, marginTop: 8 }}>We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 600, color: "#888", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8, display: "block", fontFamily: "'Sora', sans-serif" }}>Name</label>
                      <input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Your name" style={{ width: "100%", padding: "13px 16px", background: "#080810", border: "1.5px solid #1a1a28", borderRadius: 10, color: LIGHT, fontSize: 14, fontFamily: "'Sora', sans-serif", transition: "border-color .2s, box-shadow .2s" }} />
                    </div>
                    <div>
                      <label style={{ fontSize: 12, fontWeight: 600, color: "#888", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8, display: "block", fontFamily: "'Sora', sans-serif" }}>Phone</label>
                      <input value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="+91 XXXXX XXXXX" style={{ width: "100%", padding: "13px 16px", background: "#080810", border: "1.5px solid #1a1a28", borderRadius: 10, color: LIGHT, fontSize: 14, fontFamily: "'Sora', sans-serif", transition: "border-color .2s, box-shadow .2s" }} />
                    </div>
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <label style={{ fontSize: 12, fontWeight: 600, color: "#888", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8, display: "block", fontFamily: "'Sora', sans-serif" }}>Email</label>
                    <input value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="you@example.com" type="email" style={{ width: "100%", padding: "13px 16px", background: "#080810", border: "1.5px solid #1a1a28", borderRadius: 10, color: LIGHT, fontSize: 14, fontFamily: "'Sora', sans-serif", transition: "border-color .2s, box-shadow .2s" }} />
                  </div>
                  <div style={{ marginBottom: 24 }}>
                    <label style={{ fontSize: 12, fontWeight: 600, color: "#888", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8, display: "block", fontFamily: "'Sora', sans-serif" }}>Message</label>
                    <textarea value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} placeholder="Tell us what you're looking for..." rows={4} style={{ width: "100%", padding: "13px 16px", background: "#080810", border: "1.5px solid #1a1a28", borderRadius: 10, color: LIGHT, fontSize: 14, fontFamily: "'Sora', sans-serif", resize: "vertical", transition: "border-color .2s, box-shadow .2s" }} />
                  </div>
                  <button onClick={handleSubmit} style={{ width: "100%", padding: "16px", background: ACCENT, color: DARK, border: "none", borderRadius: 12, fontSize: 16, fontWeight: 700, cursor: "pointer", fontFamily: "'Outfit', sans-serif", transition: "transform .2s, opacity .2s" }}
                    onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.opacity = .9; }}
                    onMouseLeave={e => { e.target.style.transform = "translateY(0)"; e.target.style.opacity = 1; }}>
                    Send Message
                  </button>
                </>
              )}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ padding: "40px 40px", borderTop: "1px solid #1a1a28", display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: `linear-gradient(135deg, ${ACCENT}, ${ACCENT}88)`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 14, color: DARK }}>N</div>
          <span style={{ fontSize: 16, fontWeight: 700, fontFamily: "'Outfit', sans-serif" }}>Nest<span style={{ color: ACCENT }}>Find</span></span>
        </div>
        <span style={{ fontSize: 13, color: "#444", fontFamily: "'Sora', sans-serif" }}>© 2026 NestFind. All rights reserved.</span>
      </footer>

      {/* ═══ DETAIL MODAL ═══ */}
      <DetailModal property={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
