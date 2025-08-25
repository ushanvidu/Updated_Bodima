import { useState, useEffect } from 'react';
import { Link }                from 'react-router-dom'; // Import Link from react-router-dom
import './Navbar.css';


function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="container">
                <div className="navigations">
                    <div className="left">
                        <Link to="/" className="logo">Bodima</Link> {/* Changed a to Link */}
                    </div>

                    <button
                        className="mobile-menu-toggle"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle navigation"
                    >
                        <span className={`bar ${mobileMenuOpen ? 'open' : ''}`}></span>
                        <span className={`bar ${mobileMenuOpen ? 'open' : ''}`}></span>
                        <span className={`bar ${mobileMenuOpen ? 'open' : ''}`}></span>
                    </button>

                    <div className={`right ${mobileMenuOpen ? 'open' : ''}`}>
                        <Link to="/rooms" className="nav-link">
                            <span className="link-text">Rooms</span>
                            <span className="link-underline"></span>
                        </Link>
                        <Link to="/rules" className="nav-link">
                            <span className="link-text">Rules</span>
                            <span className="link-underline"></span>
                        </Link>
                        <Link to="/contact" className="nav-link">
                            <span className="link-text">Contact Us</span>
                            <span className="link-underline"></span>
                        </Link>
                        <Link to="/login" className="nav-link signin-btn">
                            <span className="link-text">Login</span>
                            <span className="link-underline"></span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;