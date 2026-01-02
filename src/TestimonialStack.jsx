import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import FlipButton from './components/FlipButton';
import './TestimonialStack.css';
import smile from './assets/smile.svg';
import tickIcon from './assets/tick.svg';
import profileIcon from './assets/profile.svg';
import thumbIcon from './assets/thumbup.svg';

gsap.registerPlugin(Draggable);

// Updated Testimonials Data to match images "ditto"
const testimonials = [
    {
        id: 2,
        title: 'TRUSTED BY MILLIONS',
        text: '',
        author: '',
        bg: '#FF4D12', // Orange/Red
        isSpecial: true
    },
    {
        id: 4,
        title: '', // No title in image 4, just big text
        text: '"This is the best SUI wallet i\'ve ever used. The interface is simple & nice, very fast on transactions, so efficient and user-friendly to use. 😍"',
        author: 'Android user',
        bg: '#5CACFF' // Blue
    },
    {
        id: 5,
        title: '', // No title in image 5
        text: '"Best wallet for Sui Network so far. Not only because it is Sui native wallet. It is super fast, easy to use. UI friendly. Thanks Sui team for making it."',
        author: 'Android user',
        bg: '#5CE59A' // Green
    },
    // NEW CARDS (6-10) from uploaded images
    {
        id: 6,
        title: '',
        text: '"From NFTs to staking to Defi, in-app swaps etc... the Sui wallet is simply smooth and the best part is you can get started with just your google or twitch account."',
        author: '@nefariiLightt',
        bg: '#FFD700' // Yellow
    },
    {
        id: 7,
        title: '',
        text: '"Sui Mobile wallet is hands down the most simple and easiest wallet to use! Personally, I love using Gmail on it and the UI is very easy to learn 🫡"',
        author: '@trevinvsnft',
        bg: '#5CACFF' // Blue
    },
    {
        id: 8,
        title: '',
        text: '"Sui is one of the best in this cycle. Really solid Ecosystem. Use Sui wallet if you havent, its amazing with dapp integrations."',
        author: '@numanbey__',
        bg: '#FFFFFF' // White
    },
    {
        id: 9,
        title: '',
        text: '"As much as I love other wallets the user interface on Sui wallet is undefeated. You can be making Defi transactions within seconds of opening the wallet, without opening any apps."',
        author: '@zachpumpit',
        bg: '#E9D5FF' // Light Purple
    },
    {
        id: 10,
        title: '',
        text: '"Best wallet every, too smooth, fast also most advantage is we can easily access all ecosystem protocol easily. Love it"',
        author: 'Android user',
        bg: '#E0B0FF' // Lavender
    }
];

