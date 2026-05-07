"use client";

import Image from "next/image";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import {
  FaArrowDown,
  FaChevronLeft,
  FaChevronRight,
  FaDatabase,
  FaEnvelope,
  FaExternalLinkAlt,
  FaFacebookF,
  FaGithub,
  FaLaptopCode,
  FaMobileAlt,
  FaRocket,
  FaServer,
  FaTimes,
} from "react-icons/fa";
import styles from "./page.module.css";

type Project = {
  title: string;
  role: string;
  year: string;
  signal: string;
  short: string;
  desc: string;
  images: {
    src: string;
    alt: string;
  }[];
  tags: string[];
  links: {
    label: string;
    url: string;
  }[];
};

type ContactOption = {
  title: string;
  desc: string;
  href: string;
  icon: ReactNode;
};

const projects: Project[] = [
  {
    title: "Booking Car Wash",
    role: "Product UI Prototype",
    year: "2026",
    signal: "A two-device booking flow for a cleaner service experience.",
    short:
      "Web and mobile booking concept with service selection, schedule flow, order status, and payment screens.",
    images: [
      {
        src: "/project-webbookingcarwash.jpeg",
        alt: "Booking Car Wash web interface concept",
      },
      {
        src: "/project-mobilebookingcarwash.jpeg",
        alt: "Booking Car Wash mobile interface concept",
      },
    ],
    desc: "A UI design concept for a car wash booking system consisting of web and mobile interfaces. The work focuses on helping customers book car wash services online through schedule selection, service type options, confirmation flows, mobile-friendly navigation, order status screens, and digital payment interface concepts.",
    tags: ["UI Design", "Figma", "Web", "Mobile"],
    links: [
      {
        label: "Open Web Prototype",
        url: "https://www.figma.com/proto/SIvWeLjt4rjmkzFwgDsNRI/Project-web?node-id=2262-3139&t=P3ANP626y8h8FZEx-1",
      },
      {
        label: "Open Mobile Prototype",
        url: "https://www.figma.com/proto/SIvWeLjt4rjmkzFwgDsNRI/Project-web?node-id=2111-3803&t=P3ANP626y8h8FZEx-1",
      },
    ],
  },
  {
    title: "AdaResep App",
    role: "Desktop Application",
    year: "2026",
    signal: "A structured recipe browser made to keep cooking steps clear.",
    short:
      "A C# recipe application for browsing recipe details, ingredients, and cooking instructions.",
    images: [
      {
        src: "/project-resepmakanan.jpeg",
        alt: "AdaResep desktop recipe application",
      },
    ],
    desc: "A recipe application built with C#. This project helps users explore food recipes through a structured interface, making it easier to view recipe information, ingredients, and cooking steps in a simple and organized application flow.",
    tags: ["C#", "Desktop App", "Recipe"],
    links: [
      {
        label: "View Repository",
        url: "https://github.com/ezerlubis/projek_resep_makanan.git",
      },
    ],
  },
  {
    title: "Kicau Mania Store",
    role: "Fullstack Commerce",
    year: "2026",
    signal: "Commerce logic, stock visibility, orders, and an AI assistant.",
    short:
      "A Spring Boot and MySQL e-commerce system with authentication, admin dashboard, orders, and product search assistance.",
    images: [
      {
        src: "/project-kicaumaniastore.jpeg",
        alt: "Kicau Mania Store e-commerce dashboard",
      },
    ],
    desc: "Kicau Mania Store is a web-based e-commerce system that sells modern and premium shoes with an artificial intelligence assistant to help users search for products, view stock information, get recommendations, and place orders online. The system includes user authentication, product management by admins, order history with transaction status, an admin dashboard, and database integration using Spring Boot and MySQL.",
    tags: ["Spring Boot", "MySQL", "E-Commerce", "AI Assistant"],
    links: [
      {
        label: "View Repository",
        url: "https://github.com/ezerlubis/Project-Kicau-Mania-Store.git",
      },
    ],
  },
  {
    title: "AI Beach Waste Detection",
    role: "AI Monitoring System",
    year: "2026",
    signal: "Detection, alerts, and environmental monitoring in one flow.",
    short:
      "An AI monitoring concept for detecting coastal waste and sending alerts through WhatsApp.",
    images: [
      {
        src: "/project-aideteksisampahdipantai.png",
        alt: "AI Beach Waste Detection monitoring interface",
      },
    ],
    desc: "This project is an artificial intelligence system designed to detect waste in coastal beach areas using a camera and real-time monitoring system. It recognizes types of waste such as plastic, bottles, cans, and other debris, then displays detection results through a monitoring dashboard. Detection results and condition alerts can also be sent through WhatsApp to support faster monitoring and response.",
    tags: ["AI", "Monitoring", "Detection", "WhatsApp"],
    links: [
      {
        label: "View Repository",
        url: "https://github.com/ezerlubis/Projek-AI-Deteksi-sampah-di-pantai.git",
      },
    ],
  },
];

