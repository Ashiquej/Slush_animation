import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MagGlassSticker, UserSticker } from './Stickers';
import './GuidesPage.css';
import NewsletterSupport from './NewsletterSupport';
import FooterSection from './FooterSection';

import coinani from './assets/coinani.svg';
import coinarrow from './assets/coinarrow.svg';

import slushlink from './assets/slushlink.avif';

import doublecoin from './assets/doublecoin.svg';

import catphone from './assets/catphone.avif';
import profile from './assets/profile.svg';
import connectwallet from './assets/connectwallet.avif';

// Icons for the cards (Custom inline SVGs or re-composed stickers)
const StrategiesIcon = () => (
    <svg viewBox="0 0 120 120" style={{ width: '150px', height: '150px' }}>
        <circle cx="60" cy="60" r="50" fill="none" />
        {/* Broken Coin / Pie simulation */}
        <path d="M60 60 L60 10 A50 50 0 0 1 110 60 Z" fill="#FFD600" stroke="black" strokeWidth="3" transform="translate(5, -5)" />
        <path d="M60 60 L110 60 A50 50 0 0 1 60 110 Z" fill="#FFD600" stroke="black" strokeWidth="3" transform="translate(5, 5)" />
        <path d="M60 60 L60 110 A50 50 0 0 1 10 60 Z" fill="#FFD600" stroke="black" strokeWidth="3" transform="translate(-5, 5)" />
        <path d="M60 60 L10 60 A50 50 0 0 1 60 10 Z" fill="#FFD600" stroke="black" strokeWidth="3" transform="translate(-5, -5)" />

        {/* Inner details to look like coin edges */}
        <path d="M70 40 Q80 30 90 40" fill="none" stroke="black" strokeWidth="2" />
        <path d="M80 70 Q90 80 80 90" fill="none" stroke="black" strokeWidth="2" />
        <path d="M50 80 Q40 90 30 80" fill="none" stroke="black" strokeWidth="2" />
        <path d="M40 50 Q30 40 40 30" fill="none" stroke="black" strokeWidth="2" />
    </svg>
);

const UserArrowsIcon = () => (
    <div style={{ position: 'relative', width: '150px', height: '100px' }}>
        {/* User Head */}
        <svg viewBox="0 0 100 100" style={{ width: '100px', height: '100px', position: 'absolute', left: '25px', zIndex: 2 }}>
            <circle cx="50" cy="50" r="40" fill="#E0C8FF" stroke="black" strokeWidth="2" />
            <circle cx="50" cy="40" r="15" fill="#FFD600" stroke="black" strokeWidth="2" />
            <path d="M25 75C25 60 35 55 50 55C65 55 75 60 75 75" fill="#FFD600" stroke="black" strokeWidth="2" />
        </svg>
        {/* Arrows */}
        <svg viewBox="0 0 100 100" style={{ width: '60px', height: '60px', position: 'absolute', right: '-10px', top: '10px', zIndex: 1, transform: 'rotate(45deg)' }}>
            <path d="M10 50 H80 M60 30 L80 50 L60 70" fill="#62E8A6" stroke="black" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10 50 H80 M60 30 L80 50 L60 70" fill="#62E8A6" stroke="#62E8A6" strokeWidth="4" />
        </svg>
        <svg viewBox="0 0 100 100" style={{ width: '60px', height: '60px', position: 'absolute', left: '-10px', bottom: '10px', zIndex: 1, transform: 'rotate(-135deg)' }}>
            <path d="M10 50 H80 M60 30 L80 50 L60 70" fill="#3B82F6" stroke="black" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    </div>
);

