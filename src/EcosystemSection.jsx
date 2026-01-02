import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './EcosystemSection.css';
import FlipButton from './components/FlipButton';

// Utility to import all icons 1-21
// In Vite/Webpack we might use import.meta.glob but let's stick to manual or simple imports for reliability.
import icon1 from './assets/icon1.png';
import icon2 from './assets/icon2.png';
import icon3 from './assets/icon3.png';
import icon4 from './assets/icon4.png';
import icon5 from './assets/icon5.png';
import icon6 from './assets/icon6.png';
import icon7 from './assets/icon7.png';
import icon8 from './assets/icon8.png';
import icon9 from './assets/icon9.png';
import icon10 from './assets/icon10.png';
import icon11 from './assets/icon11.png';
import icon12 from './assets/icon12.png';
import icon13 from './assets/icon13.png';
import icon14 from './assets/icon14.png';
import icon15 from './assets/icon15.png';
import icon16 from './assets/icon16.png';
import icon17 from './assets/icon17.png';
import icon18 from './assets/icon18.png';
import icon19 from './assets/icon19.png';
import icon20 from './assets/icon20.png';
import icon21 from './assets/icon21.png';

const icons = [
    icon1, icon2, icon3, icon4, icon5, icon6, icon7,
    icon8, icon9, icon10, icon11, icon12, icon13, icon14,
    icon15, icon16, icon17, icon18, icon19, icon20, icon21
];

// Names from screenshot + Colors
const partnerData = [
    { name: "Kai Finance", color: "#FDE047" }, // Yellow
    { name: "Cetus", color: "#93C5FD" },      // Blue
    { name: "Aftermath Finance", color: "#E9D5FF" }, // Purple
    { name: "Alpha Fi", color: "#6EE7B7" },   // Green
    { name: "Bluefin", color: "#FDE047" },    // Yellow
    { name: "Bucket Protocol", color: "#FF5E1E" }, // Orangeish Red
    { name: "DeepBook", color: "#93C5FD" },   // Blue
    { name: "Haedal", color: "#E9D5FF" },     // Purple
    { name: "Typus Finance", color: "#6EE7B7" }, // Green
    { name: "Scallop", color: "#60A5FA" },     // Blue
    { name: "Turbos", color: "#FDE047" },      // Yellow
    { name: "Navi Protocol", color: "#93C5FD" }, // Blue
    { name: "FlowX", color: "#E9D5FF" },       // Purple
    { name: "Kriya", color: "#6EE7B7" },       // Green
    { name: "Mole", color: "#FDE047" },        // Yellow
    { name: "Suilend", color: "#93C5FD" },     // Blue
    { name: "Volo", color: "#E9D5FF" },        // Purple
    { name: "SuiNS", color: "#6EE7B7" },       // Green
    { name: "Pyth", color: "#E9D5FF" },        // Purple
    { name: "Wormhole", color: "#1E293B", text: "#FFF" }, // Dark
    { name: "Celer", color: "#60A5FA" },       // Blue
];

// Merge data
const partners = icons.map((icon, i) => ({
    icon,
    name: partnerData[i] ? partnerData[i].name : `Partner ${i + 1}`,
    bg: partnerData[i] ? partnerData[i].color : '#fff',
    text: partnerData[i]?.text || '#000'
}));

const EcosystemSection = () => {
    const marqueeRef = useRef(null);

    useEffect(() => {
        const el = marqueeRef.current;
        if (!el) return;

        // Vertical Scroll Logic
        // We clone items to ensure seamless loop.
        // Total height of content is needed.
        // Simple GSAP yPercent loop.

        // Duration depends on height, let's pick a speed.
        const duration = 25;

        const tl = gsap.to(el, {
            yPercent: -50, // Move up by half (since we doubled content)
            duration: duration,
            ease: "none",
            repeat: -1
        });

        return () => tl.kill();
    }, []);

    // Create 2 sets for loop
    const displayPartners = [...partners, ...partners];

    return (
        <section className="eco-section-split">
            {/* LEFT CONTENT */}
            <div className="eco-left">
                <h2 className="eco-heading">
                    Join Sui's top DeFi <br />
                    and trade, lend, <br />
                    borrow, stake
                </h2>
                <div className="eco-btn-wrapper">
                    <FlipButton
                        className="eco-btn-action"
                        height={55}
                        backContent="GET SLUSH"
                        to="https://slush.dev" // example link
                    >
                        GET SLUSH
                    </FlipButton>
                </div>
            </div>

            {/* RIGHT MARQUEE */}
            <div className="eco-right">
                <div className="eco-marquee-wrapper">
                    <div className="eco-marquee-track" ref={marqueeRef}>
                        {displayPartners.map((p, i) => (
                            <div
                                className="eco-pill"
                                key={i}
                                style={{ backgroundColor: p.bg, color: p.text }}
                            >
                                <div className="eco-pill-icon">
                                    <img src={p.icon} alt="" />
                                </div>
                                <span className="eco-pill-name">{p.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EcosystemSection;
