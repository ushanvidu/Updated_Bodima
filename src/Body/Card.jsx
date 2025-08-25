import React, { useState, useEffect } from 'react';
import { FiStar, FiMapPin, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import './Card.css';

// Mock database (replace with actual API calls)
const fetchBoardingHouses = async () => {
    // In a real app, this would be an API call like:
    // const response = await fetch('/api/boarding-houses');
    // return await response.json();

    return [
        {
            id: 1,
            title: "Cozy Student House",
            location: "Colombo 03",
            price: 25000,
            rating: 4.7,
            image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
            amenities: ["WiFi", "AC", "Parking"],
            available_from: "2023-06-01"
        },
        {
            id: 2,
            title: "Modern City Apartment",
            location: "Kandy",
            price: 30000,
            rating: 4.9,
            image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
            amenities: ["WiFi", "AC", "Laundry"],
            available_from: "2023-06-15"
        },
        {
            id: 3,
            title: "Quiet Suburban Room",
            location: "Galle",
            price: 18000,
            rating: 4.5,
            image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
            amenities: ["WiFi", "Furnished"],
            available_from: "2023-05-20"
        }
    ];
};

function BoardingCard({ boarding }) {
    return (
        <div className="boarding-card">
            <div className="card-image">
                <img src={boarding.image} alt={boarding.title} />
                <div className="card-badge">Available from: {new Date(boarding.available_from).toLocaleDateString()}</div>
            </div>
            <div className="card-content">
                <h3 className="card-title">{boarding.title}</h3>
                <div className="card-location">
                    <FiMapPin className="location-icon" />
                    <span>{boarding.location}</span>
                </div>
                <div className="card-rating">
                    <FiStar className="star-icon" />
                    <span>{boarding.rating}</span>
                </div>
                <div className="card-price">Rs. {boarding.price.toLocaleString()}/month</div>
                <div className="card-amenities">
                    {boarding.amenities.map((amenity, index) => (
                        <span key={index} className="amenity-tag">{amenity}</span>
                    ))}
                </div>
                <button className="card-button">View Details</button>
            </div>
        </div>
    );
}

function BoardingCardSlider() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [boardingHouses, setBoardingHouses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                const data = await fetchBoardingHouses();
                setBoardingHouses(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    const nextCard = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === boardingHouses.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevCard = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? boardingHouses.length - 1 : prevIndex - 1
        );
    };

    if (loading) return <div className="loading">Loading boarding houses...</div>;
    if (error) return <div className="error">Error: {error}</div>;
    if (boardingHouses.length === 0) return <div className="empty">No boarding houses available</div>;

    return (
        <div className="slider-container">
            <h2 className="section-title">Available Boarding Places</h2>
            <div className="slider-wrapper">
                <button className="slider-arrow left-arrow" onClick={prevCard}>
                    <FiChevronLeft />
                </button>

                <div className="cards-container">
                    {boardingHouses.map((boarding, index) => (
                        <div
                            key={boarding.id}
                            className={`card-slide ${index === currentIndex ? 'active' : ''}`}
                            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                        >
                            <BoardingCard boarding={boarding} />
                        </div>
                    ))}
                </div>

                <button className="slider-arrow right-arrow" onClick={nextCard}>
                    <FiChevronRight />
                </button>
            </div>
            <div className="slider-dots">
                {boardingHouses.map((_, index) => (
                    <button
                        key={index}
                        className={`dot ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => setCurrentIndex(index)}
                    />
                ))}
            </div>
        </div>
    );
}

export default BoardingCardSlider;