import { useEffect } from 'react';
import './Rules.css';

const Rules = () => {
    useEffect(() => {

        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="rules-page">
            <div className="rules-container">
                <h1 className="rules-title">House Rules</h1>
                <p className="rules-subtitle">To ensure a comfortable living environment for all residents</p>

                <div className="rules-grid">
                    <div className="rule-card">
                        <div className="rule-icon">🕒</div>
                        <h3 className="rule-title">Quiet Hours</h3>
                        <p className="rule-description">
                            Please maintain silence between 10:00 PM and 7:00 AM to respect others' rest time.
                        </p>
                    </div>

                    <div className="rule-card">
                        <div className="rule-icon">🧹</div>
                        <h3 className="rule-title">Cleanliness</h3>
                        <p className="rule-description">
                            Keep common areas clean. Wash your dishes immediately after use and dispose of garbage properly.
                        </p>
                    </div>

                    <div className="rule-card">
                        <div className="rule-icon">🚭</div>
                        <h3 className="rule-title">No Smoking</h3>
                        <p className="rule-description">
                            Smoking is strictly prohibited inside the premises. Designated smoking areas are available outside.
                        </p>
                    </div>

                    <div className="rule-card">
                        <div className="rule-icon">🔌</div>
                        <h3 className="rule-title">Electricity Usage</h3>
                        <p className="rule-description">
                            Turn off lights and appliances when not in use. High electricity bills will be shared among residents.
                        </p>
                    </div>

                    <div className="rule-card">
                        <div className="rule-icon">👥</div>
                        <h3 className="rule-title">Visitors Policy</h3>
                        <p className="rule-description">
                            Overnight guests require prior approval. Day visitors must leave by 9:00 PM.
                        </p>
                    </div>

                    <div className="rule-card">
                        <div className="rule-icon">💰</div>
                        <h3 className="rule-title">Rent Payment</h3>
                        <p className="rule-description">
                            Rent is due on the 1st of each month. Late payments incur a 5% penalty after the 5th.
                        </p>
                    </div>
                </div>

                <div className="rules-footer">
                    <p>Violation of these rules may result in warnings or termination of accommodation.</p>
                    <p>For any questions, please contact the management.</p>
                </div>
            </div>
        </div>
    );
};

export default Rules;