const capabilities = [
  {
    title: "Frontend Interfaces",
    desc: "React, Next.js, TypeScript, responsive layout, and interaction polish.",
    icon: <FaLaptopCode />,
  },
  {
    title: "Backend Logic",
    desc: "Spring Boot APIs, authentication flows, transaction logic, and dashboards.",
    icon: <FaServer />,
  },
  {
    title: "Database Thinking",
    desc: "MySQL structure for users, products, orders, history, and admin data.",
    icon: <FaDatabase />,
  },
  {
    title: "Prototype To Product",
    desc: "Turning rough UI ideas into coherent pages, flows, and working systems.",
    icon: <FaMobileAlt />,
  },
];

const contactOptions: ContactOption[] = [
  {
    title: "Email",
    desc: "Project discussion, collaboration, or internship opportunity.",
    href: "mailto:silubis.ezer@gmail.com?subject=Hello%20Ebenezer%20Lubis&body=Hello%20Ebenezer%2C%20I%20would%20like%20to%20discuss%20a%20project.",
    icon: <FaEnvelope />,
  },
  {
    title: "GitHub",
    desc: "Repositories, experiments, and project source code.",
    href: "https://github.com/ezerlubis",
    icon: <FaGithub />,
  },
  {
    title: "Facebook",
    desc: "A casual place to connect and continue the conversation.",
    href: "https://www.facebook.com/profile.php?id=100027709835010",
    icon: <FaFacebookF />,
  },
];