const TestimonialStack = () => {
    const cardsRef = useRef([]);
    const cardOrderRef = useRef(testimonials.map((_, i) => i));
    const isAnimating = useRef(false);
    const draggableRef = useRef(null);

    // 2D Unique Animations
    useEffect(() => {
        const ticks = document.querySelectorAll('.graphic-tick');
        const profiles = document.querySelectorAll('.graphic-profile');
        const thumbs = document.querySelectorAll('.graphic-thumb');

        if (ticks.length) {
            // Tick: Smooth Vertical Float + Gentle Rock
            gsap.to(ticks, {
                y: -15,
                rotation: 5,
                yoyo: true,
                repeat: -1,
                duration: 2.5,
                ease: "sine.inOut"
            });
        }
        if (profiles.length) {
            // Profile: Horizontal Drift + Counter Tilt
            gsap.to(profiles, {
                x: 10,
                rotation: -5,
                yoyo: true,
                repeat: -1,
                duration: 3,
                ease: "power1.inOut"
            });
        }
        if (thumbs.length) {
            // Thumb: distinct "Pop" pulse
            gsap.to(thumbs, {
                scale: 1.1,
                rotation: 3,
                yoyo: true,
                repeat: -1,
                duration: 0.8,
                ease: "back.inOut(1.7)"
            });
        }
    }, []);

    const updateCardPositions = (animate = true) => {
        const duration = animate ? 0.5 : 0;
        cardOrderRef.current.forEach((dataIndex, position) => {
            const card = cardsRef.current[dataIndex];
            if (!card) return;

            if (position === 0) {
                // Front Card
                gsap.to(card, {
                    x: 0,
                    y: 0,
                    rotation: 0,
                    scale: 1,
                    zIndex: 10,
                    opacity: 1,
                    duration: duration,
                    ease: 'power3.out'
                });
            } else if (position === 1) {
                // Second Card (FAN LEFT)
                // "structure as like the 2 card shows in the place others are hide outside"
                // Image implies card behind is to the LEFT.
                gsap.to(card, {
                    x: -80, // Negative X for LEFT fan
                    y: 0,
                    rotation: -6, // Tilt Left
                    scale: 0.92,
                    zIndex: 9,
                    opacity: 1,
                    duration: duration,
                    ease: 'power3.out'
                });
            } else {
                // Others Hidden deeper Left
                gsap.to(card, {
                    x: -80,
                    y: 0,
                    rotation: -6,
                    scale: 0.9,
                    zIndex: 8 - position,
                    opacity: 0, // Hidden
                    duration: duration,
                    ease: 'power3.out'
                });
            }
        });
    };

    const setupDraggable = () => {
        // Kill existing draggable
        if (draggableRef.current) {
            draggableRef.current.kill();
        }

        const currentCardIndex = cardOrderRef.current[0];
        const firstCard = cardsRef.current[currentCardIndex];
        if (!firstCard) return;

        draggableRef.current = Draggable.create(firstCard, {
            type: 'x,y',
            onDrag: function () {
                const rotation = (this.x / 100) * 10;
                gsap.set(firstCard, { rotation });
            },
            onDragEnd: function () {
                if (isAnimating.current) return;

                const threshold = 80;

                if (this.x < -threshold) {
                    // SWIPE LEFT (Next) -> TUCK BEHIND
                    isAnimating.current = true;

                    // Move Left and Rotate away
                    gsap.to(firstCard, {
                        x: -500, // Move towards Left (stack direction)
                        rotation: -30,
                        opacity: 0,
                        duration: 0.4,
                        ease: 'power2.in',
                        onComplete: () => {
                            // Cycle Order
                            const first = cardOrderRef.current.shift();
                            cardOrderRef.current.push(first);

                            // It will re-appear as the "last" card, hidden behind the stack
                            updateCardPositions(true);
                            setupDraggable();
                            isAnimating.current = false;
                        }
                    });
                } else if (this.x > threshold) {
                    // SWIPE RIGHT (Prev) -> BRING FROM LEFT
                    isAnimating.current = true;

                    // Pre-fetch previous card
                    const last = cardOrderRef.current.pop();
                    cardOrderRef.current.unshift(last); // New Front

                    const newFrontCard = cardsRef.current[last];

                    // Start from deep Left
                    gsap.set(newFrontCard, {
                        x: -600,
                        y: 0,
                        rotation: -30,
                        scale: 0.9,
                        zIndex: 11, // Temporary top
                        opacity: 0
                    });

                    // Animate In
                    gsap.to(newFrontCard, {
                        x: 0,
                        y: 0,
                        rotation: 0,
                        scale: 1,
                        opacity: 1,
                        zIndex: 10,
                        duration: 0.5,
                        ease: 'power3.out',
                        onComplete: () => {
                            updateCardPositions(true);
                            setupDraggable();
                            isAnimating.current = false;
                        }
                    });

                    // Update others to shift right
                    updateCardPositions(true);

                } else {
                    // Snap Back
                    gsap.to(firstCard, {
                        x: 0,
                        y: 0,
                        rotation: 0,
                        duration: 0.5,
                        ease: 'elastic.out(1, 0.5)'
                    });
                }
            }
        })[0];
    };

    useEffect(() => {
        // Initial positioning
        updateCardPositions();
        setupDraggable();

        return () => {
            if (draggableRef.current) {
                draggableRef.current.kill();
            }
        };
    }, []);

    return (
        <section className="testimonial-section">
            <div className="testimonial-main-card">
                <div className="testimonial-content">
                    {/* Left Side Content */}
                    <div className="testimonial-left">
                        <div className="testimonial-header">
                            <div>DON'T</div>
                            <div>BELIEVE US?</div>
                        </div>
                        <img src={smile} alt="Smile" className="smile-icon" />
                        <h4 className="testimonial-subtitle">See for yourself</h4>
                        <button className="join-btn">
                            JOIN THE MILLIONS <span className="arrow">↗</span>
                        </button>
                    </div>

                    {/* Right Side Stack */}
                    <div className="card-carousel-container">
                        {testimonials.map((testimonial, index) => (
                            <div
                                key={testimonial.id}
                                ref={el => cardsRef.current[index] = el}
                                className="testimonial-card"
                                style={{ backgroundColor: testimonial.bg }}
                            >
                                {testimonial.title && (
                                    <h3
                                        className="card-title"
                                        style={{
                                            fontSize: (testimonial.isSpecial ? '75px' : '38px'),
                                            fontFamily: testimonial.isSpecial ? '"Impact", sans-serif' : 'inherit',
                                            textTransform: testimonial.isSpecial ? 'uppercase' : 'none',
                                            lineHeight: testimonial.isSpecial ? 0.9 : 1.1,
                                            letterSpacing: testimonial.isSpecial ? '0px' : '-0.5px'
                                        }}
                                    >
                                        {testimonial.title}
                                    </h3>
                                )}

                                {testimonial.text && (
                                    <p
                                        className="card-text"
                                        style={{
                                            fontSize: !testimonial.title ? '42px' : '26px', // Larger text if no title
                                            lineHeight: !testimonial.title ? '1.2' : '1.4'
                                        }}
                                    >
                                        {testimonial.text}
                                    </p>
                                )}

                                {testimonial.author && (
                                    <p className="card-author">{testimonial.author}</p>
                                )}

                                {testimonial.isSpecial && (
                                    <>
                                        <img src={tickIcon} className="graphic-icon graphic-tick" alt="" />
                                        <img src={profileIcon} className="graphic-icon graphic-profile" alt="" />
                                        <img src={thumbIcon} className="graphic-icon graphic-thumb" alt="" />
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialStack;
