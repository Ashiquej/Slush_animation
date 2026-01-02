
import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import './ReachSection.css';
import mobileImg from './assets/image.png';
import webImg from './assets/web.png';
import extensionImg from './assets/browser.png';

const tabs = [
    {
        id: 'mobile',
        label: 'MOBILE APP',
        title: 'MOBILE APP',
        description: "Full control, anytime, anywhere. Manage your crypto on the go with a seamless, secure mobile experience available on iOS and Android. Swap, stake, and explore DeFi in just a few taps.",
        image: mobileImg,
        bg: '#F3E8FF'
    },
    {
        id: 'web',
        label: 'WEB APP',
        title: 'WEB APP',
        description: "A powerful wallet, no downloads required. Access your crypto instantly from any browser. The easiest way to manage your funds securely—without installing anything.",
        image: webImg,
        bg: '#FFF8C5'
    },
    {
        id: 'extension',
        label: 'BROWSER EXTENSION',
        title: 'BROWSER EXTENSION',
        description: "Seamless DeFi & dApp access. Interact with DeFi, NFTs, and dApps directly from your browser. Secure transactions, instant approvals, and frictionless connectivity.",
        image: extensionImg,
        bg: '#D1F7C4'
    }
];

const ReachSection = () => {
    // Initial active is standard "Web App" (Index 1) based on user prompt "center content shown"
    const [activeTab, setActiveTab] = useState(1);
    const [hoverTab, setHoverTab] = useState(null);

    const contentRef = useRef(null);
    const textRef = useRef(null);
    const imgRef = useRef(null);

    const currentTab = hoverTab !== null ? hoverTab : activeTab;

    // We only change "CONTENT" on CLICK (activeTab change).
    // The "Pill" changes on hover.

    // User said: "when i hover... black from webapp smoothly slides to particular content... and the clicked page navbar content is grey color"
    // AND "when i click... old content hides and new content appear"

    // So:
    // 1. Pill movement -> Driven by Hover/Focus.
    // 2. Main Content Change -> Driven by Click (ActiveTab).

    useEffect(() => {
        // Animate content change when activeTab changes
        if (contentRef.current) {
            const tl = gsap.timeline();
            // Image Animation: Pop and Rotate
            const img = contentRef.current.querySelector('.reach-phone-img');
            const text = contentRef.current.querySelector('.reach-text-col');

            if (img) {
                tl.fromTo(img,
                    { scale: 0.8, rotation: -5, opacity: 0, y: 30 },
                    { scale: 1, rotation: 0, opacity: 1, y: 0, duration: 1.5, ease: "elastic.out(1, 0.75)" }
                );
            }

            // Text Animation: Slide in seamlessly
            if (text) {
                tl.fromTo(text,
                    { x: 40, opacity: 0 },
                    { x: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
                    "-=1.2" // Overlap
                );
            }
        }
    }, [activeTab]);

    // Pill Style Calculation
    // We assume 3 equal tabs for simplicity or use refs. 
    // Let's use simple CSS percentages or refs if we want precise measurement.
    // Given the design is "Pill", simple flex with equal width or distinct width.
    // "MOBILE APP", "WEB APP", "BROWSER EXTENSION" have different lengths.
    // We should use refs for the tab elements to get exact width/left.

    const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });
    const tabRefs = useRef([]);

    useEffect(() => {
        const targetIndex = hoverTab !== null ? hoverTab : activeTab;
        const targetEl = tabRefs.current[targetIndex];
        if (targetEl) {
            setPillStyle({
                left: targetEl.offsetLeft,
                width: targetEl.offsetWidth
            });
        }
    }, [hoverTab, activeTab]);

    return (
        <section className="reach-section">
            <div className="reach-main-card">
                <h2 className="reach-header">Slush is always within reach</h2>

                {/* NAV PILL */}
                <div className="reach-nav-container">
                    <div
                        className="nav-pill-bg"
                        style={{
                            left: pillStyle.left,
                            width: pillStyle.width,
                            transition: "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                        }}
                    />

                    {tabs.map((tab, i) => (
                        <button
                            key={tab.id}
                            ref={el => tabRefs.current[i] = el}
                            className={`nav-item ${activeTab === i ? 'active' : ''} ${hoverTab === i ? 'hovered' : ''}`}
                            onMouseEnter={() => setHoverTab(i)}
                            onMouseLeave={() => setHoverTab(null)}
                            onClick={() => setActiveTab(i)}
                            style={{
                                color: (hoverTab !== null ? hoverTab === i : activeTab === i) ? '#fff' : '#000'
                                // Active/Hovered = White. Inactive = Black (on white bg).
                            }}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* CONTENT CARD */}
                <div className="reach-card" style={{ backgroundColor: tabs[activeTab].bg }}>
                    <div className="reach-content-inner" ref={contentRef} key={activeTab}>
                        {/* Key forces re-render for animation */}

                        <div className="reach-image-col">
                            <img src={tabs[activeTab].image} alt={tabs[activeTab].label} className="reach-phone-img" />
                        </div>

                        <div className="reach-text-col">
                            <h3 className="reach-title slant-font">{tabs[activeTab].title}</h3>
                            <p className="reach-desc">{tabs[activeTab].description}</p>

                            <div className="reach-btn-wrap">
                                <button className="get-slush-btn">
                                    GET SLUSH <span className="arrow">↗</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ReachSection;
