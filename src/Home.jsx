import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import mainimg from "./assets/blue-s.avif";
import "./Home.css";
import rocket from "./assets/rocket.svg";
import wallet from "./assets/wallet.svg";
import smile from "./assets/smile.svg";
import coin from "./assets/coin.svg";
import tick from './assets/tick.svg';
import qr from './assets/qr.png'

import ReachSection from "./ReachSection";
import TestimonialStack from "./TestimonialStack";
import FeaturesSection from "./FeaturesSection";

import FooterSection from "./FooterSection";
import NewsletterSupport from './NewsletterSupport';
import FooterMarquee from "./FooterMarquee";
import ShortcutSection from "./ShortcutSection";
import CaroooSection from "./CaroooSection";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    /* =========================
       MAGNETIC BUTTON EFFECT
    ========================= */
    // Magnetic button effect removed


    /* =========================
       (Old animation removed to avoid conflict)
    ========================= */


    /* =========================
       INTRO TIMELINE
    ========================= */
    const tl = gsap.timeline({ delay: 0.6 });

    /* 🔽 ADD: hide navbar when slush starts */
    tl.to(".topbar", {
      y: -60,
      opacity: 0,
      duration: 0.4,
      ease: "power2.inOut",
    });

    // Hero actions removed


    tl.to(".clip-row", {
      y: -400,
      duration: 1.2,
      stagger: 0.15,
      ease: "power4.inOut",
    });

    tl.set(".slush-svg", { display: "none" });

    tl.set(".slush-static", { visibility: "visible" });
    tl.to(".slush-static", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power4.out",
    });

    tl.set(".hero-sub", { visibility: "visible" });
    tl.to(".hero-sub", {
      opacity: 1,
      y: 0,
      duration: 0.6,
    });

    /* 🔼 ADD: show navbar again after slush */
    tl.to(".topbar", {
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: "power3.out",
    }, "-=0.4");

    // Hero actions animation removed


    /* =========================
       FLOATING ICONS
    ========================= */
    gsap.to(".float", {
      y: 12,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.4,
    });

    /* =========================
       HERO FADE OUT & SECOND SECTION FADE IN
    ========================= */
    const fadeInTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero",
        start: "30% top", // Wait until 30% scrolled before starting fade
        end: "bottom 40%", // Fade out completes when bottom is near middle
        scrub: 1, // Add some smoothness/lag to the scrub
      }
    });

    // 1. Hero Content Exit (Legacy Parallax + New Fade)
    fadeInTl.to([".slush-wrap", ".hero-sub", ".float"], {
      y: -150,
      opacity: 0, // Fade out as we scroll down
      duration: 1,
      ease: "power1.inOut" // Smoother fade
    });

    // 2. Second Section Entry
    // We want the text to start invisible and slide up + fade in
    gsap.fromTo(
      ".slush-second-wrap .slush-word",
      {
        y: 100,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".slush-second-wrap",
          start: "top 80%", // Start animating when top of section hits 80% viewport height
          end: "bottom 80%",
          scrub: 1, // Smooth reverse on scroll up
          toggleActions: "play reverse play reverse"
        }
      }
    );

    // Also animate the icons/images in second wrap for completeness
    gsap.fromTo(
      [".slush-inline-icon", ".qr-download", ".slush-wallet-icon"],
      {
        y: 100,
        opacity: 0,
        scale: 0.8
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        stagger: 0.15,
        duration: 1,
        delay: 0.1, // Slight delay after text
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".slush-second-wrap",
          start: "top 80%",
          end: "bottom 80%",
          scrub: 1
        }
      }
    );

    /* =========================
       SLUSH SCROLL DISTORTION
    ========================= */
    gsap.to(".slush-static", {
      scrollTrigger: {
        trigger: ".hero",
        start: "top center",
        end: "bottom top",
        scrub: true,
      },
      scaleY: 1.05,
      scaleX: 0.98,
    });

    return () => {
      ScrollTrigger.killAll();
      gsap.killTweensOf("*");
    };
  }, []);

  return (
    <>
      <div className="marquee">
        <marquee>UNIFIED DEFI IS HERE: STRATEGIES. LIVE NOW.</marquee>
      </div>

      <section className="hero" ref={heroRef}>
        <img src={mainimg} className="hero-bg" alt="" />

        <div className="slush-wrap">
          <h1 className="slush-static">SLUSH</h1>

          <svg
            className="slush-svg"
            viewBox="0 0 1200 400"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <clipPath id="slushClip">
                {[0, 1, 2, 3].map((i) => (
                  <rect
                    key={i}
                    className="clip-row"
                    x="0"
                    y={i * 100}
                    width="1200"
                    height="100"
                  />
                ))}
              </clipPath>
            </defs>

            <text
              x="50%"
              y="78%"
              textAnchor="middle"
              clipPath="url(#slushClip)"
              className="slush-svg-text"
            >
              SLUSH
            </text>
          </svg>

          <div className="float rocket">

            <img src={rocket} alt="" style={{ width: "100px", height: "100px" }} />
          </div>

          <div className="float smile">
            <img src={smile} alt="" style={{ width: "100px", height: "100px" }} />
          </div>

          <div className="float wallet">

            <img src={wallet} alt="" style={{ width: "200px", height: "200px" }} />
          </div>

          <div className="float coin">
            <img src={coin} className="coin-glow" alt="" style={{ width: "200px", height: "200px" }} />
          </div>
        </div>

        <p className="hero-sub text-center ">Your money. Unstuck.</p>

        {/* Buttons removed */}

        <div className="noise" />



        <div className="slush-second-wrap">
          <div className="slush-line slush-line-1">
            <span className="slush-word">ALL</span>
            <img src={coin} className="slush-inline-icon icon-coin coin-glow" alt="" style={{ width: "150px", height: "150px" }} />
            <span className="slush-word">THINGS SUI</span>
          </div>

          <div className="slush-line slush-line-2">

            <span className="slush-word">ALL IN</span>

            <div className="qr-download">
              <img src={qr} alt="QR" style={{ width: '70px', height: "70px" }} />
              <span>DOWNLOAD</span>
            </div>
          </div>

          <div className="slush-line slush-line-3">
            <span className="slush-word">SLUSH WALLET</span>
            <img src={wallet} className="slush-wallet-icon icon-wallet" alt="" style={{ width: "150px", height: "150px" }} />
          </div>
        </div>

      </section>



      <ShortcutSection />
      <CaroooSection />
      <FooterMarquee />
      <ReachSection />
      <TestimonialStack />
      <FeaturesSection />
      <NewsletterSupport />
      <FooterSection />

    </>
  );
};

export default Home;


