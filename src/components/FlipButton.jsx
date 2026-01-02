import React from 'react';
import './FlipButton.css';

const FlipButton = ({
    children,
    backContent,
    onClick,
    className = '',
    style = {},
    height = 50 // Default height for calculation
}) => {

    // We need to dynamically adjust translateZ if height changes via prop/style
    // But CSS classes are cleaner. We'll use the 'height' prop to set inline styles if provided.
    const halfHeight = typeof height === 'number' ? height / 2 : 25;

    return (
        <div
            className={`flip-btn-wrap ${className}`}
            onClick={onClick}
            style={{ height: height, ...style }}
        >
            <div className="flip-btn-inner">
                {/* Front Face */}
                <div
                    className="flip-btn-face front"
                    style={{ transform: `translateZ(${halfHeight}px)` }}
                >
                    {children}
                </div>

                {/* Back Face */}
                <div
                    className="flip-btn-face back"
                    style={{ transform: `rotateX(-90deg) translateZ(${halfHeight}px)` }}
                >
                    {backContent || children}
                </div>
            </div>
        </div>
    );
};

export default FlipButton;
