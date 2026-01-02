import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './CarouselSection.css';

import wallet from './assets/wallet.svg';
import lock from './assets/lock.svg';
import rocket from './assets/rocket.svg';
import tick from './assets/tick.svg';

const slides = [
    {
        id: 1,
        theme: 'green',
        title: "SELF-CUSTODY FIRST",
        desc: "Your keys, your assets—no middlemen, no compromises.",
        image: wallet, // Using wallet as placeholder for hardware wallet
        imgClass: 'card-img-c floating'
    },
    {
        id: 2,
        theme: 'yellow',
        title: "PRIVACY-FOCUSED",
        desc: "No intrusive tracking. You control your financial data.",
        image: lock,
        imgClass: 'card-img-c floating delay-1'
    },
    {
        id: 3,
        theme: 'orange',
        title: "POWERED BY SUI'S SPEED",
        desc: "Experience near-instant transactions with ultra-low fees.",
        image: rocket,
        imgClass: 'card-img-c floating delay-2 rocket-rot'
    },
    {
        id: 4,
        theme: 'blue',
        title: "AUDITED & TRUSTED",
        desc: "Regular security audits & partnerships with top DeFi protocols.",
        image: tick,
        imgClass: 'card-img-c floating delay-3'
    }
];

const CarouselSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const cardRef = useRef(null);
    const contentRef = useRef(null);

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

        // Animate Out
        gsap.to(".carousel-content", {
            opacity: 0,
            y: -20,
            scale: 0.95,
            duration: 0.3,
            onComplete: () => {
                setCurrentIndex(newIndex);
                // Animate In (Enter)
                gsap.fromTo(".carousel-content",
                    { opacity: 0, y: 20, scale: 0.95 },
                    { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power3.out" }
                );
                // Re-trigger image animation? The key prop on content handles react re-mount, 
                // but GSAP might need fresh selection or the key handles it.
                // With key={currentSlide.id} on .carousel-content, React will replace the node.
                // So the 'Animate Out' works on the OLD node.
                // But wait, if I update state in onComplete, React updates the DOM.
                // The GSAP 'onComplete' runs, THEN state updates, THEN render.
                // The .carousel-content selection in 'Animate In' might need a slight delay or use context-safe GSAP.
                // Actually, due to React Batching, simple .fromTo after state set might miss the new DOM node if not useEffect.
                // Better to just set state, then let useEffect trigger entry animation? 
                // Or rely on the 'key' prop to unmount/remount?
                // If I rely on 'key', the new node appears instantly. 
                // So: Out -> Set Index -> (New Node Mounts) -> UseEffect animates In.
            }
        });
    };

    // Trigger Entry Animation on change
    useEffect(() => {
        gsap.fromTo(".carousel-content",
            { opacity: 0, y: 30, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "power3.out", delay: 0.1 }
        );
    }, [currentIndex]);

    const currentSlide = slides[currentIndex];

    // Image Animation (Pop/Float) inside
    // We can use a keyframed CSS class 'floating' for continuous motion.

    return (
        <section className="carousel-section-new">
            <div className={`carousel-big-card ${currentSlide.theme}`}>

                {/* NAVIGATION */}
                <button className="nav-btn prev" onClick={prevSlide}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
                </button>
                <button className="nav-btn next" onClick={nextSlide}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
                </button>

                {/* CONTENT */}
                <div className="carousel-content" key={currentSlide.id}> {/* Key triggers re-render/anim */}
                    <h2 className="cc-title">{currentSlide.title}</h2>
                    <p className="cc-desc">{currentSlide.desc}</p>

                    <div className="cc-visual">
                        <img src={currentSlide.image} alt="" className={currentSlide.imgClass} />
                    </div>
                </div>

                {/* DOTS */}
                <div className="carousel-dots-bottom">
                    {slides.map((_, i) => (
                        <div
                            key={i}
                            className={`dot-b ${i === currentIndex ? 'active' : ''}`}
                            onClick={() => animChange(i)}
                        />
                    ))}
                </div>

            </div>
        </section>
    );
};

export default CarouselSection;
