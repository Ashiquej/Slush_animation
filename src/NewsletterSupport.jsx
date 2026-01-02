
import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FlipButton from './components/FlipButton';
import './NewsletterSupport.css';
import plane from './assets/paperplane.svg';
import profile from './assets/profile.svg';

gsap.registerPlugin(ScrollTrigger);

const NewsletterSupport = () => {
    useEffect(() => {
        // Plane Animation: Flying
        const planeEl = document.querySelector('.ns-graphic-plane img');
        if (planeEl) {
            gsap.to(planeEl, {
                x: 20,
                y: -20,
                rotate: 5,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
            // Initial fly-in on scroll
            gsap.from(planeEl, {
                scrollTrigger: {
                    trigger: ".ns-card.yellow",
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                },
                x: -100,
                y: 50,
                opacity: 0,
                duration: 1.5,
                ease: "power2.out"
            });
        }

        // Profile Animation: Unique Transition
        const profileEl = document.querySelector('.ns-graphic-smile img');
        if (profileEl) {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".ns-card.blue",
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                },
                repeat: -1,
                repeatDelay: 1
            });

            // Entrance
            gsap.from(profileEl, {
                scrollTrigger: {
                    trigger: ".ns-card.blue",
                    start: "top 80%"
                },
                scale: 0,
                rotate: -180,
                opacity: 0,
                duration: 1.2,
                ease: "elastic.out(1, 0.5)"
            });

            // Loop
            tl.to(profileEl, {
                rotate: 10,
                scale: 1.1,
                duration: 0.5,
                ease: "power1.inOut"
            })
                .to(profileEl, {
                    rotate: -10,
                    scale: 1.1,
                    duration: 0.5,
                    ease: "power1.inOut"
                })
                .to(profileEl, {
                    rotate: 0,
                    scale: 1,
                    duration: 0.5,
                    ease: "elastic.out(1, 0.3)"
                });
        }
    }, []);

    return (
        <section className="ns-section">
            <div className="ns-container">
                {/* LEFT CARD - NEWSLETTER */}
                <div className="ns-card yellow">
                    <div className="ns-content">
                        <h2 className="ns-title">YOUR INBOX JUST <br /> GOT BETTER</h2>

                        {/* Plane Graphic */}
                        <div className="ns-graphic-plane">
                            <img src={plane} alt="Paper Plane" style={{ width: '180px' }} />
                        </div>

                        <p className="ns-desc">
                            Subscribe to our newsletter for VIP access to news, offers, and insights!
                        </p>

                        <div className="ns-form">
                            <input type="email" placeholder="Your email address" className="ns-input" />
                            <div className="ns-btn-wrapper">
                                <button className="ns-btn-3d black">
                                    <div className="ns-flip-inner">
                                        <div className="ns-flip-face front">SUBSCRIBE</div>
                                        <div className="ns-flip-face back">SUBSCRIBE</div>
                                    </div>
                                </button>
                            </div>
                        </div>

                        <div className="ns-checkbox-wrapper">
                            <input type="checkbox" id="consent" className="ns-checkbox" />
                            <label htmlFor="consent">I agree to receive communications from Slush.</label>
                        </div>
                    </div>
                </div>

                {/* RIGHT CARD - SUPPORT */}
                <div className="ns-card blue">
                    <div className="ns-content">
                        <h2 className="ns-title">ALWAYS HERE <br /> TO HELP</h2>

                        <div className="ns-graphic-smile">
                            <img src={profile} alt="Profile" style={{ width: '150px' }} />
                        </div>

                        <p className="ns-desc">
                            Whether you're a first-time user or a DeFi pro, our 24/7 support team has you covered.
                        </p>

                        <div className="ns-btn-wrapper support-btn-wrapper">
                            <button className="ns-btn-3d black-outline">
                                <div className="ns-flip-inner">
                                    <div className="ns-flip-face front">GET SUPPORT ↗</div>
                                    <div className="ns-flip-face back">GET SUPPORT ↗</div>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NewsletterSupport;
