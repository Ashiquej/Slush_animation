import React from 'react';
import './FooterSection.css';

import discordIcon from './assets/discord.svg';
import xIcon from './assets/x.svg';
import instaIcon from './assets/insta.svg';
import youtubeIcon from './assets/youtube.svg';

const FooterSection = () => {
    return (
        <section className="footer-section">
            {/* LEFT: SOCIAL GRID */}
            <div className="footer-social-grid">
                <div className="social-card">
                    <img src={discordIcon} alt="Discord" className="social-icon" />
                </div>
                <div className="social-card">
                    <img src={xIcon} alt="X" className="social-icon" />
                </div>
                <div className="social-card">
                    <img src={instaIcon} alt="Instagram" className="social-icon" />
                </div>
                <div className="social-card">
                    <img src={youtubeIcon} alt="YouTube" className="social-icon" />
                </div>
            </div>

            {/* RIGHT: MAIN CONTENT CARD */}
            <div className="footer-green-card">

                {/* TOP CONTENT: HEADER + LINKS */}
                <div className="footer-top-content">
                    <h2 className="footer-main-text">
                        DOWNLOAD SLUSH.<br />
                        THEN MAKE IT ALL HAPPEN.
                    </h2>

                    <div className="footer-links-col">
                        <a href="#" className="footer-nav-link">HOME</a>
                        <a href="#" className="footer-nav-link">DEFI / EARN</a>
                        <a href="#" className="footer-nav-link">GET STARTED</a>
                        <a href="#" className="footer-nav-link">SECURITY</a>
                        <a href="#" className="footer-nav-link">DOWNLOAD</a>
                        <a href="#" className="footer-nav-link">GUIDES</a>
                    </div>
                </div>

                {/* BOTTOM ROW (Flows below top content) */}
                <div className="footer-bottom-row">
                    <span>© 2025 MYSTEN LABS, INC.</span>
                    <div className="footer-bottom-links">
                        <a href="#" className="footer-bottom-link">BRAND ASSETS</a>
                        <a href="#" className="footer-bottom-link">PRIVACY NOTICE</a>
                        <a href="#" className="footer-bottom-link">TERMS OF SERVICE</a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FooterSection;
