
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './FooterMarquee.css';

import rocket from './assets/rocket.svg';
import wallet from './assets/wallet.svg';
import coin from './assets/coin.svg';
import tick from './assets/tick.svg'; // Assuming tick or smile

gsap.registerPlugin(ScrollTrigger);

const FooterMarquee = () => {
    const row1Ref = useRef(null);
    const row2Ref = useRef(null);

    useEffect(() => {
        let xPercent = 0;
        let direction = 1; // 1 = Right (for Row 1 on Scroll Down), -1 = Left (Row 1 on Scroll Up)
        // User requested: 
        // Scroll Down -> Row 1 Right, Row 2 Left.
        // Scroll Up -> Row 1 Left, Row 2 Right.

        // We need a target direction that updates on scroll.
        const speed = 0.05;

        const animate = () => {
            // Wrap logic
            // Use -50 because we have repeated content. 
            // Moving -50% (half width) lands us on the identical second half.
            if (xPercent <= -50) xPercent = 0;
            if (xPercent > 0) xPercent = -50;

            // Apply movement
            // Row 1 follows 'direction'
            gsap.set(row1Ref.current, { xPercent: xPercent });

            // Row 2 opposes 'direction'
            // To start Row 2 visibly, we can offset it.
            // If xPercent is 0, Row 2 at -50 puts it in the 'middle' (which is identical to start).
            // Then it moves opposite.
            gsap.set(row2Ref.current, { xPercent: -xPercent - 50 });

            // Update xPercent
            // If direction is 1 (Right): xPercent should INCREASE (towards 0 if neg).
            // If direction is -1 (Left): xPercent should DECREASE (towards -100).
            xPercent += speed * direction;

            requestAnimationFrame(animate);
        };

        const animation = requestAnimationFrame(animate);

        ScrollTrigger.create({
            trigger: document.body, // Watch whole page scroll
            onUpdate: (self) => {
                // self.direction: 1 = Down, -1 = Up
                // User: Down -> Row 1 Right.
                // If Down (1), we want direction = 1 (Increase xPercent).
                // If Up (-1), we want direction = -1 (Decrease xPercent).
                // So direction matches self.direction.
                if (self.direction !== 0) {
                    direction = self.direction;
                }
            }
        });

        return () => {
            cancelAnimationFrame(animation);
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    const blocks = [
        { color: 'orange', text: 'GET SLUSH', icon: rocket, iconPos: 'icon-top-left' },
        { color: 'blue', text: 'GET SLUSH', icon: null },
        { color: 'yellow', text: 'GET SLUSH', icon: tick, iconPos: 'icon-top-right' },
        { color: 'purple', text: 'GET SLUSH', icon: null },
        { color: 'green', text: 'GET SLUSH', icon: coin, iconPos: 'icon-bottom-left' },
        { color: 'orange', text: 'GET SLUSH', icon: wallet, iconPos: 'icon-bottom-right' },
    ];

    const marqueeContent = [...blocks, ...blocks, ...blocks, ...blocks];

    return (
        <section className="footer-marquee-section">
            <div className="footer-marquee-card">
                <div className="marquee-row" ref={row1Ref}>
                    {marqueeContent.map((item, i) => (
                        <div className={`marquee-block-wrap`} key={i}>
                            <div className={`marquee-block-inner`}>
                                {/* FRONT FACE */}
                                <div className={`marquee-face front ${item.color}`}>
                                    {item.icon && <img src={item.icon} className={`block-icon ${item.iconPos}`} alt="" />}
                                    <span className="block-text">GET SLUSH</span>
                                </div>
                                {/* BACK FACE */}
                                <div className={`marquee-face back`}>
                                    {item.icon && <img src={item.icon} className={`block-icon ${item.iconPos}`} alt="" />}
                                    <span className="block-text">GET SLUSH</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="marquee-row" ref={row2Ref}>
                    {marqueeContent.map((item, i) => (
                        <div className={`marquee-block-wrap`} key={i + '_2'}>
                            <div className={`marquee-block-inner`}>
                                <div className={`marquee-face front ${item.color}`}>
                                    <span className="block-text">GET SLUSH</span>
                                    {item.icon && <img src={item.icon} className={`block-icon ${item.iconPos}`} alt="" />}
                                </div>
                                <div className={`marquee-face back`}>
                                    <span className="block-text">GET SLUSH</span>
                                    {item.icon && <img src={item.icon} className={`block-icon ${item.iconPos}`} alt="" />}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FooterMarquee;
