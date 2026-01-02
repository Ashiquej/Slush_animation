import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { KeySticker, LockSticker, CoinSticker } from './Stickers';
import './SecurityPage.css';
import './PageLayout.css'; // Import shared styles for the Hero
import CardCarooSection from './CardCarooSection';

// Assets
import lockprofile from './assets/lockprofile.svg';
import phonehippo from './assets/phonehippo.svg';
import startick from './assets/startick.svg';
import lockonthescreen from './assets/lockonthescreen.svg';
import NewsletterSupport from './NewsletterSupport';
import FooterSection from './FooterSection';

gsap.registerPlugin(ScrollTrigger);

const SecurityPage = () => {
    // Hero Animation Refs
    const titleRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline();
        tl.fromTo(titleRef.current,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
        );
        // Animate stickers
        [0, 1, 2].forEach((i) => {
            gsap.fromTo(`.sticker-${i}`,
                { scale: 0, rotation: -180 },
                { scale: 1, rotation: 0, duration: 0.8, delay: 0.2 + (i * 0.1), ease: "back.out(1.7)" }
            );
        });

        // Scroll Animations for Grid Cards
        gsap.utils.toArray('.sec-grid-card').forEach((card, i) => {
            gsap.fromTo(card,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%"
                    }
                }
            );
        });

    }, []);

    const stickers = [
        { component: <KeySticker />, style: { top: '30%', left: '48%', width: '100px', transform: 'rotate(45deg)' } },
        { component: <CoinSticker />, style: { bottom: '25%', left: '15%', width: '120px', transform: 'rotate(-15deg)' } },
        { component: <LockSticker />, style: { bottom: '25%', right: '15%', width: '100px', transform: 'rotate(15deg)' } }
    ];

    return (
        <div className="security-page-wrapper">
            {/* HERO CARD ("PageLayout" reconstruction) */}
            <div className="page-card security-hero-card">
                <div className="page-content-wrapper">
                    <h1 className="page-title" ref={titleRef}>
                        SAFE. PRIVATE. <br /> SECURE.
                    </h1>
                    {stickers.map((s, i) => (
                        <div key={i} className={`sticker sticker-${i}`} style={s.style}>
                            {s.component}
                        </div>
                    ))}
                    {/* No buttons */}
                </div>
            </div>

            {/* FEATURE GRID */}
            <div className="security-grid">

                {/* ROW 1 */}
                <div className="sec-grid-card theme-orange text-card">
                    <h2 className="sec-card-title">100%<br />NON-CUSTODIAL</h2>
                    <p className="sec-card-desc">Your keys, your assets—full control, no middlemen, no compromises.</p>
                </div>
                {/* 2nd Card: Lock Profile */}
                <div className="sec-grid-card theme-white visual-card">
                    <img src={lockprofile} alt="Lock Profile" />
                </div>

                {/* ROW 2 */}
                {/* 3rd Card: Phone Hippo */}
                <div className="sec-grid-card theme-white visual-card">
                    <img src={phonehippo} alt="Phone Hippo" />
                </div>
                <div className="sec-grid-card theme-yellow text-card">
                    <h2 className="sec-card-title">TRANSACTION<br />SAFEGUARDS</h2>
                    <p className="sec-card-desc">Your actions are protected with fraud prevention and security checks.</p>
                </div>

                {/* ROW 3 */}
                <div className="sec-grid-card theme-green text-card">
                    <h2 className="sec-card-title">SECURE<br />INTEGRATIONS</h2>
                    <p className="sec-card-desc">Enhance your security with Ledger and other trusted integrations.</p>
                </div>
                {/* 6th Card: Star Tick */}
                <div className="sec-grid-card theme-white visual-card">
                    <img src={startick} alt="Secure Integrations" />
                </div>

                {/* ROW 4 */}
                {/* 7th Card: Lock on Screen */}
                <div className="sec-grid-card theme-white visual-card">
                    <img src={lockonthescreen} alt="Future Proof" />
                </div>
                <div className="sec-grid-card theme-purple text-card">
                    <h2 className="sec-card-title">FUTURE-PROOF<br />PROTECTION</h2>
                    <p className="sec-card-desc">Built with robust security protocols to safeguard your assets now and beyond.</p>
                </div>

            </div>

            {/* NEW CAROUSEL SECTION */}
            <CardCarooSection />
            <NewsletterSupport />
            <FooterSection />
        </div>
    );
};

export default SecurityPage;
