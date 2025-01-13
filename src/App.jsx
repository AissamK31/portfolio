import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const menuTimerRef = useRef(null);

  useEffect(() => {
    // Vérifier la préférence système initiale
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setIsDarkMode(prefersDark);
    document.documentElement.classList.toggle("dark", prefersDark);

    // Écouter les changements de thème système
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => {
      const newDarkMode = e.matches;
      setIsDarkMode(newDarkMode);
      document.documentElement.classList.toggle("dark", newDarkMode);
    };

    mediaQuery.addEventListener("change", handleChange);

    // Nettoyage
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

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
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-secondary" : "bg-light"
      } transition-colors duration-300`}
      onTouchMove={handleTouchMove}
    >
      <div
        className={`transition-all duration-300 ${
          isMenuOpen ? "blur-sm scale-[0.98] brightness-50" : ""
        }`}
      >
        {/* Header/Navigation */}
        <header
          className={`fixed top-0 w-full ${
            isDarkMode ? "bg-dark/80" : "bg-light/80"
          } backdrop-blur-sm z-40 border-b ${
            isDarkMode ? "border-primary/10" : "border-neutral/20"
          }`}
        >
          <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
            <h1
              className={`text-2xl font-bold ${
                isDarkMode ? "text-primary" : "text-primary/90"
              }`}
            >
              Aïssam K.
            </h1>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-6">
              <a
                href="#accueil"
                className={`nav-link ${
                  isDarkMode
                    ? "text-light hover:text-primary"
                    : "text-dark hover:text-primary"
                } transition-colors`}
              >
                Accueil
              </a>
              <a
                href="#apropos"
                className={`nav-link ${
                  isDarkMode
                    ? "text-light hover:text-primary"
                    : "text-dark hover:text-primary"
                } transition-colors`}
              >
                À propos
              </a>
              <a
                href="#projets"
                className={`nav-link ${
                  isDarkMode
                    ? "text-light hover:text-primary"
                    : "text-dark hover:text-primary"
                } transition-colors`}
              >
                Projets
              </a>
              <a
                href="#contact"
                className={`nav-link ${
                  isDarkMode
                    ? "text-light hover:text-primary"
                    : "text-dark hover:text-primary"
                } transition-colors`}
              >
                Contact
              </a>
            </div>

            {/* Icônes sociales et Dark Mode */}
            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg ${
                  isDarkMode
                    ? "bg-dark/50 text-light hover:bg-dark/70"
                    : "bg-light/50 text-dark hover:bg-light/70"
                } transition-all duration-300`}
                aria-label="Changer le thème"
              >
                {isDarkMode ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                )}
              </button>
              <a
                href="https://github.com/AissamK31"
                target="_blank"
                rel="noopener noreferrer"
                className={`${
                  isDarkMode ? "text-light/80" : "text-dark/80"
                } hover:text-primary transition-colors icon-hover`}
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

            {/* Mobile Menu Button avec Dark Mode */}
            <div className="md:hidden flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg ${
                  isDarkMode
                    ? "bg-dark/50 text-light hover:bg-dark/70"
                    : "bg-light/50 text-dark hover:bg-light/70"
                } transition-all duration-300`}
                aria-label="Changer le thème"
              >
                {isDarkMode ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                )}
              </button>
              <button
                onClick={toggleMenu}
                className={`p-3 focus:outline-none ${
                  isDarkMode ? "bg-dark text-light" : "bg-light text-dark"
                } shadow-lg shadow-black/20 rounded-lg hover:bg-opacity-80 border ${
                  isDarkMode ? "border-primary/20" : "border-neutral/20"
                } icon-hover`}
                aria-label="Menu"
              >
                <div className="w-7 h-6 relative flex flex-col justify-between">
                  <span
                    className={`w-full h-0.5 ${
                      isDarkMode ? "bg-primary" : "bg-primary/80"
                    } transition-all duration-300 ${
                      isMenuOpen ? "rotate-45 translate-y-2.5" : ""
                    }`}
                  />
                  <span
                    className={`w-full h-0.5 ${
                      isDarkMode ? "bg-primary" : "bg-primary/80"
                    } transition-all duration-300 ${
                      isMenuOpen ? "opacity-0" : ""
                    }`}
                  />
                  <span
                    className={`w-full h-0.5 ${
                      isDarkMode ? "bg-primary" : "bg-primary/80"
                    } transition-all duration-300 ${
                      isMenuOpen ? "-rotate-45 -translate-y-2.5" : ""
                    }`}
                  />
                </div>
              </button>
            </div>
          </nav>
        </header>

        {/* Hero Section */}
        <section
          id="accueil"
          className={`section pt-32 ${isDarkMode ? "bg-hex-pattern" : ""}`}
        >
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <motion.h1
                className="text-4xl md:text-6xl font-bold mb-6"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-primary">Aïssam KALI</span>
                <br />
                <span className={isDarkMode ? "text-light" : "text-dark"}>
                  Développeur Web & Mobile
                </span>
              </motion.h1>
              <motion.p
                className={`text-xl mb-8 max-w-2xl mx-auto ${
                  isDarkMode ? "text-light/80" : "text-dark/80"
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <span className="text-primary font-semibold">24 ans</span>,
                méthodique et analytique, je transforme des concepts complexes
                en{" "}
                <span className="text-primary font-semibold">
                  solutions élégantes
                </span>
              </motion.p>
              <motion.div
                className="flex justify-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <motion.a
                  href="#contact"
                  className="btn btn-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Démarrer votre projet maintenant
                  <span className="ml-2 text-xs">(Disponible)</span>
                </motion.a>
                <motion.a
                  href="https://github.com/AissamK31"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`btn ${
                    isDarkMode
                      ? "bg-dark text-light hover:bg-dark/80"
                      : "bg-light text-dark hover:bg-light/80 border border-dark/10"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Voir mes réalisations
                </motion.a>
              </motion.div>

              {/* Social Proof */}
              <motion.div
                className="mt-12 flex justify-center gap-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                <div className="text-center">
                  <p className="text-primary text-2xl font-bold">100%</p>
                  <p className={isDarkMode ? "text-light/70" : "text-dark/70"}>
                    Satisfaction client
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-primary text-2xl font-bold">24/7</p>
                  <p className={isDarkMode ? "text-light/70" : "text-dark/70"}>
                    Support réactif
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-primary text-2xl font-bold">&lt;48h</p>
                  <p className={isDarkMode ? "text-light/70" : "text-dark/70"}>
                    Temps de réponse
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Urgency Banner */}
        <motion.div
          className={`py-3 ${
            isDarkMode ? "bg-dark" : "bg-neutral/10"
          } text-center relative overflow-hidden`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <div className="container">
            <p
              className={`text-sm ${
                isDarkMode ? "text-light/90" : "text-dark/90"
              }`}
            >
              <span className="text-primary font-semibold">
                Offre limitée :
              </span>{" "}
              Profitez d'une consultation gratuite pour lancer votre projet web{" "}
              <motion.span
                className="inline-block"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🚀
              </motion.span>
            </p>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent animate-pulse-slow"></div>
        </motion.div>

        {/* À propos Section */}
        <section
          id="a-propos"
          className={`section py-20 ${isDarkMode ? "bg-hex-pattern" : ""}`}
        >
          <div className="container">
            <motion.h2
              className="section-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Mon Parcours
            </motion.h2>
            <motion.div
              className="grid md:grid-cols-2 gap-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="card">
                <h3
                  className={`text-2xl font-bold mb-4 ${
                    isDarkMode ? "text-light" : "text-dark"
                  }`}
                >
                  Formation
                </h3>
                <div className="space-y-4">
                  <motion.div
                    className="relative pl-6 border-l-2 border-primary"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <span className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-primary"></span>
                    <p
                      className={`font-semibold ${
                        isDarkMode ? "text-light" : "text-dark"
                      }`}
                    >
                      2024
                    </p>
                    <p
                      className={isDarkMode ? "text-light/80" : "text-dark/80"}
                    >
                      Formation Développeur Web - Simplon Valenciennes
                    </p>
                  </motion.div>
                  <motion.div
                    className="relative pl-6 border-l-2 border-primary"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <span className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-primary"></span>
                    <p
                      className={`font-semibold ${
                        isDarkMode ? "text-light" : "text-dark"
                      }`}
                    >
                      2022
                    </p>
                    <p
                      className={isDarkMode ? "text-light/80" : "text-dark/80"}
                    >
                      BTS Comptabilité
                    </p>
                  </motion.div>
                  <motion.div
                    className="relative pl-6 border-l-2 border-primary"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <span className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-primary"></span>
                    <p
                      className={`font-semibold ${
                        isDarkMode ? "text-light" : "text-dark"
                      }`}
                    >
                      2019
                    </p>
                    <p
                      className={isDarkMode ? "text-light/80" : "text-dark/80"}
                    >
                      Baccalauréat ES
                    </p>
                  </motion.div>
                </div>
              </div>

              <div className="card">
                <h3
                  className={`text-2xl font-bold mb-4 ${
                    isDarkMode ? "text-light" : "text-dark"
                  }`}
                >
                  Compétences
                </h3>
                <div className="space-y-6">
                  <div>
                    <h4
                      className={`font-semibold mb-2 ${
                        isDarkMode ? "text-light" : "text-dark"
                      }`}
                    >
                      Technologies en cours d'apprentissage
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {["HTML5", "CSS3", "JavaScript", "React.js"].map(
                        (skill, index) => (
                          <motion.span
                            key={skill}
                            className={`px-3 py-1 rounded-full text-sm ${
                              isDarkMode
                                ? "bg-dark text-light"
                                : "bg-light text-dark"
                            } border border-primary/20`}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            whileHover={{
                              scale: 1.05,
                              borderColor: "rgba(220, 38, 38, 0.5)",
                            }}
                            transition={{ delay: index * 0.1 }}
                          >
                            {skill}
                          </motion.span>
                        )
                      )}
                    </div>
                  </div>

                  <div>
                    <h4
                      className={`font-semibold mb-2 ${
                        isDarkMode ? "text-light" : "text-dark"
                      }`}
                    >
                      Qualités personnelles
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Méthodique",
                        "Analytique",
                        "Rigoureux",
                        "Autonome",
                      ].map((skill, index) => (
                        <motion.span
                          key={skill}
                          className={`px-3 py-1 rounded-full text-sm ${
                            isDarkMode
                              ? "bg-dark text-light"
                              : "bg-light text-dark"
                          } border border-primary/20`}
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          whileHover={{
                            scale: 1.05,
                            borderColor: "rgba(220, 38, 38, 0.5)",
                          }}
                          transition={{ delay: index * 0.1 + 0.5 }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
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
                className="card bg-white dark:bg-dark/50 hover:border hover:border-primary/20"
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
                <p className="text-dark/90 dark:text-light/90">
                  Mon background en comptabilité combiné au développement web
                  m'apporte une vision unique pour créer des solutions adaptées
                  à vos besoins business.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="card bg-white dark:bg-dark/50 hover:border hover:border-primary/20"
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
                <p className="text-dark/90 dark:text-light/90">
                  Une approche méthodique et structurée qui assure des livrables
                  de qualité dans les délais impartis. Votre satisfaction est ma
                  priorité.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="card bg-white dark:bg-dark/50 hover:border hover:border-primary/20"
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
                <p className="text-dark/90 dark:text-light/90">
                  Une communication transparente et régulière tout au long du
                  projet. Vous restez informé et impliqué à chaque étape.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Projets Section */}
        <section
          id="projets"
          className={`section py-20 ${isDarkMode ? "bg-hex-pattern" : ""}`}
        >
          <div className="container">
            <motion.h2
              className="section-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Projets
            </motion.h2>
            <motion.div
              className="max-w-3xl mx-auto text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="card">
                <p
                  className={`text-lg mb-6 ${
                    isDarkMode ? "text-light/80" : "text-dark/80"
                  }`}
                >
                  En tant que développeur en formation, je me concentre
                  actuellement sur l'acquisition des fondamentaux du
                  développement web. Cette section sera bientôt enrichie de
                  projets concrets démontrant mes compétences techniques.
                </p>
                <div className="flex justify-center">
                  <motion.a
                    href="#contact"
                    className="btn btn-primary"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Discutons de votre projet
                  </motion.a>
                </div>
              </div>
            </motion.div>
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

        {/* Contact Section */}
        <section
          id="contact"
          className={`section py-20 ${isDarkMode ? "bg-hex-pattern" : ""}`}
        >
          <div className="container">
            <motion.h2
              className="section-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Démarrons votre projet
            </motion.h2>

            <motion.div
              className="max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="grid md:grid-cols-2 gap-8">
                {/* Contact Info */}
                <div className="space-y-6">
                  <motion.div
                    className="card"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <h3
                      className={`text-2xl font-bold mb-4 ${
                        isDarkMode ? "text-light" : "text-dark"
                      }`}
                    >
                      Contactez-moi
                    </h3>
                    <div className="space-y-4">
                      <motion.a
                        href="mailto:aissam.kali@yahoo.com"
                        className={`flex items-center gap-3 ${
                          isDarkMode ? "text-light/80" : "text-dark/80"
                        } hover:text-primary transition-colors`}
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        aissam.kali@yahoo.com
                      </motion.a>
                      <motion.a
                        href="tel:+33695701348"
                        className={`flex items-center gap-3 ${
                          isDarkMode ? "text-light/80" : "text-dark/80"
                        } hover:text-primary transition-colors`}
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.435a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.435.74a1 1 0 01.836.986V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                        06 95 70 13 48
                      </motion.a>
                      <motion.a
                        href="https://github.com/AissamK31"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center gap-3 ${
                          isDarkMode ? "text-light/80" : "text-dark/80"
                        } hover:text-primary transition-colors`}
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <svg
                          className="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                            clipRule="evenodd"
                          />
                        </svg>
                        GitHub
                      </motion.a>
                    </div>
                  </motion.div>

                  <motion.div
                    className="card"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <h3
                      className={`text-2xl font-bold mb-4 ${
                        isDarkMode ? "text-light" : "text-dark"
                      }`}
                    >
                      Disponibilité
                    </h3>
                    <div className="space-y-4">
                      <div
                        className={`flex items-center gap-3 ${
                          isDarkMode ? "text-light/80" : "text-dark/80"
                        }`}
                      >
                        <svg
                          className="w-5 h-5 text-primary"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <p>Réponse sous 48h maximum</p>
                      </div>
                      <div
                        className={`flex items-center gap-3 ${
                          isDarkMode ? "text-light/80" : "text-dark/80"
                        }`}
                      >
                        <svg
                          className="w-5 h-5 text-primary"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                          />
                        </svg>
                        <p>Disponible pour nouveaux projets</p>
                      </div>
                      <div
                        className={`flex items-center gap-3 ${
                          isDarkMode ? "text-light/80" : "text-dark/80"
                        }`}
                      >
                        <svg
                          className="w-5 h-5 text-primary"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                          />
                        </svg>
                        <p>Devis gratuit sous 24h</p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Contact Form */}
                <motion.div
                  className="card"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <h3
                    className={`text-2xl font-bold mb-6 ${
                      isDarkMode ? "text-light" : "text-dark"
                    }`}
                  >
                    Parlons de votre projet
                  </h3>
                  <form className="space-y-4">
                    <div>
                      <label
                        htmlFor="name"
                        className={`block mb-2 ${
                          isDarkMode ? "text-light/80" : "text-dark/80"
                        }`}
                      >
                        Nom complet
                      </label>
                      <motion.input
                        whileFocus={{ scale: 1.01 }}
                        type="text"
                        id="name"
                        className={`w-full px-4 py-2 rounded border ${
                          isDarkMode
                            ? "bg-dark border-light/10 text-light focus:border-primary/50"
                            : "bg-white border-dark/10 text-dark focus:border-primary/50"
                        } focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all`}
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className={`block mb-2 ${
                          isDarkMode ? "text-light/80" : "text-dark/80"
                        }`}
                      >
                        Email
                      </label>
                      <motion.input
                        whileFocus={{ scale: 1.01 }}
                        type="email"
                        id="email"
                        className={`w-full px-4 py-2 rounded border ${
                          isDarkMode
                            ? "bg-dark border-light/10 text-light focus:border-primary/50"
                            : "bg-white border-dark/10 text-dark focus:border-primary/50"
                        } focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all`}
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="message"
                        className={`block mb-2 ${
                          isDarkMode ? "text-light/80" : "text-dark/80"
                        }`}
                      >
                        Message
                      </label>
                      <motion.textarea
                        whileFocus={{ scale: 1.01 }}
                        id="message"
                        rows="4"
                        className={`w-full px-4 py-2 rounded border ${
                          isDarkMode
                            ? "bg-dark border-light/10 text-light focus:border-primary/50"
                            : "bg-white border-dark/10 text-dark focus:border-primary/50"
                        } focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all`}
                        required
                      ></motion.textarea>
                    </div>
                    <motion.button
                      type="submit"
                      className="btn btn-primary w-full"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Envoyer le message
                    </motion.button>
                  </form>
                </motion.div>
              </div>

              {/* Trust Indicators */}
              <motion.div
                className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                <div className="text-center">
                  <motion.div
                    className="w-12 h-12 mx-auto mb-3 text-primary"
                    animate={{ rotateY: 360 }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </motion.div>
                  <h4
                    className={`font-semibold ${
                      isDarkMode ? "text-light" : "text-dark"
                    }`}
                  >
                    Sécurisé
                  </h4>
                  <p
                    className={`text-sm ${
                      isDarkMode ? "text-light/70" : "text-dark/70"
                    }`}
                  >
                    Protection des données
                  </p>
                </div>

                <div className="text-center">
                  <motion.div
                    className="w-12 h-12 mx-auto mb-3 text-primary"
                    animate={{ rotateY: 360 }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                      delay: 0.5,
                    }}
                  >
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </motion.div>
                  <h4
                    className={`font-semibold ${
                      isDarkMode ? "text-light" : "text-dark"
                    }`}
                  >
                    Rapide
                  </h4>
                  <p
                    className={`text-sm ${
                      isDarkMode ? "text-light/70" : "text-dark/70"
                    }`}
                  >
                    Réponse sous 48h
                  </p>
                </div>

                <div className="text-center">
                  <motion.div
                    className="w-12 h-12 mx-auto mb-3 text-primary"
                    animate={{ rotateY: 360 }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                      delay: 1,
                    }}
                  >
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </motion.div>
                  <h4
                    className={`font-semibold ${
                      isDarkMode ? "text-light" : "text-dark"
                    }`}
                  >
                    Fiable
                  </h4>
                  <p
                    className={`text-sm ${
                      isDarkMode ? "text-light/70" : "text-dark/70"
                    }`}
                  >
                    Engagement qualité
                  </p>
                </div>

                <div className="text-center">
                  <motion.div
                    className="w-12 h-12 mx-auto mb-3 text-primary"
                    animate={{ rotateY: 360 }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                      delay: 1.5,
                    }}
                  >
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                      />
                    </svg>
                  </motion.div>
                  <h4
                    className={`font-semibold ${
                      isDarkMode ? "text-light" : "text-dark"
                    }`}
                  >
                    Support
                  </h4>
                  <p
                    className={`text-sm ${
                      isDarkMode ? "text-light/70" : "text-dark/70"
                    }`}
                  >
                    Assistance continue
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer
          className={`py-8 border-t ${
            isDarkMode
              ? "bg-dark border-primary/10 text-light/90"
              : "bg-light border-dark/10 text-dark/90"
          }`}
        >
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
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed inset-y-0 right-0 w-64 bg-dark shadow-xl md:hidden z-50"
              onMouseMove={handleMenuInteraction}
              onTouchStart={handleMenuInteraction}
            >
              <div className="flex flex-col gap-4 p-6 pt-20 h-full bg-gradient-to-b from-dark to-dark/95">
                <a
                  href="#accueil"
                  onClick={toggleMenu}
                  className="text-light hover:text-primary transition-colors py-3 px-4 rounded-lg hover:bg-dark/90 bg-black/20 backdrop-blur-sm shadow-lg"
                >
                  Accueil
                </a>
                <a
                  href="#apropos"
                  onClick={toggleMenu}
                  className="text-light hover:text-primary transition-colors py-3 px-4 rounded-lg hover:bg-dark/90 bg-black/20 backdrop-blur-sm shadow-lg"
                >
                  À propos
                </a>
                <a
                  href="#projets"
                  onClick={toggleMenu}
                  className="text-light hover:text-primary transition-colors py-3 px-4 rounded-lg hover:bg-dark/90 bg-black/20 backdrop-blur-sm shadow-lg"
                >
                  Projets
                </a>
                <a
                  href="#contact"
                  onClick={toggleMenu}
                  className="text-light hover:text-primary transition-colors py-3 px-4 rounded-lg hover:bg-dark/90 bg-black/20 backdrop-blur-sm shadow-lg"
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
