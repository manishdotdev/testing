import { useState, useEffect } from "react";
import Logo from "../assets/navrasa_logo.png";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: "Prebuilt", href: "/prebuilt" },
    { label: "Customized", href: "/customized" },
    { label: "About Us", href: "/about-us" },
    { label: "Contact Us", href: "/contact" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=DM+Sans:wght@300;400;500&display=swap');

        .nav-glass {
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 8px 32px rgba(31, 38, 135, 0.08),
                      inset 0 1px 0 rgba(255,255,255,0.5);
          transition: all 0.4s ease;
        }

        .nav-glass.scrolled {
          background: rgba(255, 255, 255, 0.25);
          box-shadow: 0 8px 40px rgba(31, 38, 135, 0.15),
                      inset 0 1px 0 rgba(255,255,255,0.6);
        }

        .nav-link {
          font-family: 'DM Sans', sans-serif;
          font-weight: 800;
          font-size: 0.875rem;
          letter-spacing: 0.04em;
          color: rgba(30, 30, 50, 0.75);
          position: relative;
          transition: color 0.25s ease;
        }

        // .nav-link::after {
        //   content: '';
        //   position: absolute;
        //   bottom: -3px;
        //   left: 0;
        //   width: 0;
        //   height: 1px;
        //   background: linear-gradient(90deg, #6366f1, #a78bfa);
        //   transition: width 0.3s ease;
        // }

        .nav-link:hover {
          color: #6366f1;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .mobile-glass {
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.35);
          box-shadow: 0 8px 32px rgba(31, 38, 135, 0.1),
                      inset 0 1px 0 rgba(255,255,255,0.5);
        }

        .dropdown-glass {
          background: rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(28px);
          -webkit-backdrop-filter: blur(28px);
          border: 1px solid rgba(255, 255, 255, 0.4);
          box-shadow: 0 16px 48px rgba(31, 38, 135, 0.12),
                      inset 0 1px 0 rgba(255,255,255,0.6);
        }

        .hamburger-line {
          display: block;
          width: 22px;
          height: 1.5px;
          background: rgba(30, 30, 50, 0.7);
          border-radius: 2px;
          transition: all 0.3s ease;
          transform-origin: center;
        }

        .hamburger-open .line1 { transform: translateY(5px) rotate(45deg); }
        .hamburger-open .line2 { opacity: 0; transform: scaleX(0); }
        .hamburger-open .line3 { transform: translateY(-5px) rotate(-45deg); }

        .gradient-orb {
          
          transform: translateX(-50%);
          width: 600px;
          height: 120px;
          // background: radial-gradient(ellipse, rgba(167,139,250,0.18) 0%, rgba(99,102,241,0.1) 50%, transparent 70%);

          
          pointer-events: none;
          z-index: 0;
          filter: blur(8px);
          }

          .bg{
            background-image: radial-gradient(#000000 1px, transparent 1px);
          }
      `}</style>

      {/* <div className="gradient-orb" /> */}

      <nav className="relative flex justify-center items-center py-5 z-50 bg">

        <div
          className={`nav-glass ${scrolled ? "scrolled" : ""} hidden md:grid grid-cols-3 items-center rounded-full px-10 py-3.5 min-w-[680px] `}
        >
          <div className="flex justify-center space-x-10">
            <a className="nav-link" href="/prebuilt">Prebuilt</a>
            <a className="nav-link" href="/customized">Customized</a>
          </div>

          <div className="flex justify-center">
            <a href="/">
              <img alt="Navrasa Logo" className="h-10 w-auto drop-shadow-sm" src={Logo} />
            </a>
          </div>

          <div className="flex justify-center space-x-10">
            <a className="nav-link" href="/about-us">About Us</a>
            <a className="nav-link" href="/contact">Contact Us</a>
          </div>
        </div>

        <div className="mobile-glass flex md:hidden w-[90%] justify-between items-center px-5 py-3 rounded-full z-50">
          <a href="/">
            <img alt="Navrasa Logo" className="h-8 w-auto" src={Logo} />
          </a>

          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            className={`flex flex-col gap-[5px] p-1 ${menuOpen ? "hamburger-open" : ""}`}
          >
            <span className="hamburger-line line1" />
            <span className="hamburger-line line2" />
            <span className="hamburger-line line3" />
          </button>
        </div>

        <div
          className={`dropdown-glass absolute top-[4.5rem] left-1/2 -translate-x-1/2 w-[88%]
            flex flex-col items-center py-7 space-y-5
            md:hidden z-40 rounded-2xl
            transition-all duration-300 ease-out
            ${menuOpen
              ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
              : "opacity-0 -translate-y-3 scale-95 pointer-events-none"
            }`}
        >
          <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-violet-300/60 to-transparent rounded-full" />

          {links.map((link) => (
            <a
              key={link.href}
              className="nav-link text-base"
              href={link.href}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}

          <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-violet-300/60 to-transparent rounded-full" />
        </div>
      </nav>
    </>
  );
}