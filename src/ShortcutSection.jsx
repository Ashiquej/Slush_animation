import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import './ShortcutSection.css';

// Importing existing assets for placeholders
import coinfull from "./assets/coinfull.svg";
import earnnow from "./assets/earnnow.svg";
import img1600 from './assets/16000.svg';

gsap.registerPlugin(ScrollTrigger);

const ShortcutSection = () => {
    const sectionRef = useRef(null);
    const rowsRef = useRef([]);

    useEffect(() => {
        const rows = rowsRef.current;

        rows.forEach((row, index) => {
            if (!row) return;

            // Animate each row on scroll
            gsap.fromTo(row,
                { opacity: 0, y: 100 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: row,
                        start: "top 80%", // Start when row top is at 80% viewport
                        end: "bottom 20%",
                        toggleActions: "play reverse play reverse", // Reverses on scroll up
                        // markers: true // Debug if needed
                    }
                }
            );

            // Parallax effect for internal images?
            const img = row.querySelector('.sc-img-icon');
            if (img) {
                gsap.to(img, {
                    y: -30,
                    ease: "none",
                    scrollTrigger: {
                        trigger: row,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true
                    }
                });
            }
        });

        return () => {
            ScrollTrigger.killAll();
        };
    }, []);

    const addToRefs = (el) => {
        if (el && !rowsRef.current.includes(el)) {
            rowsRef.current.push(el);
        }
    };

    return (
        <section className="shortcut-section" ref={sectionRef}>
            <div className="shortcut-container">

                <header className="shortcut-header">
                    <h2 className="shortcut-title">Your shortcut to DeFi.</h2>
                </header>

                {/* ROW 1: Green / Coin -> Text */}
                <div className="shortcut-row" ref={addToRefs}>
                    <div className="sc-visual theme-green">
                        <img src={coinfull} alt="DeFi Opportunities" className="sc-img-icon" />
                    </div>
                    <div className="sc-content">
                        <h3 className="sc-headline">EXPLORE DEFI<br />OPPORTUNITIES</h3>
                        <p className="sc-desc">Discover vetted ways to put your crypto to work through Sui DeFi protocols, all from your Slush wallet.</p>
                        <Link to="/defi" className="sc-btn">
                            START NOW ↗
                        </Link>
                    </div>
                </div>

                {/* ROW 2: Text -> Purple / Earn */}
                <div className="shortcut-row reverse" ref={addToRefs}>
                    <div className="sc-visual theme-purple">
                        {/* Using Wallet icon as placeholder for 'Earn' taps */}
                        <img src={earnnow} alt="Direct Execution" className="sc-img-icon" />
                    </div>
                    <div className="sc-content">
                        <h3 className="sc-headline">SIMPLE, DIRECT<br />EXECUTION</h3>
                        <p className="sc-desc">Enter and manage in a few taps. Withdraw rewards in the asset you choose.</p>
                        {/* No button on this row in screenshot? Or maybe add one if consistent. Screenshot 3 doesn't show button nearby but screenshot 4 shows Wallet Ready. Let's assume consistent layout or just text. Screenshot 2 shows button. Screenshot 3 doesn't. */}
                    </div>
                </div>

                {/* ROW 3: Blue / Options -> Text */}
                <div className="shortcut-row" ref={addToRefs}>
                    <div className="sc-visual theme-blue">
                        <img src={img1600} alt="Simplified Options" className="sc-img-icon" />
                    </div>
                    <div className="sc-content">
                        <h3 className="sc-headline">WALLET READY,<br />SIMPLIFIED<br />OPTIONS</h3>
                        <p className="sc-desc">Compare potential rewards and confirm when ready</p>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default ShortcutSection;
