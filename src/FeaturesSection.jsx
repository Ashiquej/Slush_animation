import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FlipButton from './components/FlipButton';
import './FeaturesSection.css';
import tabphoneIcon from './assets/tabphone.svg';  // Assuming path is correct based on src/assets
import fourcubeIcon from './assets/fourcube.svg';
import codeIcon from './assets/code.svg';

gsap.registerPlugin(ScrollTrigger);


const FeaturesSection = () => {
    useEffect(() => {
        // Unique Animation for Feature Images
        gsap.utils.toArray('.feature-img').forEach((img, i) => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: img.closest('.feature-card'), // Trigger when card comes into view
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                },
                delay: i * 0.15
            });

            // 1. Unique Entrance: Elastic Pop & Tilt
            tl.fromTo(img,
                { scale: 0, rotate: -25, opacity: 0, y: 50 },
                {
                    scale: 1,
                    rotate: 0,
                    opacity: 1,
                    y: 0,
                    duration: 1.2,
                    ease: "elastic.out(1, 0.6)"
                }
            )
                // 2. Continuous Loop: Gentle Hover & Sway
                .to(img, {
                    y: -12,
                    rotate: 2,
                    scale: 1.02,
                    duration: 2.5,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"
                });
        });
    }, []);

    return (
        <section className="features-section">
            <div className="features-main-card">
                <h2 className="features-header">
                    Crypto for humans.<br />
                    Not just degens.
                </h2>

                <div className="features-cards-container">
                    {/* Card 1 - Yellow */}
                    <div className="feature-card feature-card-yellow">
                        <h3 className="feature-title">FRICTIONLESS<br />ONBOARDING</h3>
                        <FlipButton className="feature-btn" height={50} backContent="LEARN MORE ↗">
                            LEARN MORE <span className="arrow">↗</span>
                        </FlipButton>
                        <img src={tabphoneIcon} alt="Tab Phone" className="feature-img feature-img-tabphone" />
                    </div>

                    {/* Card 2 - Purple */}
                    <div className="feature-card feature-card-purple">
                        <h3 className="feature-title">FOR DEFI<br />POWER USERS</h3>
                        <FlipButton className="feature-btn" height={50} backContent="EARN ↗">
                            EARN <span className="arrow">↗</span>
                        </FlipButton>
                        <img src={fourcubeIcon} alt="Cubes" className="feature-img feature-img-cubes" />
                    </div>

                    {/* Card 3 - Blue */}
                    <div className="feature-card feature-card-blue">
                        <h3 className="feature-title">FOR<br />DEVELOPERS</h3>
                        <FlipButton className="feature-btn" height={50} backContent="OUR DISCORD ↗">
                            OUR DISCORD <span className="arrow">↗</span>
                        </FlipButton>
                        <img src={codeIcon} alt="Code" className="feature-img feature-img-code" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
