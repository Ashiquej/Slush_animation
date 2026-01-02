import React, { useEffect, useRef } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import './DeFiSection.css';


import rocket from './assets/rocket.svg';
import smile from './assets/smile.svg';
// Using phone.svg as a base container/frame if needed, or building pure CSS
import phoneBase from './assets/phone.svg';


gsap.registerPlugin(ScrollTrigger);

const DeFiSection = () => {
    // Refs for animations
    const sectionRef = useRef(null);
    const heroRef = useRef(null);
    const feature1Ref = useRef(null);
    const feature2Ref = useRef(null);
    const feature3Ref = useRef(null);
    const feature4Ref = useRef(null);

    useEffect(() => {
        // Main Entrance Timeline (Page Load)
        const tl = gsap.timeline();
        // 1. Container Pop-In
        tl.fromTo(sectionRef.current,
            { scale: 0.95, opacity: 0, y: 30 },
            { scale: 1, opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
        )
            // 2. Floating Icons Spin-In (Staggered)
            .from(".defi-floating-icon",
                { scale: 0, rotation: -180, duration: 0.8, stagger: 0.1, ease: "back.out(1.7)" },
                "-=0.4"
            )
            // 3. Title Slide-Up
            .from(".defi-hero-title",
                { y: 50, opacity: 0, duration: 0.8, ease: "power3.out" },
                "-=0.6"
            );

        // Feature Block Scroll Animations
        const animateText = (container, direction) => {
            if (!container) return;
            const titles = container.querySelectorAll('.defi-feature-title');
            const descs = container.querySelectorAll('.defi-feature-desc');
            const taglines = container.querySelectorAll('.defi-feature-tagline');
            const actions = container.querySelectorAll('.defi-feature-actions');

            // Determine start X position based on direction
            // Left text -> slides from left (-100) to 0
            // Right text -> slides from right (100) to 0
            const startX = direction === 'left' ? -100 : 100;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play reverse play reverse",
                }
            });

            if (titles.length) {
                tl.fromTo(titles,
                    { x: startX, opacity: 0, filter: "blur(10px)" },
                    { x: 0, opacity: 1, filter: "blur(0px)", duration: 1, ease: "power3.out" }
                );
            }

            if (descs.length) {
                tl.fromTo(descs,
                    { x: startX, opacity: 0, filter: "blur(5px)" },
                    { x: 0, opacity: 1, filter: "blur(0px)", duration: 0.8, stagger: 0.1, ease: "power2.out" },
                    "-=0.6"
                );
            }

            if (taglines.length) {
                tl.fromTo(taglines,
                    { x: startX, opacity: 0 },
                    { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
                    "-=0.6"
                );
            }

            if (actions.length) {
                tl.fromTo(actions,
                    { x: startX, opacity: 0 },
                    { x: 0, opacity: 1, duration: 0.6, ease: "back.out(1.7)" },
                    "-=0.4"
                );
            }
        };

        // Text is on RIGHT for Feature 1 & 3 (Image Left)
        animateText(feature1Ref.current, 'right');

        // Text is on LEFT for Feature 2 & 4 (Text Left)
        animateText(feature2Ref.current, 'left');

        // Text is on RIGHT
        animateText(feature3Ref.current, 'right');

        // Text is on LEFT
        animateText(feature4Ref.current, 'left');

    }, []);

    return (
        <section className="defi-section-new" ref={sectionRef}>
            {/* HERO BLOCK */}
            <div className="defi-hero" ref={heroRef}>
                <div className="defi-hero-content">
                    <img src={rocket} alt="Rocket" className="defi-floating-icon rocket-left" />
                    <h1 className="defi-hero-title">
                        DON'T JUST HOLD,<br />
                        JUST START GROW.
                    </h1>
                    <img src={smile} alt="Piggy" className="defi-floating-icon pig-right" />
                </div>

            </div>

            {/* FEATURE 1: STRATEGIES (Image Left, Text Right - Blue) */}
            <div className="defi-feature-block" ref={feature1Ref}>
                <div className="defi-feature-visual blue-theme">
                    {/* Simulated Phone UI: Strategies */}
                    <div className="defi-phone-mockup">
                        <div className="phone-screen-strat">
                            <div className="strat-header">
                                <span className="p-pill active">Strategies</span>
                                <span className="p-pill">Staking</span>
                                <span className="p-pill">Vaults & Lending</span>
                            </div>
                            <div className="strat-card main">
                                <div className="sc-top">
                                    <span className="sc-label">CURATED STRATEGIES</span>
                                    <div className="sc-plus">+</div>
                                </div>
                                <div className="sc-balance">$16,000</div>
                                <div className="sc-gain">+$130</div>
                            </div>
                            <div className="strat-list">
                                <div className="strat-item">
                                    <div className="si-label">STABLECOIN</div>
                                    <div className="si-val">$8,500</div>
                                </div>
                                <div className="strat-item-row">
                                    <div className="si-icon usdc"></div>
                                    <div className="si-info">
                                        <div className="si-name">USDC</div>
                                        <div className="si-sub">on AlphaLend</div>
                                    </div>
                                    <div className="si-right">
                                        <div className="si-arr-r">{'>'}</div>
                                    </div>
                                </div>
                                <div className="strat-item-row detail">
                                    <div className="si-detail-val">$8,500</div>
                                    <div className="si-detail-gain text-green">+$100</div>
                                </div>
                            </div>
                            <div className="strat-list">
                                <div className="strat-item">
                                    <div className="si-label">NON-STABLECOIN</div>
                                    <div className="si-val">$7,500</div>
                                </div>
                                <div className="strat-item-row">
                                    <div className="si-icon sui"></div>
                                    <div className="si-info">
                                        <div className="si-name">SUI</div>
                                        <div className="si-sub">on AlphaLend</div>
                                    </div>
                                    <div className="si-right">
                                        <div className="si-arr-r">{'>'}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="defi-feature-text">
                    <h2 className="defi-feature-title">
                        START HERE:<br />STRATEGIES
                    </h2>
                    <p className="defi-feature-desc">
                        Discover ways to access integrated yield strategies across Sui DeFi protocols with a single tap, without ever leaving Slush.
                    </p>
                    <p className="defi-feature-tagline">Tap once, start earning.</p>
                    <div className="defi-feature-actions">
                        <button className="defi-pill-black">LEARN HOW</button>
                        <button className="defi-pill-outline">FAQ</button>
                    </div>
                </div>
            </div>

            {/* FEATURE 2: PORTFOLIO (Text Left, Image Right - Purple) */}
            <div className="defi-feature-block" ref={feature2Ref}>
                <div className="defi-feature-text">
                    <h2 className="defi-feature-title">
                        TRACK YOUR<br />PORTFOLIO
                    </h2>
                    <p className="defi-feature-desc">
                        See all your DeFi assets, lending positions, and staking rewards in one place.
                    </p>
                    <p className="defi-feature-desc">
                        Monitor APYs in real-time and make data-driven decisions.
                    </p>
                </div>
                <div className="defi-feature-visual purple-theme">
                    {/* Simulated Phone UI: Portfolio */}
                    <div className="defi-phone-mockup">
                        <div className="phone-screen-port">
                            <div className="port-header">
                                <div className="ph-label">YOUR COINS</div>
                                <div className="ph-icons">
                                    <span className="ph-icon">Q</span>
                                    <span className="ph-icon">O</span>
                                </div>
                            </div>
                            <div className="port-balance">$4,690.42</div>
                            <div className="port-gain text-green">+$12.61</div>
                            <div className="port-actions">
                                <div className="pa-btn"><span className="pa-i">Swap</span></div>
                                <div className="pa-btn"><span className="pa-i">Send</span></div>
                                <div className="pa-btn"><span className="pa-i">Buy/Sell</span></div>
                                <div className="pa-btn"><span className="pa-i">Request</span></div>
                            </div>
                            <div className="port-list">
                                <div className="pl-item">
                                    <div className="pl-icon sui"></div>
                                    <div className="pl-info">
                                        <div className="pl-name">Sui <span className="verified">✓</span></div>
                                        <div className="pl-sub">$4.20 <span className="text-green">+3.54%</span></div>
                                    </div>
                                    <div className="pl-val">
                                        <div className="pl-amt">$824.22</div>
                                        <div className="pl-tkn">173.52 SUI</div>
                                    </div>
                                </div>
                                <div className="pl-item">
                                    <div className="pl-icon usdc"></div>
                                    <div className="pl-info">
                                        <div className="pl-name">USDC <span className="verified">✓</span></div>
                                        <div className="pl-sub">$1.00 <span className="text-red">-0.01%</span></div>
                                    </div>
                                    <div className="pl-val">
                                        <div className="pl-amt">$10.05</div>
                                        <div className="pl-tkn">10.05 USDC</div>
                                    </div>
                                </div>
                                <div className="pl-more">+ FUD, AAA, ALPHA <span className="pm-val">~$0.458</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* FEATURE 3: OPPORTUNITIES (Image Left, Text Right - Green) */}
            <div className="defi-feature-block" ref={feature3Ref}>
                <div className="defi-feature-visual green-theme">
                    {/* Simulated Phone UI: Opportunities */}
                    <div className="defi-phone-mockup">
                        <div className="phone-screen-opp">
                            <div className="opp-top">
                                <div className="ot-label">YOUR INVESTMENTS</div>
                                <div className="ot-plus">+</div>
                            </div>
                            <div className="opp-balance">$889,690.42</div>
                            <div className="opp-stats">
                                <div className="os-item">
                                    <div className="os-l">Strategies</div>
                                    <div className="os-v">$100k</div>
                                </div>
                                <div className="os-item">
                                    <div className="os-l">Lending</div>
                                    <div className="os-v">$700k</div>
                                </div>
                                <div className="os-item">
                                    <div className="os-l">Vaults</div>
                                    <div className="os-v">$100k</div>
                                </div>
                                <div className="os-item">
                                    <div className="os-l">Native staking</div>
                                    <div className="os-v">$100k</div>
                                </div>
                            </div>
                            <div className="opp-coins-sect">
                                <div className="opp-ch">YOUR COINS</div>
                                <div className="opp-cb">$4,690.42</div>
                                <div className="text-green small">+12.61</div>
                            </div>
                            <div className="opp-acts">
                                <div className="pa-btn small">Swap</div>
                                <div className="pa-btn small">Send</div>
                                <div className="pa-btn small">Buy/Sell</div>
                                <div className="pa-btn small">Request</div>
                            </div>
                            <div className="pl-item small">
                                <div className="pl-icon sui"></div>
                                <div className="pl-info">
                                    <div className="pl-name">Sui <span className="verified">✓</span></div>
                                    <div className="pl-sub">$4.20 <span className="text-green">+3.54%</span></div>
                                </div>
                                <div className="pl-val">
                                    <div className="pl-amt">$824.22</div>
                                    <div className="pl-tkn">173.52 SUI</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="defi-feature-text">
                    <h2 className="defi-feature-title">
                        DISCOVER NEW<br />OPPORTUNITIES
                    </h2>
                    <p className="defi-feature-desc">
                        Find the best staking, lending, and vault strategies tailored for you.
                    </p>
                    <p className="defi-feature-desc">Compare APYs across protocols and execute with 1-click simplicity.</p>
                </div>
            </div>

            {/* FEATURE 4: LIQUID STAKE (Text Left, Image Right - Yellow) */}
            <div className="defi-feature-block" ref={feature4Ref}>
                <div className="defi-feature-text">
                    <h2 className="defi-feature-title">
                        LIQUID STAKE &<br />EARN INSTANTLY
                    </h2>
                    <p className="defi-feature-desc">
                        Earn rewards and unlock liquidity with 1-click liquid staking.
                    </p>
                </div>
                <div className="defi-feature-visual yellow-theme">
                    {/* Simulated Phone UI: Liquid Stake */}
                    <div className="defi-phone-mockup">
                        <div className="phone-screen-stake">
                            <div className="stake-card main-stake">
                                <div className="st-head">
                                    <div className="st-icon-lp"></div>
                                    <div className="st-info">
                                        <div className="st-l">Liquid stake</div>
                                        <div className="st-v">$234.56</div>
                                    </div>
                                    <div className="st-arr">v</div>
                                </div>
                                <div className="st-row active">
                                    <div className="st-icon af">A</div>
                                    <div className="st-n">Aftermath</div>
                                    <div className="st-val">$234.56</div>
                                </div>
                                <div className="st-row">
                                    <div className="st-icon ha">H</div>
                                    <div className="st-n">Haedal<br /><span className="st-apy">9.3-11.2%</span></div>
                                    <div className="st-add">+</div>
                                </div>
                                <div className="st-row">
                                    <div className="st-icon vo">V</div>
                                    <div className="st-n">Volo SUI<br /><span className="st-apy">9.3-11.2%</span></div>
                                    <div className="st-add">+</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </section>
    );
};

export default DeFiSection;
