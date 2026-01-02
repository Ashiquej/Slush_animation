import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ThumbsUpSticker, CheckSticker, WalletSticker } from './Stickers';
import './GetStartedPage.css';
import logo from './assets/download.svg';
import NewsletterSupport from './NewsletterSupport';
import FooterSection from './FooterSection';

gsap.registerPlugin(ScrollTrigger);

// Phone Mockup Component to render different screens based on props
const PhoneMockup = ({ type }) => {
    return (
        <div className="gs-phone">
            <div className="gs-phone-notch"></div>

            {type === 'signin' && (
                <div className="screen-content screen-signin">
                    <div className="signin-text">DELIVERING<br />POWERFUL SUI<br />EXPERIENCES</div>
                    <div style={{ flex: 1 }}></div>
                    <div className="signin-btns">
                        <div className="signin-btn"></div>
                        <div className="signin-btn"></div>
                    </div>
                    <p style={{ fontSize: '10px', marginTop: '20px', opacity: 0.6 }}>By continuing you agree to Terms.</p>
                </div>
            )}

            {type === 'fund' && (
                <div className="screen-content screen-fund">
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', padding: '0 10px' }}>
                        <span>Back</span>
                        <span>CA</span>
                    </div>
                    <div className="fund-amount">$100</div>
                    <div className="fund-sub">475 SUI</div>
                    <div className="fund-actions">
                        <div className="fund-action-btn"></div>
                        <div className="fund-action-btn"></div>
                        <div className="fund-action-btn"></div>
                    </div>
                </div>
            )}

            {type === 'transact' && (
                <div className="screen-content screen-transact">
                    <div className="transact-qr">
                        <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=SlushApp" alt="QR" style={{ width: '100%', height: '100%' }} />
                    </div>
                    <h3>Share your Slush link</h3>
                    <p style={{ fontSize: '12px', opacity: 0.7, margin: '10px 0 20px' }}>Post or send the link for someone to claim.</p>
                    <button className="transact-btn">Copy link</button>

                    <div style={{ background: '#111', width: '100%', padding: '15px', borderRadius: '15px', marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: '#3B82F6' }}></div>
                            <span>Sui</span>
                        </div>
                        <span>$118.75</span>
                    </div>
                </div>
            )}

            {type === 'explore' && (
                <div className="screen-content screen-explore">
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '20px' }}>
                        <h2>Assets</h2>
                        <div style={{ width: '30px', height: '30px', background: '#333', borderRadius: '50%' }}></div>
                    </div>
                    <div style={{ display: 'flex', gap: '10px', width: '100%', marginBottom: '20px' }}>
                        <div style={{ flex: 1, height: '30px', background: '#3B82F6', borderRadius: '15px' }}></div>
                        <div style={{ flex: 1, height: '30px', background: '#333', borderRadius: '15px' }}></div>
                    </div>
                    <div className="explore-grid">
                        <div className="explore-item"></div>
                        <div className="explore-item"></div>
                        <div className="explore-item"></div>
                        <div className="explore-item"></div>
                    </div>
                </div>
            )}
        </div>
    );
};

