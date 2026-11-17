"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  AudioLines,
  Heart,
  Mail,
  Pause,
  Play,
  Sparkles,
  X,
} from "lucide-react";

const memories = [
  { number: "01", title: "A moment to keep", image: "/images/memories/memory-1.jpg" },
  { number: "02", title: "Little things, big memories", image: "/images/memories/memory-2.jpg" },
  { number: "03", title: "One for the memory book", image: "/images/memories/memory-3.jpg" },
  { number: "04", title: "Always worth remembering", image: "/images/memories/memory-4.jpg" },
];

const letterParagraphs = [
  "Di hari spesial ini, aku ingin mengucapkan selamat ulang tahun untukmu. Semoga hari ini membawa banyak alasan untuk tersenyum dan membuatmu merasa dihargai.",
  "Terima kasih sudah menjadi bagian dari cerita dan perjalanan ini. Aku harap, di tahun yang baru, kamu bertemu lebih banyak hal baik, orang-orang yang tulus, dan kesempatan yang membuatmu semakin dekat dengan apa yang kamu impikan.",
  "Kalau suatu hari keadaan terasa tidak mudah, semoga kamu selalu ingat bahwa kamu sudah melewati banyak hal sampai sejauh ini. Beri dirimu waktu, jangan terlalu keras pada diri sendiri, dan tetap percaya bahwa hal-hal baik masih menunggumu.",
  "Semoga langkahmu selalu dimudahkan, hatimu tetap hangat, dan kebahagiaan datang dalam bentuk-bentuk sederhana yang mungkin tidak pernah kamu duga.",
];

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function BirthdayPage() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [letterOpen, setLetterOpen] = useState(false);
  const [candleBlown, setCandleBlown] = useState(false);
  const [celebrated, setCelebrated] = useState(false);
  const hasAutoPlayed = useRef(false);

  const tryAutoPlay = useCallback(async () => {
    if (hasAutoPlayed.current) return;
    const audio = audioRef.current;
    if (!audio) return;
    try {
      await audio.play();
      setIsPlaying(true);
      hasAutoPlayed.current = true;
      window.removeEventListener("scroll", tryAutoPlay);
      window.removeEventListener("touchstart", tryAutoPlay);
      window.removeEventListener("click", tryAutoPlay);
    } catch {
      // browser blocked, user can click play manually
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", tryAutoPlay, { passive: true });
    window.addEventListener("touchstart", tryAutoPlay, { passive: true });
    window.addEventListener("click", tryAutoPlay);
    return () => {
      window.removeEventListener("scroll", tryAutoPlay);
      window.removeEventListener("touchstart", tryAutoPlay);
      window.removeEventListener("click", tryAutoPlay);
    };
  }, [tryAutoPlay]);

  async function toggleMusic() {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }
    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  }

  function blowCandle() {
    setCandleBlown(true);
    setCelebrated(true);
    window.setTimeout(() => setCelebrated(false), 4200);
  }

  return (
    <main>
      <audio
        ref={audioRef}
        src="/music/Semua Aku Dirayakan [CCw8K2Sskkk].mp3"
        loop
        preload="auto"
        onEnded={() => setIsPlaying(false)}
      />

      <header className="site-header">
        <a className="wordmark" href="#home" aria-label="Back to top">
          <span className="wordmark-mark">B.</span>
          <span> A LITTLE GIFT <i>·</i> 2026</span>
        </a>
        <button className="music-control" onClick={toggleMusic} aria-label={isPlaying ? "Pause music" : "Play music"}>
          {isPlaying ? <Pause size={15} /> : <Play size={15} />}
          <span>{isPlaying ? "PAUSE MUSIC" : "PLAY MUSIC"}</span>
          <AudioLines className={isPlaying ? "sound-wave active" : "sound-wave"} size={16} />
        </button>
      </header>

      <section className="hero" id="home">
        <div className="hero-grain" />
        <div className="hero-orbit orbit-one" />
        <div className="hero-orbit orbit-two" />
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        >
          <div className="eyebrow hero-eyebrow"><span /> 17 NOVEMBER 2026 <span /></div>
          <p className="hero-pretitle">A note for someone wonderful</p>
          <h1>A Day Made<br /><em>For You.</em></h1>
          <div className="hero-rule"><span /></div>
          <p className="hero-recipient">Chintia Aprian</p>
          <p className="hero-subtitle">A little something, made with care.</p>
          <p className="hero-signature">With warmth, Bian</p>
          <a className="scroll-cue" href="#intro">
            <span>SCROLL TO UNWRAP</span>
            <ArrowDown size={14} strokeWidth={1.5} />
          </a>
        </motion.div>
        <div className="hero-side-note">A PERSONAL BIRTHDAY EDITION <span>NO. 001</span></div>
        <div className="hero-bottom-note">MADE FOR THIS MOMENT <span>✳</span> KEPT WITH CARE</div>
      </section>

      <section className="intro section-pad" id="intro">
        <Reveal className="section-index"><span>01</span><span>THE OCCASION</span></Reveal>
        <div className="intro-grid">
          <Reveal>
            <p className="eyebrow">A NEW CHAPTER BEGINS</p>
            <h2>Today, the world<br />gets a little more<br /><em>Chintia.</em></h2>
          </Reveal>
          <Reveal delay={0.15} className="intro-copy">
            <span className="large-quote">“</span>
            <p>Another year, another chapter, and another chance to discover all the beautiful things life has waiting for you.</p>
            <p>May this day remind you how much possibility lives ahead — and how deserving you are of every good thing along the way.</p>
            <div className="small-signature">A birthday wish from Bian <Heart size={13} /></div>
          </Reveal>
        </div>
        <div className="intro-bottom"><span>FOR THE DAYS AHEAD</span><span>WITH THE VERY BEST WISHES</span></div>
      </section>

      <section className="quote-band">
        <div className="quote-band-inner">
          <Sparkles size={19} strokeWidth={1.2} />
          <p>May your next chapter be filled with<br /><em>beautiful little beginnings.</em></p>
          <span>✳</span>
        </div>
      </section>

      <section className="memories section-pad" id="memories">
        <Reveal className="section-index"><span>02</span><span>THE MEMORY BOOK</span></Reveal>
        <Reveal className="memories-heading">
          <p className="eyebrow">LITTLE MOMENTS, LASTING FEELINGS</p>
          <h2>Some things are<br /><em>worth keeping.</em></h2>
          <p className="section-description">A small collection of moments. Add your favourite photos here and let them tell their own stories.</p>
        </Reveal>
        <div className="memory-grid">
          {memories.map((memory, index) => (
            <Reveal key={memory.number} delay={index * 0.12} className={`memory-card memory-card-${index + 1}`}>
              <div className="memory-image-wrap">
                <div className="memory-placeholder">
                  <div className="placeholder-inner">
                    <Sparkles size={19} strokeWidth={1.1} />
                    <span>MEMORY</span>
                    <small>{memory.number} / 04</small>
                  </div>
                </div>
                <img
                  className="memory-photo"
                  src={memory.image}
                  alt={`Memory ${memory.number} for Chintia`}
                  onError={(e) => { e.currentTarget.style.display = "none"; }}
                />
                <span className="memory-number">{memory.number}</span>
              </div>
              <p>{memory.title}</p>
            </Reveal>
          ))}
        </div>
        <p className="memory-footnote"><span>✳</span> THE BEST MEMORIES ARE THE ONES WE CARRY WITH US.</p>
      </section>

      <section className="letter-section section-pad" id="letter">
        <Reveal className="section-index"><span>03</span><span>A LETTER, JUST FOR YOU</span></Reveal>
        <div className="letter-layout">
          <Reveal className="letter-heading">
            <p className="eyebrow">A FEW WORDS FROM ME</p>
            <h2>More than<br />a message.<br /><em>A little piece<br />of my heart.</em></h2>
            <p className="section-description">Some wishes are better written down, so they can be read whenever they are needed.</p>
          </Reveal>
          <Reveal delay={0.12} className="letter-card-wrap">
            <div className="letter-card">
              <div className="letter-card-top"><span>PERSONAL NOTE</span><span>17 · 11 · 26</span></div>
              <div className="letter-seal"><Heart size={17} fill="currentColor" /></div>
              <div className="letter-card-copy">
                <p>To Chintia,</p>
                <h3>A little note<br /><em>for your day.</em></h3>
                <p className="letter-teaser">There are a few things I wanted to say...</p>
              </div>
              <button className="open-letter" onClick={() => setLetterOpen(true)}>
                OPEN YOUR LETTER <ArrowUpRight size={15} />
              </button>
              <div className="letter-card-bottom">WRITTEN WITH CARE <span>✳</span> FROM BIAN</div>
            </div>
          </Reveal>
        </div>
      </section>

      <AnimatePresence>
        {letterOpen && (
          <motion.div className="letter-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setLetterOpen(false)}>
            <motion.article
              className="letter-modal"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.98 }}
              transition={{ duration: 0.35 }}
              onClick={(event) => event.stopPropagation()}
            >
              <button className="close-letter" onClick={() => setLetterOpen(false)} aria-label="Close letter"><X size={19} /></button>
              <div className="modal-topline">A PERSONAL LETTER <span>17 NOVEMBER 2026</span></div>
              <div className="modal-flower">✳</div>
              <p className="letter-dear">Dear Chintia,</p>
              <h2>Happy Birthday<em>.</em></h2>
              {letterParagraphs.map((paragraph) => <p className="letter-paragraph" key={paragraph}>{paragraph}</p>)}
              <p className="letter-closing">Once again, happy birthday.</p>
              <div className="letter-from">Warm wishes,<strong>Bian.</strong></div>
              <div className="modal-bottomline">MADE WITH CARE, JUST FOR YOU <Heart size={12} /></div>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="wish-section section-pad" id="wish">
        <Reveal className="section-index"><span>04</span><span>ONE LAST WISH</span></Reveal>
        <Reveal className="wish-content">
          <p className="eyebrow">TAKE A MOMENT FOR YOURSELF</p>
          <h2>Make a wish,<br /><em>and let it shine.</em></h2>
          <p className="wish-instruction">{candleBlown ? "A little wish has been sent into the universe." : "Close your eyes, make a wish, then blow out the candle."}</p>
          <div className={`cake-scene ${candleBlown ? "is-blown" : ""}`}>
            <div className="candle">
              <div className="candle-wick" />
              <div className="flame"><span /></div>
            </div>
            <div className="cake-top"><span className="icing-drip drip-one" /><span className="icing-drip drip-two" /><span className="icing-drip drip-three" /></div>
            <div className="cake-body"><span className="cake-decoration">✳　✳　✳</span></div>
            <div className="cake-plate" />
            <div className="cake-shadow" />
          </div>
          <button className="wish-button" onClick={() => candleBlown ? setCandleBlown(false) : blowCandle()}>
            {candleBlown ? <><Play size={14} /> LIGHT IT AGAIN</> : <><Sparkles size={14} /> BLOW THE CANDLE</>}
          </button>
          <AnimatePresence>
            {celebrated && (
              <motion.div className="confetti-layer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {Array.from({ length: 34 }).map((_, i) => (
                  <motion.i
                    key={i}
                    style={{ left: `${(i * 37) % 100}%`, background: ["#b89b70", "#d8c9b4", "#f1e9dc", "#927957"][i % 4] }}
                    initial={{ y: -25, opacity: 0, rotate: 0 }}
                    animate={{ y: [0, 250 + (i % 5) * 35], opacity: [1, 1, 0], rotate: [0, 180 + i * 12], x: [0, (i % 2 ? 1 : -1) * (20 + i % 45)] }}
                    transition={{ duration: 2.8 + (i % 5) * 0.2, delay: (i % 9) * 0.035, ease: "easeOut" }}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </Reveal>
      </section>

      <footer className="footer">
        <div className="footer-top"><span>AN ORDINARY DAY, MADE A LITTLE MORE SPECIAL.</span><span>EST. WITH CARE · 2026</span></div>
        <p className="footer-title">For <em>Chintia.</em></p>
        <div className="footer-bottom"><span>© 2026 · A BIRTHDAY GIFT</span><span>MADE BY BIAN <Heart size={11} fill="currentColor" /></span><a href="#home">BACK TO TOP ↑</a></div>
      </footer>
    </main>
  );
}
