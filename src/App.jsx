import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuTimerRef = useRef(null);

  useEffect(() => {
    // Empêcher le défilement du body quand le menu est ouvert
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      // Démarrer le timer quand le menu s'ouvre
      startMenuTimer();
    } else {
      // Annuler le timer quand le menu se ferme
      clearMenuTimer();
    }
  };

  const startMenuTimer = () => {
    clearMenuTimer(); // Nettoyer l'ancien timer s'il existe
    menuTimerRef.current = setTimeout(() => {
      setIsMenuOpen(false);
    }, 5000); // Fermeture après 5 secondes d'inactivité
  };

  const clearMenuTimer = () => {
    if (menuTimerRef.current) {
      clearTimeout(menuTimerRef.current);
    }
  };

  const handleMenuInteraction = () => {
    // Redémarrer le timer à chaque interaction
    startMenuTimer();
  };

  const handleTouchMove = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
      clearMenuTimer();
    }
  };

  // Nettoyer le timer quand le composant est démonté
  useEffect(() => {
    return () => clearMenuTimer();
  }, []);

  return (
    <div className="min-h-screen bg-secondary" onTouchMove={handleTouchMove}>
      {/* Conteneur principal avec effet de flou */}
      <div
        className={`transition-all duration-300 ${
          isMenuOpen ? "blur-sm scale-[0.98] brightness-50" : ""
        }`}
      >
        {/* Header/Navigation */}
        <header className="fixed top-0 w-full bg-dark/80 backdrop-blur-sm z-40 border-b border-primary/10">
          <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-primary">Aïssam K.</h1>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-6">
              <a
                href="#accueil"
                className="nav-link text-light hover:text-primary transition-colors"
              >
                Accueil
              </a>
              <a
                href="#apropos"
                className="nav-link text-light hover:text-primary transition-colors"
              >
                À propos
              </a>
              <a
                href="#projets"
                className="nav-link text-light hover:text-primary transition-colors"
              >
                Projets
              </a>
              <a
                href="#contact"
                className="nav-link text-light hover:text-primary transition-colors"
              >
                Contact
              </a>
            </div>

            {/* Icônes sociales */}
            <div className="hidden md:flex items-center gap-4">
              <a
                href="https://github.com/AissamK31"
                target="_blank"
                rel="noopener noreferrer"
                className="text-light/80 hover:text-primary transition-colors icon-hover"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden text-light p-3 focus:outline-none bg-dark shadow-lg shadow-black/20 rounded-lg hover:bg-dark/80 border border-primary/20 icon-hover"
              aria-label="Menu"
            >
              <div className="w-7 h-6 relative flex flex-col justify-between">
                <span
                  className={`w-full h-0.5 bg-primary shadow-sm transition-all duration-300 ${
                    isMenuOpen ? "rotate-45 translate-y-2.5" : ""
                  }`}
                />
                <span
                  className={`w-full h-0.5 bg-primary shadow-sm transition-all duration-300 ${
                    isMenuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`w-full h-0.5 bg-primary shadow-sm transition-all duration-300 ${
                    isMenuOpen ? "-rotate-45 -translate-y-2.5" : ""
                  }`}
                />
              </div>
            </button>
          </nav>
        </header>

        {/* Hero Section */}
        <section id="accueil" className="section pt-32 bg-hex-pattern">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="text-primary">Aïssam KALI</span>
                <br />
                Développeur Web & Mobile
              </h1>
              <p className="text-xl text-neutral mb-8 max-w-2xl mx-auto">
                24 ans, méthodique et analytique, je transforme des concepts
                complexes en solutions élégantes
              </p>
              <div className="flex justify-center gap-4">
                <a href="#contact" className="btn btn-primary">
                  Me contacter
                </a>
                <a
                  href="https://github.com/AissamK31"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn bg-dark text-light hover:bg-dark/80"
                >
                  GitHub
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Placeholder sections */}
        <section id="apropos" className="section bg-dark">
          <div className="container">
            <h2 className="section-title">À propos</h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <h3 className="text-2xl font-semibold text-primary">
                  Mon Parcours
                </h3>
                <p className="text-light/90 leading-relaxed">
                  Issu d'un parcours en comptabilité (Bac ES et BTS), j'ai
                  choisi de me réorienter vers le développement web, une passion
                  qui allie créativité et rigueur. Ma formation chez Simplon
                  Valenciennes m'a permis d'acquérir une solide base en
                  développement front-end.
                </p>
                <div className="space-y-2">
                  <h4 className="text-xl font-medium text-primary">
                    Formation
                  </h4>
                  <ul className="list-disc list-inside text-light/90 space-y-1">
                    <li>
                      Formation Développeur Front-End - Simplon Valenciennes
                    </li>
                    <li>BTS Comptabilité</li>
                    <li>Baccalauréat ES</li>
                  </ul>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-2xl font-semibold text-primary mb-4">
                    Compétences Techniques
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="card">
                      <h4 className="text-primary font-medium mb-2">
                        Front-End
                      </h4>
                      <ul className="space-y-2 text-light/90">
                        <li className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-primary rounded-full"></span>
                          HTML/CSS
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-primary rounded-full"></span>
                          JavaScript
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-primary rounded-full"></span>
                          React
                        </li>
                      </ul>
                    </div>
                    <div className="card">
                      <h4 className="text-primary font-medium mb-2">
                        Soft Skills
                      </h4>
                      <ul className="space-y-2 text-light/90">
                        <li className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-primary rounded-full"></span>
                          Méthodique
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-primary rounded-full"></span>
                          Autodidacte
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-primary rounded-full"></span>
                          Attentif
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <h3 className="text-xl font-semibold text-primary mb-3">
                    Objectif Professionnel
                  </h3>
                  <p className="text-light/90 leading-relaxed">
                    Je me spécialise dans le développement web front-end en tant
                    que freelance, avec une approche méthodique et un engagement
                    fort pour la satisfaction client. Mon background en
                    comptabilité m'apporte une rigueur précieuse dans la gestion
                    de projets.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why Choose Me Section */}
        <section className="section">
          <div className="container">
            <h2 className="section-title">Pourquoi me choisir ?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="card hover:border hover:border-primary/20"
              >
                <div className="text-primary mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-primary mb-2">
                  Double Expertise
                </h3>
                <p className="text-light/90">
                  Mon background en comptabilité combiné au développement web
                  m'apporte une vision unique pour créer des solutions adaptées
                  à vos besoins business.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="card hover:border hover:border-primary/20"
              >
                <div className="text-primary mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-primary mb-2">
                  Efficacité Garantie
                </h3>
                <p className="text-light/90">
                  Une approche méthodique et structurée qui assure des livrables
                  de qualité dans les délais impartis. Votre satisfaction est ma
                  priorité.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="card hover:border hover:border-primary/20"
              >
                <div className="text-primary mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-primary mb-2">
                  Communication Claire
                </h3>
                <p className="text-light/90">
                  Une communication transparente et régulière tout au long du
                  projet. Vous restez informé et impliqué à chaque étape.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="projets" className="section bg-dark">
          <div className="container">
            <h2 className="section-title">Mes Projets</h2>
            <div className="space-y-8">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <p className="text-light/90 text-lg">
                  En tant que développeur junior passionné, je suis actuellement
                  en phase de création de projets innovants. Voici les types de
                  projets sur lesquels je peux intervenir :
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="card group"
                >
                  <div className="relative">
                    <div className="text-primary mb-4 transform group-hover:scale-110 transition-transform origin-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-16 w-16 mx-auto"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-primary mb-3">
                      Sites Vitrines Professionnels
                    </h3>
                    <p className="text-light/90 mb-4">
                      Création de sites web modernes et responsive pour mettre
                      en valeur votre activité. Design épuré et expérience
                      utilisateur optimisée.
                    </p>
                    <ul className="text-light/80 space-y-2">
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-primary rounded-full"></span>
                        Design moderne et responsive
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-primary rounded-full"></span>
                        Optimisation SEO
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-primary rounded-full"></span>
                        Performance optimale
                      </li>
                    </ul>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="card group"
                >
                  <div className="relative">
                    <div className="text-primary mb-4 transform group-hover:scale-110 transition-transform origin-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-16 w-16 mx-auto"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-primary mb-3">
                      Applications Web Personnalisées
                    </h3>
                    <p className="text-light/90 mb-4">
                      Développement d'applications web sur mesure pour répondre
                      à vos besoins spécifiques. Solutions intuitives et
                      évolutives.
                    </p>
                    <ul className="text-light/80 space-y-2">
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-primary rounded-full"></span>
                        Interface intuitive
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-primary rounded-full"></span>
                        Fonctionnalités sur mesure
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-primary rounded-full"></span>
                        Maintenance et support
                      </li>
                    </ul>
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mt-12"
              >
                <p className="text-light/90 text-lg mb-6">
                  Vous avez un projet en tête ? Discutons-en !
                </p>
                <a href="#contact" className="btn btn-primary">
                  Démarrer une collaboration
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="section bg-dark">
          <div className="container">
            <h2 className="section-title">Disponibilité & Engagement</h2>
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="card text-center"
              >
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-primary"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-primary mb-4">
                  Prêt pour de Nouveaux Défis
                </h3>
                <p className="text-light/90 text-lg mb-6">
                  En tant que développeur junior passionné, je suis actuellement
                  disponible pour des projets freelance. Mon engagement est
                  total pour chaque projet, avec une approche méthodique héritée
                  de mon parcours en comptabilité.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <div className="bg-dark/50 px-4 py-2 rounded-lg border border-primary/10 flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-primary"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-light/90">
                      Disponible immédiatement
                    </span>
                  </div>
                  <div className="bg-dark/50 px-4 py-2 rounded-lg border border-primary/10 flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-primary"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                    </svg>
                    <span className="text-light/90">Formation continue</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="contact" className="section bg-dark">
          <div className="container">
            <h2 className="section-title">Contact</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="card">
                  <h3 className="text-xl font-semibold text-primary mb-4">
                    Informations de Contact
                  </h3>
                  <div className="space-y-3">
                    <p className="flex items-center gap-3 text-light/90">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-primary"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      <a
                        href="mailto:aissam.kali@yahoo.com"
                        className="hover:text-primary transition-colors"
                      >
                        aissam.kali@yahoo.com
                      </a>
                    </p>
                    <p className="flex items-center gap-3 text-light/90">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-primary"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                      <a
                        href="tel:+33695701348"
                        className="hover:text-primary transition-colors"
                      >
                        06 95 70 13 48
                      </a>
                    </p>
                    <p className="flex items-center gap-3 text-light/90">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-primary"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                        />
                      </svg>
                      <a
                        href="https://github.com/AissamK31"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors"
                      >
                        github.com/AissamK31
                      </a>
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="card"
              >
                <h3 className="text-xl font-semibold text-primary mb-4">
                  Envoyez-moi un message
                </h3>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-light/90 mb-2">
                      Nom
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full bg-secondary p-2 rounded border border-primary/20 text-light focus:border-primary outline-none transition-colors input-focus"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-light/90 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full bg-secondary p-2 rounded border border-primary/20 text-light focus:border-primary outline-none transition-colors input-focus"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-light/90 mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows="4"
                      className="w-full bg-secondary p-2 rounded border border-primary/20 text-light focus:border-primary outline-none transition-colors input-focus"
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary w-full">
                    Envoyer
                  </button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-dark text-neutral py-8 border-t border-primary/10">
          <div className="container text-center">
            <p>© 2024 Aïssam KALI. Tous droits réservés.</p>
          </div>
        </footer>
      </div>

      {/* Mobile Menu (en dehors du conteneur avec flou) */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMenu}
              className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed inset-x-0 top-0 h-screen bg-dark shadow-xl md:hidden z-50"
              onMouseMove={handleMenuInteraction}
              onTouchStart={handleMenuInteraction}
            >
              <div className="flex flex-col gap-8 p-6 pt-24 h-full bg-gradient-to-b from-dark to-dark/95">
                <a
                  href="#accueil"
                  onClick={toggleMenu}
                  className="text-light hover:text-primary transition-colors py-4 px-4 rounded-lg hover:bg-dark/90 bg-black/20 backdrop-blur-sm shadow-lg text-xl text-center"
                >
                  Accueil
                </a>
                <a
                  href="#apropos"
                  onClick={toggleMenu}
                  className="text-light hover:text-primary transition-colors py-4 px-4 rounded-lg hover:bg-dark/90 bg-black/20 backdrop-blur-sm shadow-lg text-xl text-center"
                >
                  À propos
                </a>
                <a
                  href="#projets"
                  onClick={toggleMenu}
                  className="text-light hover:text-primary transition-colors py-4 px-4 rounded-lg hover:bg-dark/90 bg-black/20 backdrop-blur-sm shadow-lg text-xl text-center"
                >
                  Projets
                </a>
                <a
                  href="#contact"
                  onClick={toggleMenu}
                  className="text-light hover:text-primary transition-colors py-4 px-4 rounded-lg hover:bg-dark/90 bg-black/20 backdrop-blur-sm shadow-lg text-xl text-center"
                >
                  Contact
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
