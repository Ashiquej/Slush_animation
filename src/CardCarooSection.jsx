import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './CardCarooSection.css';

// SVG Assets
import skeleton from './assets/skeleton.svg';
import codeee from './assets/codeee.svg';
import notepad from './assets/notepad.svg';
import tick from './assets/tick.svg';

const slides = [
    {
        id: 1,
        theme: 'green',
        title: "SPAM NFT BLOCKING",
        desc: "Hide unwanted spam NFTs instantly with a single click.",
        image: skeleton,
    },
    {
        id: 2,
        theme: 'yellow',
        title: "PHISHING PROTECTION",
        desc: "Avoid scam sites with our open-source, community-driven blocklist.",
        image: codeee,
    },
    {
        id: 3,
        theme: 'blue',
        title: "SCAM DETECTION",
        desc: "Stay protected with verified tokens, transaction safeguards, and threat alerts.",
        image: notepad,
    },
    {
        id: 4,
        theme: 'orange',
        title: "SECURE APPROVALS",
        desc: "Review and confirm transactions with clear insights before signing.",
        image: tick,
    }
];

const CardCarooSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Initial Fade In
    useEffect(() => {
        gsap.to(".card-caroo-content", {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "power3.out",
            delay: 0.2
        });
    }, []);

    const nextSlide = () => {
        const next = (currentIndex + 1) % slides.length;
        animChange(next);
    };

    const prevSlide = () => {
        const prev = (currentIndex - 1 + slides.length) % slides.length;
        animChange(prev);
    };

    const animChange = (newIndex) => {
        if (newIndex === currentIndex) return;

        // Animate Out current content
        gsap.to(".card-caroo-content", {
            opacity: 0,
            y: -20,
            scale: 0.95,
            duration: 0.3,
            onComplete: () => {
                setCurrentIndex(newIndex);
                // Animation In is handled by key prop + useEffect? 
                // Alternatively, explicit call here after state update/timeout
                // Using key prop logic below forces re-mount, 
                // so we can use a "ref-based" entrance animation or just GSAP .fromTo on the new selector.

                setTimeout(() => {
                    gsap.fromTo(".card-caroo-content",
                        { opacity: 0, y: 20, scale: 0.95 },
                        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power3.out" }
                    );
                }, 10);
            }
        });
    };

    const currentSlide = slides[currentIndex];

    return (
        <div className="card-caroo-section">
            <h2 className="cc-header">Let's make it built-in</h2>

            <div className={`card-caroo-card ${currentSlide.theme}`}>

                {/* Visual Content Container with KEY for re-mounting */}
                <div className="card-caroo-content" key={currentSlide.id}>
                    <h1 className="cc-slide-title">{currentSlide.title}</h1>
                    <p className="cc-slide-desc">{currentSlide.desc}</p>

                    <div className="cc-visual-container">
                        <img
                            src={currentSlide.image}
                            alt={currentSlide.title}
                            className="cc-slide-img cc-floating"
                        />
                    </div>
                </div>

                {/* Nav Arrows */}
                <button className="cc-nav-btn prev" onClick={prevSlide}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                </button>
                <button className="cc-nav-btn next" onClick={nextSlide}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </button>

                {/* Pagination */}
                <div className="cc-pagination">
                    {slides.map((slide, index) => (
                        <div
                            key={slide.id}
                            className={`cc-dot ${index === currentIndex ? 'active' : ''}`}
                            onClick={() => animChange(index)}
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CardCarooSection;
