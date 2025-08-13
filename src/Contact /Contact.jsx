import { useState } from 'react';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('Form submitted:', formData);
        setIsSubmitted(true);
        setFormData({
            name: '',
            email: '',
            subject: '',
            message: ''
        });
        setTimeout(() => setIsSubmitted(false), 5000);
    };

    return (
        <div className="contact-page">
            <div className="contact-container">
                <div className="contact-header">
                    <h1 className="contact-title">Contact Us</h1>
                    <p className="contact-subtitle">Have questions or feedback? We'd love to hear from you!</p>
                </div>

                <div className="contact-content">
                    <div className="contact-info">
                        <div className="info-card">
                            <div className="info-icon">📍</div>
                            <h3 className="info-title">Our Location</h3>
                            <p className="info-text">

                                253/a4 Udaya Mawatha<br/>
                                Malabe, Sri lanka
                            </p>
                        </div>

                        <div className="info-card">
                            <div className="info-icon">📞</div>
                            <h3 className="info-title">Phone Numbers</h3>
                            <p className="info-text">
                                Office: +94 71 536 7306<br />
                                Manager: +94 71 104 0942
                            </p>
                        </div>

                        <div className="info-card">
                            <div className="info-icon">✉️</div>
                            <h3 className="info-title">Email Addresses</h3>
                            <p className="info-text">
                                Inquiries: info@bodima.lk<br />
                                Support: support@bodima.lk<br/>
                                Email Address: ushanviduranga123@gmail.com
                            </p>
                        </div>

                        <div className="info-card">
                            <div className="info-icon">🕒</div>
                            <h3 className="info-title">Office Hours</h3>
                            <p className="info-text">
                                Monday - Friday: 9:00 AM - 5:00 PM<br />
                                Saturday: 9:00 AM - 1:00 PM<br />
                                Sunday: Closed
                            </p>
                        </div>
                    </div>

                    <div className="contact-form-container">
                        <form onSubmit={handleSubmit} className="contact-form">
                            {isSubmitted && (
                                <div className="form-success">
                                    Thank you for your message! We'll get back to you soon.
                                </div>
                            )}

                            <div className="form-group">
                                <label htmlFor="name">Full Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="subject">Subject</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="message">Your Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="5"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                ></textarea>
                            </div>

                            <button type="submit" className="submit-button">
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;