const GuidesPage = () => {
    const cursorFollowerRef = React.useRef(null);
    const xTo = React.useRef(null);
    const yTo = React.useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                // 6. Floating Loop Animation for specific icons (Start after entrance)
                gsap.to(".guide-floating-icon", {
                    y: -15,
                    duration: 2,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    stagger: {
                        each: 0.2,
                        from: "random"
                    }
                });
            }
        });

        // 1. Container Pop-In
        tl.fromTo(".guides-page",
            { scale: 0.95, opacity: 0, y: 30 },
            { scale: 1, opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
        )
            // 2. Stickers Spin-In (Staggered)
            .from(".guides-sticker",
                { scale: 0, rotation: -180, duration: 0.8, stagger: 0.1, ease: "back.out(1.7)" },
                "-=0.4"
            )
            // 3. Title Slide-Up
            .from(".guides-hero-title",
                { y: 50, opacity: 0, duration: 0.8, ease: "power3.out" },
                "-=0.6"
            )
            // 5. Grid Cards Stagger
            .from(".guides-grid .guide-card",
                { y: 50, opacity: 0, stagger: 0.1, duration: 0.8, ease: "back.out(1.7)" },
                "-=0.2"
            )
            // 6. Floating Icons Entrance (Pop & Spin like GetStarted)
            .from(".guide-floating-icon",
                { scale: 0, rotation: -180, duration: 0.8, stagger: 0.1, ease: "back.out(1.7)" },
                "-=0.6"
            );

        // --- Cursor Follower Logic ---
        if (cursorFollowerRef.current) {
            // Initial positioning: Scale 0. NO centering (xPercent) so it starts from top-left.
            gsap.set(cursorFollowerRef.current, { scale: 0 });

            xTo.current = gsap.quickTo(cursorFollowerRef.current, "x", { duration: 0.1, ease: "power3" });
            yTo.current = gsap.quickTo(cursorFollowerRef.current, "y", { duration: 0.1, ease: "power3" });
        }

        const handleMouseMove = (e) => {
            if (xTo.current && yTo.current) {
                // Offset X and Y to place "down right" from cursor
                xTo.current(e.clientX + 75);
                yTo.current(e.clientY + 35);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);

    }, []);

    // Hover Handlers
    const onMouseEnterCard = () => {
        gsap.to(cursorFollowerRef.current, { scale: 1, opacity: 1, duration: 0.4, ease: "power2.out" });
    };

    const onMouseLeaveCard = () => {
        gsap.to(cursorFollowerRef.current, { scale: 0, opacity: 0, duration: 0.4, ease: "power2.out" });
    };

    return (
        <>
            {/* Cursor Follower Element */}
            <div className="cursor-follower" ref={cursorFollowerRef}>LEARN MORE</div>

            <div className="guides-page">

                {/* HERO */}
                <section className="guides-hero">
                    <MagGlassSticker className="guides-sticker" style={{ top: '25%', left: '15%', width: '120px', transform: 'rotate(-15deg)' }} />
                    <UserSticker className="guides-sticker" style={{ bottom: '25%', right: '15%', width: '100px', transform: 'rotate(15deg)' }} />

                    <h1 className="guides-hero-title">USER GUIDES</h1>


                </section>

                {/* GRID */}
                <div className="guides-grid">


                    {/* CARD 1: Slush Strategies */}
                    <div className="guide-card-wrapper" onMouseEnter={onMouseEnterCard} onMouseLeave={onMouseLeaveCard}>
                        <div className="guide-card theme-blue-dark">
                            <div className="guide-card-icon">
                                <div style={{ position: 'relative' }}>
                                    <img src={coinani} alt="Slush Strategies" className="guide-floating-icon" style={{ width: '220px' }} />
                                </div>
                            </div>
                        </div>
                        <div className="guide-card-text">Slush Strategies</div>
                    </div>

                    {/* CARD 2: Slush Tour */}
                    <div className="guide-card-wrapper" onMouseEnter={onMouseEnterCard} onMouseLeave={onMouseLeaveCard}>
                        <div className="guide-card theme-yellow">
                            <div className="guide-card-icon">
                                <img src={coinarrow} alt="Slush Tour" className="guide-floating-icon" style={{ width: '280px' }} />
                            </div>
                        </div>
                        <div className="guide-card-text">Slush Tour</div>
                    </div>

                    {/* CARD 3: Use Slush Links */}
                    <div className="guide-card-wrapper" onMouseEnter={onMouseEnterCard} onMouseLeave={onMouseLeaveCard}>
                        <div className="guide-card theme-blue-light" style={{ padding: '30px 30px 0 30px', alignItems: 'center', justifyContent: 'flex-end' }}>
                            <div className="guide-card-icon" style={{ height: 'auto', width: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                                <img src={slushlink} alt="Use Slush Links" style={{ width: '100%', objectFit: 'contain' }} />
                            </div>
                        </div>
                        <div className="guide-card-text">Use Slush Links</div>
                    </div>

                    {/* CARD 4: Fund your wallet */}
                    <div className="guide-card-wrapper" onMouseEnter={onMouseEnterCard} onMouseLeave={onMouseLeaveCard}>
                        <div className="guide-card theme-purple-light">
                            <div className="guide-card-icon">
                                {/* Stack of coins sim */}
                                <div style={{ position: 'relative' }}>
                                    <img src={doublecoin} alt="Fund your wallet" className="guide-floating-icon" style={{ width: '320px' }} />
                                </div>
                            </div>
                        </div>
                        <div className="guide-card-text">Fund your wallet</div>
                    </div>

                    {/* CARD 5: Connect to NFT */}
                    <div className="guide-card-wrapper" onMouseEnter={onMouseEnterCard} onMouseLeave={onMouseLeaveCard}>
                        <div className="guide-card theme-purple-light" style={{ padding: '30px 30px 0 30px', alignItems: 'center', justifyContent: 'flex-end' }}>
                            <div className="guide-card-icon" style={{ height: 'auto', width: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                                <img src={catphone} alt="Connect to NFT marketplaces" style={{ width: '100%', objectFit: 'contain' }} />
                            </div>
                        </div>
                        <div className="guide-card-text">Connect to NFT marketplaces</div>
                    </div>

                    {/* CARD 6: Create Account */}
                    <div className="guide-card-wrapper" onMouseEnter={onMouseEnterCard} onMouseLeave={onMouseLeaveCard}>
                        <div className="guide-card theme-orange">
                            <div className="guide-card-icon">
                                <img src={profile} alt="Create your account" className="guide-floating-icon" style={{ width: '220px' }} />
                            </div>
                        </div>
                        <div className="guide-card-text">Create your account</div>
                    </div>

                    {/* CARD 7: Connect to apps */}
                    <div className="guide-card-wrapper" onMouseEnter={onMouseEnterCard} onMouseLeave={onMouseLeaveCard}>
                        <div className="guide-card theme-green" style={{ padding: '0 30px 30px 30px', alignItems: 'center', justifyContent: 'flex-start' }}>
                            <div className="guide-card-icon" style={{ height: 'auto', width: '100%', display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
                                <img src={connectwallet} alt="Connect to apps" style={{ width: '100%', objectFit: 'contain' }} />
                            </div>
                        </div>
                        <div className="guide-card-text">Connect to apps</div>
                    </div>

                </div>
            </div>

            <NewsletterSupport />
            <FooterSection />
        </>
    );
};

export default GuidesPage;
