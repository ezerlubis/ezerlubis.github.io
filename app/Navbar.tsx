"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isHomePage) return;

    const updateNavbar = () => {
      const scrollPosition = window.scrollY + 140;
      const sectionIds = ["home", "about", "portfolio"];
      const currentSection =
        sectionIds.findLast((id) => {
          const section = document.getElementById(id);
          return section ? scrollPosition >= section.offsetTop : false;
        }) || "home";

      setIsScrolled(window.scrollY > 24);
      setActiveSection(currentSection);
    };

    const frameId = window.requestAnimationFrame(updateNavbar);
    window.addEventListener("scroll", updateNavbar);
    window.addEventListener("resize", updateNavbar);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", updateNavbar);
      window.removeEventListener("resize", updateNavbar);
    };
  }, [isHomePage]);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleContactClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    closeMenu();

    if (pathname !== "/") return;

    event.preventDefault();
    window.history.pushState(null, "", "/#contact");
    window.dispatchEvent(new Event("open-contact-popup"));
  };

  return (
    <header className={`navbar ${!isHomePage || isScrolled ? "navbarScrolled" : ""}`}>
      <Link href="/#home" className="logo" aria-label="Back to home" onClick={closeMenu}>
        <Image src="/logo.png" alt="Ebenezer Lubis logo" width={92} height={62} priority />
        <span className="logoText">
          <strong>Ebenezer Lubis</strong>
          <small>Web Systems</small>
        </span>
      </Link>

      <button
        className="menuToggle"
        type="button"
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen((value) => !value)}
      >
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      <nav className={`menu ${isMenuOpen ? "menuOpen" : ""}`}>
        <Link
          href="/#home"
          className={`navLink ${isHomePage && activeSection === "home" ? "navLinkActive" : ""}`}
          onClick={closeMenu}
        >
          Home
        </Link>
        <Link
          href="/#about"
          className={`navLink ${isHomePage && activeSection === "about" ? "navLinkActive" : ""}`}
          onClick={closeMenu}
        >
          About
        </Link>
        <Link
          href="/#portfolio"
          className={`navLink ${isHomePage && activeSection === "portfolio" ? "navLinkActive" : ""}`}
          onClick={closeMenu}
        >
          Work
        </Link>
        <Link href="/#contact" className="contactNavButton" onClick={handleContactClick}>
          Contact
        </Link>
      </nav>
    </header>
  );
}
