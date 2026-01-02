
import React, { useRef, useState, useEffect } from 'react';
import { useLocation, useOutlet } from 'react-router-dom';
import { gsap } from 'gsap';
import Navbar from './Navbar';
import './TransitionLayout.css';

const TransitionLayout = () => {
    const location = useLocation();
    const outlet = useOutlet();

    const [displayOutlet, setDisplayOutlet] = useState(outlet);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [transitionProps, setTransitionProps] = useState(null);

    const trackRef = useRef(null);
    const containerRef = useRef(null); // For perspective? No, css is on container class
    const latestOutlet = useRef(outlet);

    useEffect(() => {
        if (outlet !== latestOutlet.current) {
            const oldOutlet = latestOutlet.current;
            latestOutlet.current = outlet;
            startTransition(oldOutlet, outlet);
        }
    }, [outlet]);

    const startTransition = (oldPage, newPage) => {
        const pool = ['#3B82F6', '#62E8A6', '#E0C8FF', '#FFD600', '#FF4E00', '#FF0055', '#00E5FF', '#AA00FF'];
        // Generate more random colors for 7-8 slides
        const getRandomColor = () => pool[Math.floor(Math.random() * pool.length)];

        const leftColor = getRandomColor();

        // Reduced to 5 Intermediate slides
        const rightColors = Array.from({ length: 5 }).map(() => getRandomColor());

        const finalRightColor = getRandomColor();

        setTransitionProps({
            oldOutlet: oldPage,
            newOutlet: newPage,
            leftColor: leftColor,
            rightColors: rightColors,
            finalRightColor: finalRightColor
        });
        setIsTransitioning(true);
    };

    
    useEffect(() => {
        if (isTransitioning && trackRef.current) {
            const cards = gsap.utils.toArray(".deck-card");
            const totalCards = cards.length;
            // Structure: [Left, Old(1), R1, R2, Target(4), FinalRight(5)]

            const screenW = window.innerWidth;
            const gap = -5; // Increased overlap for "touching type"
            const movePerCard = screenW + gap;

            // Initial Position: Center Index 1 (OldPage)
            const startX = -movePerCard;

            // Target Position: Center Index (Total - 2) which is TargetPage
            // Because FinalRight is last.
            const targetIndex = totalCards - 2;
            const endX = -(targetIndex * movePerCard);

            gsap.set(trackRef.current, { x: startX, z: 0 });
            gsap.set(cards, { scale: 1, rotateY: 0, z: 0 });

            const tl = gsap.timeline({
                onComplete: () => {
                    setDisplayOutlet(transitionProps.newOutlet);
                    setIsTransitioning(false);
                    setTransitionProps(null);
                    window.scrollTo(0, 0);
                }
            });

            // 1. Z-ZOOM OUT EVEN FASTER
            tl.to(trackRef.current, {
                z: -1500, // Deeper zoom to see more neighbors
                duration: 0.5, // Faster zoom
                ease: "power3.inOut"
            });

            // 2. SLIDE EVEN FASTER
            tl.to(trackRef.current, {
                x: endX,
                duration: 1.8, // Very fast for 5+ cards
                ease: "power2.inOut",
                onUpdate: function () {
                    const trackX = gsap.getProperty(trackRef.current, "x");
                    const centerX = screenW / 2;

                    cards.forEach((card, i) => {
                        const initialLeft = i * (screenW + gap);
                        const currentLeft = initialLeft + trackX;
                        const centerOffset = (currentLeft + screenW / 2) - centerX;
                        const ratio = centerOffset / screenW;

                        // Touching/Concave Rotation
                        // Use mild rotation to keep alignment "touching"
                        const rotateY = ratio * -30;

                        // Z-depth curve
                        const depthZ = Math.abs(ratio) * 250;

                        gsap.set(card, {
                            rotateY: rotateY,
                            z: depthZ
                        });
                    });
                }
            }, "-=0.2");

            // 3. Z-ZOOM IN EVEN FASTER
            tl.to(trackRef.current, {
                z: 0,
                duration: 0.5,
                ease: "power3.out"
            });

            return () => tl.kill();
        }
    }, [isTransitioning]);

    if (isTransitioning && transitionProps) {
        return (
            <div className="transition-container-3d">
                <div className="track-3d" ref={trackRef}>
                    <div className="deck-card color-card" style={{ backgroundColor: transitionProps.leftColor }}></div>
                    <div className="deck-card active-card">
                        <div className="card-content">{transitionProps.oldOutlet}</div>
                    </div>
                    {transitionProps.rightColors.map((c, i) => (
                        <div className="deck-card color-card" key={i} style={{ backgroundColor: c }}></div>
                    ))}
                    <div className="deck-card target-card">
                        <div className="card-content">{transitionProps.newOutlet}</div>
                    </div>
                    <div className="deck-card color-card" style={{ backgroundColor: transitionProps.finalRightColor }}></div>
                </div>
                <Navbar />
            </div>
        );
    }

    return (
        <div className="app-container">
            <Navbar />
            <div className="page-content">
                {displayOutlet}
            </div>
        </div>
    );
};

export default TransitionLayout;
