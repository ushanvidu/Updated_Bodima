import './HeroSection.css';


function HeroSection() {
    return (
        <section className="hero">
            <div className="hero-content">
                <h1 className="hero-title">
                    Find Your <span className="highlight">Perfect</span> Boarding Place
                </h1>
                <p className="hero-subtitle">
                    Discover comfortable, affordable second homes that feel like your own
                </p>
                <div className="hero-cta">
                    <button className="cta-primary">Explore Rooms</button>
                    <button className="cta-secondary">How It Works</button>
                </div>
            </div>
            <div className="hero-image-container">
                <img src="/herophoto.jpg" alt="Comfortable boarding room" className="hero-image" />
                <div className="image-overlay"></div>
            </div>
        </section>
    );
}

export default HeroSection;