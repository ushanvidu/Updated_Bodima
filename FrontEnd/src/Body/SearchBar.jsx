import { useState } from 'react';
import './SearchBar.css';
import { FiSearch, FiMapPin, FiUsers } from 'react-icons/fi';

function SearchBar() {
    const [location, setLocation] = useState('');
    const [capacity, setCapacity] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        // Handle search logic here
        console.log('Searching for:', { location, capacity });
    };

    return (
        <div className="search-container">
            <form onSubmit={handleSearch} className="search-bar">
                <div className="search-input-group">
                    <FiMapPin className="search-icon" />
                    <input
                        type="text"
                        placeholder="Enter location (city, area, or landmark)"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="search-input"
                    />
                </div>

                <div className="search-input-group">
                    <FiUsers className="search-icon" />
                    <select
                        value={capacity}
                        onChange={(e) => setCapacity(e.target.value)}
                        className="search-select"
                    >
                        <option value="">Any capacity</option>
                        <option value="1">Single</option>
                        <option value="2">Double</option>
                        <option value="3">3-5 people</option>
                        <option value="6">6+ people</option>
                    </select>
                </div>

                <button type="submit" className="search-button">
                    <FiSearch className="search-button-icon" />
                    Find Boarding Places
                </button>
            </form>
        </div>
    );
}

export default SearchBar;