const GetStartedPage = () => {
    // Entrance Animation
    useEffect(() => {
        const tl = gsap.timeline();

        // 1. Container Pop-In
        tl.fromTo(".get-started-page",
            { scale: 0.95, opacity: 0, y: 30 },
            { scale: 1, opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
        )
            // 2. Stickers Spin-In (Staggered)
            .from(".hero-sticker",
                { scale: 0, rotation: -180, duration: 0.8, stagger: 0.1, ease: "back.out(1.7)" },
                "-=0.4"
            )
            // 3. Title Slide-Up
            .from(".gs-hero-title",
                { y: 50, opacity: 0, duration: 0.8, ease: "power3.out" },
                "-=0.6"
            )
            // 4. Buttons Fade-Up
            .from(".gs-hero-actions",
                { y: 20, opacity: 0, duration: 0.6, ease: "power2.out" },
                "-=0.4"
            );



        // Scroll Animations for Text Columns
        gsap.utils.toArray(".gs-text-col").forEach((col) => {
            gsap.from(col, {
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: col,
                    start: "top 85%", // Trigger when top of element hits 85% of viewport height
                    toggleActions: "play none none reverse"
                }
            });
        });

    }, []);

    return (
        <>
            <div className="get-started-page">
                {/* HERO SECTION */}
                <section className="gs-hero">
                    {/* Stickers */}
                    <ThumbsUpSticker className="hero-sticker" style={{ top: '25%', left: '35%', width: '100px', transform: 'rotate(-15deg)' }} />
                    <CheckSticker className="hero-sticker" style={{ bottom: '20%', left: '15%', width: '120px', transform: 'rotate(-10deg)' }} />
                    <WalletSticker className="hero-sticker" style={{ bottom: '25%', right: '15%', width: '120px', transform: 'rotate(15deg)' }} />

                    <h1 className="gs-hero-title">
                        SO EASY, EVEN YOUR<br />MOM WANTS TO USE IT
                    </h1>

                    <div className="gs-hero-actions">
                        <button className="gs-btn">LAUNCH WEB APP</button>
                        <button className="gs-btn">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/9/98/Microsoft_Edge_logo_%282019%29.svg" alt="Edge" width="20" style={{ marginRight: 8 }} />
                            DOWNLOAD FOR EDGE
                        </button>
                    </div>
                </section>

                {/* SECTION 1: SIGN IN (Blue) */}
                <section className="gs-section theme-blue">
                    <div className="gs-section-content">
                        <div className="gs-visual-col">
                            <div className="gs-blob-bg"></div>
                            <PhoneMockup type="signin" />
                        </div>
                        <div className="gs-text-col">
                            <h2 className="gs-section-title">CHOOSE HOW<br />TO SIGN IN</h2>
                            <p className="gs-section-desc">
                                Set up your wallet using a secure seed phrase or log in with your favorite social account using ZKLogin. Web3, made as easy as Web2.
                            </p>
                        </div>
                    </div>
                </section>

                {/* SECTION 2: FUND (Yellow) */}
                <section className="gs-section theme-yellow">
                    <div className="gs-section-content reverse">
                        <div className="gs-text-col">
                            <h2 className="gs-section-title">FUND YOUR<br />WALLET</h2>
                            <p className="gs-section-desc">
                                Buy crypto with a card, bridge from another chain, or transfer from a friend. We support multiple funding options to fit your flow.
                            </p>
                        </div>
                        <div className="gs-visual-col">
                            <div className="gs-blob-bg" style={{ borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%' }}></div>
                            <PhoneMockup type="fund" />
                        </div>
                    </div>
                </section>

                {/* SECTION 3: TRANSACT (Green) */}
                <section className="gs-section theme-green">
                    <div className="gs-section-content">
                        <div className="gs-visual-col">
                            <div className="gs-blob-bg" style={{ borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }}></div>
                            <PhoneMockup type="transact" />
                        </div>
                        <div className="gs-text-col">
                            <h2 className="gs-section-title">TRANSACT<br />ON SUI</h2>
                            <p className="gs-section-desc">
                                Trade, Earn and Send—with confidence. Explore the full power of Sui DeFi with built-in safety tools, verified tokens, and simple transaction previews.
                            </p>
                        </div>
                    </div>
                </section>

                {/* SECTION 4: EXPLORE (Purple) */}
                <section className="gs-section theme-purple">
                    <div className="gs-section-content reverse">
                        <div className="gs-text-col">
                            <h2 className="gs-section-title">EXPLORE SUI</h2>
                            <p className="gs-section-desc">
                                Dive into DeFi, NFTs, and gaming. Discover apps, join communities, and unlock powerful on-chain experiences—all from your Slush wallet.
                            </p>
                        </div>
                        <div className="gs-visual-col">
                            <div className="gs-blob-bg" style={{ borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' }}></div>
                            <PhoneMockup type="explore" />
                        </div>
                    </div>
                </section>

            </div>
            <NewsletterSupport />
            <FooterSection />
        </>
    );
};

export default GetStartedPage;
