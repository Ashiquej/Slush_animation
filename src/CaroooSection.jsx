import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './CaroooSection.css';

// Assets
import coinfull from './assets/coinfull.svg';
import tabphone from './assets/tabphone.svg'; // Using tabphone for "Frictionless Onboarding"
import rocket from './assets/rocket.svg';
import earn from './assets/earn.svg'; // Using earn for "Pay Anyone Instantly"

gsap.registerPlugin(ScrollTrigger);

const cards = [
    {
        id: 1,
        theme: 'orange',
        title: "CRYPTO THAT",
        title2: "WORKS",
        image: coinfull,
        rotClass: 'rot-coin',
        imgStyle: { width: '120px' }
    },
    {
        id: 2,
        theme: 'yellow',
        title: "FRICTIONLESS",
        title2: "ONBOARDING",
        image: tabphone,
        rotClass: 'rot-phone',
        imgStyle: { width: '140px', right: '-10px', bottom: '-20px' }
    },
    {
        id: 3,
        theme: 'blue',
        title: "DON'T JUST",
        title2: "HODL. GROW.",
        image: rocket,
        rotClass: 'rot-rocket',
        imgStyle: { width: '130px', top: '20px', right: '10px' }
    },
    {
        id: 4,
        theme: 'purple',
        title: "PAY ANYONE",
        title2: "INSTANTLY",
        image: earn,
        rotClass: 'rot-earn',
        imgStyle: { width: '140px', bottom: '10px', right: '-10px' }
    }
];

// Bidirectional buffer: [Clones, Real, Clones]
// This ensures we can scroll left from start or right from end without blank space
const extendedCards = [...cards, ...cards, ...cards];

const CaroooSection = () => {
    // Start at index 4 (the first card of the middle "Real" set)
    const [currentIndex, setCurrentIndex] = useState(cards.length);
    const [isTransitioning, setIsTransitioning] = useState(false); // Start false to prevent initial animation
    const timeoutRef = useRef(null);
    const resetTimeoutRef = useRef(null);
    const sectionRef = useRef(null);

    const slideDuration = 1000; // 1s matches CSS transition
    const autoPlayDelay = 3500; // Time between slides

    const resetAutoPlay = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    // Auto-play logic
    useEffect(() => {
        resetAutoPlay();

        timeoutRef.current = setTimeout(() => {
            // Enable transition for the move
            setIsTransitioning(true);
            setCurrentIndex((prev) => prev + 1);
        }, autoPlayDelay);

        return () => resetAutoPlay();
    }, [currentIndex]);

    // Seamless Loop Reset Logic
    useEffect(() => {
        // We have 3 sets of cards. 
        // Index 0-3: Set 1 (Pre-buffer)
        // Index 4-7: Set 2 (Real)
        // Index 8-11: Set 3 (Post-buffer)

        // If we reach the start of Set 3 (Index 8), we've gone too far right.
        // We should snap back to start of Set 2 (Index 4).
        if (currentIndex >= cards.length * 2) {
            resetTimeoutRef.current = setTimeout(() => {
                setIsTransitioning(false);
                setCurrentIndex(currentIndex - cards.length);
            }, slideDuration);
        }

        // Safety: If we go too far left (into Set 1), snap forward to Set 2.
        // e.g., if index 0, snap to 4.
        if (currentIndex < cards.length) {
            // This usually happens on manual prev click if we add one.
            // For now, auto-play only goes right.
            // But let's add it for robustness if we add manual nav later.
            resetTimeoutRef.current = setTimeout(() => {
                setIsTransitioning(false);
                setCurrentIndex(currentIndex + cards.length);
            }, slideDuration);
        }

        return () => {
            if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
        };
    }, [currentIndex]);

    // Scroll Animation Logic
    useEffect(() => {
        // Select all visuals inside the section
        const visuals = gsap.utils.toArray('.carooo-card-visual');

        visuals.forEach((visual) => {
            gsap.fromTo(visual,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: visual,
                        start: "top 85%", // Trigger when top of element hits 85% of viewport height
                        toggleActions: "play none none reverse" // Play on enter, reverse on leave back up
                    }
                }
            );
        });

        // Refresh ScrollTrigger to ensure positions are calculated correctly after render
        ScrollTrigger.refresh();

    }, []);

    const goToSlide = (index) => {
        setIsTransitioning(true);
        // Map the clicked dot (0-3) to the middle set (4-7)
        setCurrentIndex(index + cards.length);
    };

    return (
        <section className="carooo-section" ref={sectionRef}>
            <div className="carooo-header-container">
                <h2 className="carooo-headline">
                    Earn, swap, and explore securely<br />
                    on Sui—with none of the hassle
                </h2>
            </div>

            {/* Carousel Container */}
            <div className="carooo-carousel-window">
                <div
                    className="carooo-track"
                    style={{
                        transform: `translateX(calc(-${currentIndex} * (400px + 20px)))`,
                        transition: isTransitioning ? 'transform 1s cubic-bezier(0.25, 1, 0.5, 1)' : 'none'
                    }}
                >
                    {extendedCards.map((card, idx) => (
                        <div className={`carooo-card ${card.theme}`} key={`${card.id}-${idx}`}>
                            {/* We animate this container with GSAP */}
                            <div className="carooo-card-visual">
                                <img
                                    src={card.image}
                                    alt={card.title}
                                    className={`carooo-img ${card.rotClass}`}
                                    style={card.imgStyle}
                                />
                            </div>
                            <div className="carooo-card-content">
                                <h3 className="carooo-card-title">
                                    {card.title}
                                    <br />
                                    {card.title2}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Dots */}
            <div className="carooo-dots">
                {cards.map((_, idx) => (
                    <div
                        key={idx}
                        className={`carooo-dot ${(currentIndex % cards.length) === idx ? "active" : ""}`}
                        onClick={() => goToSlide(idx)}
                    ></div>
                ))}
            </div>

        </section>
    );
};

export default CaroooSection;
