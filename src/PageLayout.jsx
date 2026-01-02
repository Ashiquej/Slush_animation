import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import './PageLayout.css';
import logo from './assets/download.svg'; // Reuse existing logo
import { Link } from 'react-router-dom';

const PageLayout = ({ title, stickers = [], showButtons = true }) => {
    const containerRef = useRef(null);
    const titleRef = useRef(null);

    // Optional: Entrance animation matching "Security" style transition
    useEffect(() => {
        const tl = gsap.timeline();
        tl.fromTo(titleRef.current,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
        );
        // Animate stickers
        stickers.forEach((_, i) => {
            gsap.fromTo(`.sticker-${i}`,
                { scale: 0, rotation: -180 },
                { scale: 1, rotation: 0, duration: 0.8, delay: 0.2 + (i * 0.1), ease: "back.out(1.7)" }
            );
        });
    }, [stickers]);

    return (
        <div className="page-layout-container">
            <div className="page-card" ref={containerRef}>

                {/* Header removed */}

                <div className="page-content-wrapper">
                    <h1 className="page-title" ref={titleRef}>
                        {title}
                    </h1>

                    {stickers.map((s, i) => (
                        <div key={i} className={`sticker sticker-${i}`} style={s.style}>
                            {s.component}
                        </div>
                    ))}

                    {showButtons && (
                        <div className="page-actions">
                            <a href="#" className="action-btn">LAUNCH WEB APP</a>
                            <a href="#" className="action-btn primary">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/9/98/Microsoft_Edge_logo_%282019%29.svg" alt="Edge" width="20" style={{ marginRight: 8 }} />
                                DOWNLOAD FOR EDGE
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PageLayout;
