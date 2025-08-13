import { useState } from 'react';
import './Rooms.css';

const Rooms = () => {
    const [activeTab, setActiveTab] = useState('all');
    const [expandedImage, setExpandedImage] = useState(null);

    const roomTypes = [
        {
            id: 'single',
            name: 'Single Rooms',
            description: 'Cozy private rooms perfect for individual students',
            facilities: ['Single bed', 'Study table', 'Wardrobe', 'Private bathroom', 'Free WiFi'],
            photos: [
                'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
                'https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
                'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
            ]
        },
        {
            id: 'double',
            name: 'Double Rooms',
            description: 'Spacious rooms shared between two students',
            facilities: ['Two single beds', 'Two study tables', 'Shared wardrobe', 'Shared bathroom', 'Free WiFi', 'Mini fridge'],
            photos: [
                'https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
                'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
                'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
            ]
        },
        {
            id: 'dormitory',
            name: 'Dormitories',
            description: 'Economical shared accommodation for 4-6 students',
            facilities: ['Bunk beds', 'Shared study area', 'Lockers', 'Shared bathroom', 'Free WiFi', 'Common lounge'],
            photos: [
                'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
                'https://images.unsplash.com/photo-1505692952047-1a78307da8f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
                'https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
            ]
        }
    ];

    const commonFacilities = [
        '24/7 Security',
        'Laundry Service',
        'Common Kitchen',
        'Study Room',
        'TV Lounge',
        'Monthly Cleaning',
        'Water Purification',
        'Backup Generator'
    ];

    const filteredRooms = activeTab === 'all'
        ? roomTypes
        : roomTypes.filter(room => room.id === activeTab);

    return (
        <div className="rooms-page">
            <div className="rooms-hero">
                <h1>Our Accommodation</h1>
                <p>Comfortable living spaces designed for students</p>
            </div>

            <div className="rooms-container">
                <div className="rooms-tabs">
                    <button
                        className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
                        onClick={() => setActiveTab('all')}
                    >
                        All Rooms
                    </button>
                    {roomTypes.map(room => (
                        <button
                            key={room.id}
                            className={`tab-btn ${activeTab === room.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(room.id)}
                        >
                            {room.name}
                        </button>
                    ))}
                </div>

                <div className="rooms-grid">
                    {filteredRooms.map(room => (
                        <div key={room.id} className="room-card">
                            <div className="room-header">
                                <h2>{room.name}</h2>
                                <p>{room.description}</p>
                            </div>

                            <div className="room-gallery">
                                {room.photos.map((photo, index) => (
                                    <div
                                        key={index}
                                        className="gallery-item"
                                        onClick={() => setExpandedImage(photo)}
                                    >
                                        <img src={photo} alt={`${room.name} ${index + 1}`} />
                                    </div>
                                ))}
                            </div>

                            <div className="room-facilities">
                                <h3>Room Facilities</h3>
                                <ul>
                                    {room.facilities.map((facility, index) => (
                                        <li key={index}>{facility}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="common-facilities">
                    <h2>Common Facilities</h2>
                    <div className="facilities-grid">
                        {commonFacilities.map((facility, index) => (
                            <div key={index} className="facility-item">
                                <div className="facility-icon">
                                    {getFacilityIcon(facility)}
                                </div>
                                <span>{facility}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {expandedImage && (
                <div className="image-modal" onClick={() => setExpandedImage(null)}>
                    <div className="modal-content">
                        <img src={expandedImage} alt="Expanded view" />
                        <button className="close-btn">&times;</button>
                    </div>
                </div>
            )}
        </div>
    );
};

// Helper function to get icons for facilities
function getFacilityIcon(facility) {
    const icons = {
        '24/7 Security': '🛡️',
        'Laundry Service': '🧺',
        'Common Kitchen': '🍳',
        'Study Room': '📚',
        'TV Lounge': '📺',
        'Monthly Cleaning': '🧹',
        'Water Purification': '🚰',
        'Backup Generator': '🔌'
    };
    return icons[facility] || '✔️';
}

export default Rooms;