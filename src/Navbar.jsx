import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Link } from "react-router-dom"; // Moved import to top
import logo from "./assets/download.svg";
import "./Navbar.css";

const buttons = ["Get Started", "DeFi", "Security", "Guides"];

// Map text to paths
const getPath = (text) => {
  if (text === "Get Started") return "/get-started";
  if (text === "DeFi") return "/defi";
  if (text === "Security") return "/security";
  return "/guides";
};

export default function Navbar() {
  const btnRefs = useRef([]);
  // ... (rest of component logic unchanged until JSX)

  const hideTl = useRef(null);
  const idleTimer = useRef(null);
  const lastScroll = useRef(0);

  const [plusHover, setPlusHover] = useState(false);

  /* ================= GSAP TIMELINE ================= */
  useEffect(() => {
    hideTl.current = gsap.timeline({ paused: true });

    hideTl.current.to(btnRefs.current, {
      y: -90,
      opacity: 0,
      stagger: 0.08,
      ease: "power4.inOut",
      onStart: () => {
        btnRefs.current.forEach((el) => {
          if (el) el.style.pointerEvents = "none";
        });
      },
      onReverseComplete: () => {
        btnRefs.current.forEach((el) => {
          if (el) el.style.pointerEvents = "auto";
        });
      },
    });

    return () => hideTl.current.kill();
  }, []);

  /* ================= IDLE TIMER (5s) ================= */
  const startIdleTimer = () => {
    clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => {
      hideTl.current.play();
    }, 5000);
  };

  useEffect(() => {
    startIdleTimer();

    const onMouseMove = () => {
      hideTl.current.reverse();
      startIdleTimer();
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      clearTimeout(idleTimer.current);
    };
  }, []);

  /* ================= SCROLL (UNCHANGED) ================= */
  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;

      if (current > lastScroll.current) {
        hideTl.current.play();
      } else {
        hideTl.current.reverse();
      }

      lastScroll.current = current;
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ================= PLUS OVERRIDE ================= */
  useEffect(() => {
    if (plusHover) {
      hideTl.current.reverse();
      clearTimeout(idleTimer.current);
    } else {
      startIdleTimer();
    }
  }, [plusHover]);

  /* ================= 3D FLIP (BOX ROLL) ================= */
  const flipIn = (el) =>
    gsap.to(el, {
      rotateX: 90,
      scale: 1.0, // Box roll usually stays same scale or slight pop
      duration: 0.5,
      ease: "power2.out", // Snappier
    });

  const flipOut = (el) =>
    gsap.to(el, {
      rotateX: 0,
      scale: 1,
      duration: 0.5,
      ease: "power2.out",
    });

  return (
    <header className="topbar">
      <div className="nav-inner">

        {/* LOGO */}
        {/* LOGO */}
        <Link
          to="/"
          className="logo-circle"
          onMouseEnter={(e) =>
            gsap.to(e.currentTarget, { rotate: 360, duration: 0.8 })
          }
          onMouseLeave={(e) =>
            gsap.to(e.currentTarget, { rotate: 0, duration: 0.8 })
          }
        >
          <img src={logo} alt="logo" />
        </Link>

        {/* BUTTONS */}
        <div className="nav-links">
          {buttons.map((text, i) => (
            <Link
              to={getPath(text)}
              key={i}
              ref={(el) => (btnRefs.current[i] = el)}
              className="nav-btn-3d"
              style={{ textDecoration: 'none' }} // Remove default link style
            >
              <div
                className={`btn-inner color-${i}`}
                onMouseEnter={(e) => flipIn(e.currentTarget)}
                onMouseLeave={(e) => flipOut(e.currentTarget)}
              >
                <div className="btn-face btn-front">{text}</div>
                <div className="btn-face btn-back">{text}</div>
              </div>
            </Link>
          ))}

          {/* PLUS */}
          <button
            className="plus-btn"
            onMouseEnter={() => setPlusHover(true)}
            onMouseLeave={() => setPlusHover(false)}
          >
            {plusHover ? "−" : "+"}
          </button>

          {/* LAUNCH */}
          <div className="nav-btn-3d">
            <div
              className="btn-inner color-launch"
              onMouseEnter={(e) => flipIn(e.currentTarget)}
              onMouseLeave={(e) => flipOut(e.currentTarget)}
            >
              <div className="btn-face btn-front">Launch App</div>
              <div className="btn-face btn-back">Launch App</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