export default function Home() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isContactClosing, setIsContactClosing] = useState(false);

  const openModal = (project: Project) => {
    setActiveProject(project);
    setActiveImageIndex(0);
    setIsClosing(false);
  };

  const closeModal = useCallback(() => {
    setIsClosing(true);
    window.setTimeout(() => {
      setActiveProject(null);
      setIsClosing(false);
      setActiveImageIndex(0);
    }, 280);
  }, []);

  const openContact = useCallback(() => {
    setIsContactOpen(true);
    setIsContactClosing(false);
  }, []);

  const closeContact = useCallback(() => {
    setIsContactClosing(true);
    window.setTimeout(() => {
      setIsContactOpen(false);
      setIsContactClosing(false);
    }, 240);
  }, []);

  const nextImage = useCallback(() => {
    if (!activeProject) return;
    setActiveImageIndex((prev) =>
      prev === activeProject.images.length - 1 ? 0 : prev + 1,
    );
  }, [activeProject]);

  const prevImage = useCallback(() => {
    if (!activeProject) return;
    setActiveImageIndex((prev) =>
      prev === 0 ? activeProject.images.length - 1 : prev - 1,
    );
  }, [activeProject]);

  useEffect(() => {
    document.body.style.overflow =
      activeProject || isContactOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [activeProject, isContactOpen]);

  useEffect(() => {
    const openContactFromNavigation = () => {
      openContact();
    };

    const openContactFromHash = () => {
      if (window.location.hash === "#contact") {
        openContact();
      }
    };

    window.addEventListener("open-contact-popup", openContactFromNavigation);
    window.addEventListener("hashchange", openContactFromHash);
    openContactFromHash();

    return () => {
      window.removeEventListener(
        "open-contact-popup",
        openContactFromNavigation,
      );
      window.removeEventListener("hashchange", openContactFromHash);
    };
  }, [openContact]);

  useEffect(() => {
    if (!activeProject && !isContactOpen) return;

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (isContactOpen) closeContact();
        if (activeProject) closeModal();
      }

      if (activeProject && event.key === "ArrowRight") nextImage();
      if (activeProject && event.key === "ArrowLeft") prevImage();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [
    activeProject,
    isContactOpen,
    closeContact,
    closeModal,
    nextImage,
    prevImage,
  ]);

  return (
    <main className={styles.pageShell}>
      <section id="home" className={styles.hero}>
        <div className={styles.heroMedia} aria-hidden="true">
          <Image
            src="/hero.jpeg"
            alt=""
            fill
            priority
            sizes="100vw"
            className={styles.heroImage}
          />
        </div>
        <div className={styles.heroShade} aria-hidden="true" />
        <div className={styles.heroTexture} aria-hidden="true" />

        <div className={styles.heroGrid}>
          <div className={styles.heroCopy}>
            <span className={styles.heroEyebrow}>Portfolio 2026</span>
            <h1>
              Ebenezer
              <span>Lubis</span>
            </h1>
            <p className={styles.heroLead}>
              I build web experiences from the messy middle of ideas: UI, APIs,
              data, and the details that make a product feel finished.
            </p>

            <div className={styles.heroActions}>
              <a href="#portfolio" className={styles.primaryHeroBtn}>
                <span>Explore Work</span>
                <FaExternalLinkAlt />
              </a>
              <button
                className={styles.secondaryHeroBtn}
                type="button"
                onClick={openContact}
              >
                <span>Start Contact</span>
                <FaEnvelope />
              </button>
            </div>
          </div>

          <aside className={styles.signalPanel} aria-label="Portfolio profile">
            <div className={styles.signalHeader}>
              <span>Profile Signal</span>
              <strong>Online</strong>
            </div>
            <div className={styles.signalRows}>
              <div>
                <span>Focus</span>
                <strong>Web Interfaces</strong>
              </div>
              <div>
                <span>Stack</span>
                <strong>React / Spring</strong>
              </div>
              <div>
                <span>Mode</span>
                <strong>Build And Iterate</strong>
              </div>
            </div>
          </aside>
        </div>

        <div className={styles.heroStats} aria-label="Portfolio summary">
          <div>
            <strong>{projects.length}</strong>
            <span>Selected Projects</span>
          </div>
          <div>
            <strong>Fullstack</strong>
            <span>Interface To Database</span>
          </div>
          <div>
            <strong>AI</strong>
            <span>Applied Experiments</span>
          </div>
        </div>

        <a href="#about" className={styles.scrollCue} aria-label="Scroll to about">
          <FaArrowDown />
        </a>
      </section>

      <section id="about" className={styles.about}>
        <div className={styles.sectionIntro}>
          <span className={styles.sectionLabel}>About</span>
          <h2>Not just pages. I like building systems that explain themselves.</h2>
          <p>
            My work sits between product thinking and implementation: clear
            layouts, usable flows, backend logic, and data that supports the
            experience instead of getting in the way.
          </p>
        </div>

        <div className={styles.aboutGrid}>
          <div className={styles.aboutStory}>
            <p className={styles.aboutStatement}>
              I am an Informatics student focused on web development,
              application development, and turning rough product ideas into
              usable digital experiences.
            </p>

            <div className={styles.principleList}>
              <div>
                <span>01</span>
                <strong>Design With Purpose</strong>
                <p>Every section should make the next decision easier.</p>
              </div>
              <div>
                <span>02</span>
                <strong>Code For Growth</strong>
                <p>Structure matters when a simple page becomes a product.</p>
              </div>
              <div>
                <span>03</span>
                <strong>Connect The Whole Flow</strong>
                <p>Interfaces, APIs, and databases should feel like one system.</p>
              </div>
            </div>
          </div>

          <div className={styles.profilePlate}>
            <div className={styles.profileImageWrap}>
              <Image
                src="/hero.jpeg"
                alt="Ebenezer Lubis"
                fill
                sizes="(max-width: 768px) 100vw, 420px"
                className={styles.profileImage}
              />
            </div>
            <div className={styles.profileCaption}>
              <span>Current Direction</span>
              <strong>Modern web apps, backend integration, and AI-assisted ideas.</strong>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.capabilities}>
        <div className={styles.sectionIntro}>
          <span className={styles.sectionLabel}>Capabilities</span>
          <h2>The tools are familiar. The execution should not feel generic.</h2>
        </div>

        <div className={styles.capabilityGrid}>
          {capabilities.map((item) => (
            <article key={item.title} className={styles.capabilityCard}>
              <span className={styles.capabilityIcon}>{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="portfolio" className={styles.projects}>
        <div className={styles.sectionIntro}>
          <span className={styles.sectionLabel}>Selected Work</span>
          <h2>Project case files with actual product logic behind them.</h2>
          <p>
            Each project below carries a different problem shape: booking,
            content organization, commerce, monitoring, and AI exploration.
          </p>
        </div>

        <div className={styles.caseStack}>
          {projects.map((project, index) => (
            <article
              key={project.title}
              className={styles.caseFile}
              onClick={() => openModal(project)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  openModal(project);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`Open project details for ${project.title}`}
            >
              <div className={styles.caseImageWrap}>
                <Image
                  src={project.images[0].src}
                  alt={project.images[0].alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 48vw"
                  className={styles.caseImage}
                />
                <span className={styles.caseNumber}>
                  Case {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div className={styles.caseBody}>
                <div className={styles.caseMeta}>
                  <span>{project.role}</span>
                  <span>{project.year}</span>
                </div>
                <h3>{project.title}</h3>
                <p className={styles.caseSignal}>{project.signal}</p>
                <p className={styles.caseShort}>{project.short}</p>

                <div className={styles.projectTags}>
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>

                <span className={styles.caseOpen}>
                  Open Case
                  <FaExternalLinkAlt />
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.contactCta}>
        <div className={styles.contactBackdrop} aria-hidden="true">
          <Image
            src="/bacground.jpg"
            alt=""
            fill
            sizes="100vw"
            className={styles.contactBackdropImage}
          />
        </div>
        <div className={styles.contactCtaInner}>
          <span className={styles.ctaIcon}>
            <FaRocket />
          </span>
          <h2>Let&apos;s build something that feels designed, coded, and alive.</h2>
          <p>
            I am open to discussing web projects, application development, UI
            slicing, backend integration, and technology collaborations.
          </p>
          <button className={styles.ctaButton} type="button" onClick={openContact}>
            Start A Conversation
          </button>
        </div>
      </section>

      {activeProject && (
        <div
          className={`${styles.modal} ${isClosing ? styles.modalClosing : ""}`}
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-label={`Project details for ${activeProject.title}`}
        >
          <div
            className={`${styles.modalContent} ${
              isClosing ? styles.modalContentClosing : ""
            }`}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className={styles.closeBtn}
              type="button"
              onClick={closeModal}
              aria-label="Close project details"
            >
              <FaTimes />
            </button>

            <div className={styles.modalImageWrap}>
              <div
                className={styles.carouselTrack}
                style={{ transform: `translateX(-${activeImageIndex * 100}%)` }}
              >
                {activeProject.images.map((image) => (
                  <div key={image.src} className={styles.carouselSlide}>
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="100vw"
                      className={styles.modalImage}
                    />
                  </div>
                ))}
              </div>

              {activeProject.images.length > 1 && (
                <>
                  <button
                    className={`${styles.carouselBtn} ${styles.carouselPrev}`}
                    type="button"
                    onClick={prevImage}
                    aria-label="Previous image"
                  >
                    <FaChevronLeft />
                  </button>
                  <button
                    className={`${styles.carouselBtn} ${styles.carouselNext}`}
                    type="button"
                    onClick={nextImage}
                    aria-label="Next image"
                  >
                    <FaChevronRight />
                  </button>

                  <div className={styles.carouselDots}>
                    {activeProject.images.map((image, index) => (
                      <button
                        key={image.src}
                        className={`${styles.dot} ${
                          index === activeImageIndex ? styles.dotActive : ""
                        }`}
                        type="button"
                        onClick={() => setActiveImageIndex(index)}
                        aria-label={`Go to image ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className={styles.modalBody}>
              <div className={styles.modalMeta}>
                <span>{activeProject.role}</span>
                <span>{activeProject.year}</span>
              </div>
              <h3 className={styles.modalTitle}>{activeProject.title}</h3>
              <p className={styles.modalDesc}>{activeProject.desc}</p>

              <div className={styles.modalTags}>
                {activeProject.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>

              <div className={styles.modalLinks}>
                {activeProject.links.map((linkItem) => (
                  <a
                    key={linkItem.url}
                    href={linkItem.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.modalLink}
                  >
                    <FaExternalLinkAlt />
                    {linkItem.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {isContactOpen && (
        <div
          className={`${styles.contactModal} ${
            isContactClosing ? styles.contactModalClosing : ""
          }`}
          onClick={closeContact}
          role="dialog"
          aria-modal="true"
          aria-label="Contact options"
        >
          <div
            className={`${styles.contactPanel} ${
              isContactClosing ? styles.contactPanelClosing : ""
            }`}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className={styles.contactCloseBtn}
              type="button"
              onClick={closeContact}
              aria-label="Close contact options"
            >
              <FaTimes />
            </button>

            <div className={styles.contactHeader}>
              <span className={styles.contactEyebrow}>Contact</span>
              <h3>Choose the cleanest path to reach me.</h3>
              <p>
                Send a project idea, ask about a build, or open a conversation
                about collaboration.
              </p>
            </div>

            <div className={styles.contactMenu}>
              {contactOptions.map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.contactItem}
                >
                  <span className={styles.contactIcon}>{item.icon}</span>
                  <span>
                    <strong>{item.title}</strong>
                    <small>{item.desc}</small>
                  </span>
                  <FaExternalLinkAlt className={styles.contactArrow} />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
