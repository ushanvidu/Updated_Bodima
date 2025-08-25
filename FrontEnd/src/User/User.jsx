import { useEffect, useMemo, useState } from "react";
import "./User.css";

const API_BASE = 'http://localhost:8090';


const toNumber = (value) => {
    const num = parseFloat(value);
    return isNaN(num) ? 0 : num;
};

// API functions
async function getOutstandingPayment(userId) {
    try {
        const res = await fetch(`${API_BASE}/api/payments/user/${userId}`);
        if (!res.ok) {
            throw new Error("Payment fetch failed!");
        }
        return res.json();
    } catch (error) {
        console.error('Error fetching payments:', error);
        return [];
    }
}



async function createPayment(body) {
    try {
        const res = await fetch(`${API_BASE}/api/payments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
        if (!res.ok) throw new Error('Create payment failed');
        return res.json();
    } catch (error) {
        console.error('Error creating payment:', error);
        throw error;
    }
}

async function fetchOutstandingAmountInCents(userId) {
    try {
        const payments = await getOutstandingPayment(userId);
        const outstanding = payments.reduce((sum, p) => {
            const total = toNumber(p.totalAmount ?? p.monthlyCharge);
            const paid = toNumber(p.paidAmount);
            const diff = total - paid;
            return sum + (diff > 0 ? diff : 0);
        }, 0);
        return Math.round(outstanding * 100);
    } catch (error) {
        console.error('Error calculating outstanding amount:', error);
        return 0;
    }
}




function User() {
    const [user, setUser] = useState(null);
    const [amountDue, setAmountDue] = useState(0);
    const [selectedRoom, setSelectedRoom] = useState("1");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const formattedAmount = useMemo(() => (amountDue / 100).toFixed(2), [amountDue]);

    useEffect(() => {
        async function loadUserData() {
            try {
                setLoading(true);
                const stored = localStorage.getItem("user");
                if (stored) {
                    const parsed = JSON.parse(stored);
                    setUser(parsed);

                    // Fetch outstanding amount
                    if (parsed.userId) {
                        const outstanding = await fetchOutstandingAmountInCents(parsed.userId);
                        setAmountDue(outstanding);
                    }
                }
            } catch (error) {
                console.error('Error loading user data:', error);
                setError('Failed to load user data');
            } finally {
                setLoading(false);
            }
        }

        loadUserData();
    }, []);

    const onGooglePayClick = async () => {
        if (!window.google || !window.google.payments || !window.google.payments.api) {
            alert("Google Pay is not available on this device/browser.");
            return;
        }

        const paymentsClient = new window.google.payments.api.PaymentsClient({
            environment: "TEST",
        });

        const isReadyToPayRequest = {
            apiVersion: 2,
            apiVersionMinor: 0,
            allowedPaymentMethods: [
                {
                    type: "CARD",
                    parameters: {
                        allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                        allowedCardNetworks: ["MASTERCARD", "VISA"],
                    },
                },
            ],
        };

        const ready = await paymentsClient.isReadyToPay(isReadyToPayRequest);
        if (!ready.result) {
            alert("Google Pay is not available.");
            return;
        }

        const paymentDataRequest = {
            apiVersion: 2,
            apiVersionMinor: 0,
            allowedPaymentMethods: [
                {
                    type: "CARD",
                    parameters: {
                        allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                        allowedCardNetworks: ["MASTERCARD", "VISA"],
                    },
                    tokenizationSpecification: {
                        type: "PAYMENT_GATEWAY",
                        parameters: {
                            gateway: "example", // Replace with your gateway
                            gatewayMerchantId: "exampleGatewayMerchantId",
                        },
                    },
                },
            ],
            transactionInfo: {
                totalPriceStatus: "FINAL",
                totalPrice: (amountDue / 100).toFixed(2),
                currencyCode: "USD",
            },
            merchantInfo: {
                merchantId: "BCR2DN4T6XXXXX", // Replace with your merchantId
                merchantName: "Bodima",
            },
        };

        try {
            const paymentData = await paymentsClient.loadPaymentData(paymentDataRequest);

            // Send payment to backend
            if (user?.userId) {
                await createPayment({
                    userId: user.userId,
                    amount: amountDue,
                    paymentMethod: 'GOOGLE_PAY',
                    paymentData: paymentData
                });

                // Refresh outstanding amount
                const outstanding = await fetchOutstandingAmountInCents(user.userId);
                setAmountDue(outstanding);

                alert("Payment successful! Thank you.");
            }
        } catch (err) {
            if (err.statusCode !== "CANCELED") {
                console.error(err);
                alert("Payment failed. Please try again.");
            }
        }
    };

    if (loading) {
        return (
            <div className="user-page">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Loading...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="user-page">
                <div className="error-container">
                    <p>Error: {error}</p>
                    <button onClick={() => window.location.reload()}>Retry</button>
                </div>
            </div>
        );
    }

    return (
        <div className="user-page">
            <div className="user-hero">
                <div className="user-hero-overlay" />
                <div className="user-hero-content">
                    <h1>Hello{user?.userName ? ", " : ""}{user?.userName?.toUpperCase() || "Guest"}</h1>
                    <p>Here is your current balance and quick payment options</p>
                </div>
            </div>

            <main className="user-main">
                <section className="balance-card">
                    <div className="balance-header">
                        <span className="badge">Outstanding</span>
                        <h2>${formattedAmount}</h2>
                        <p>Amount due this month</p>
                    </div>
                    <div className="balance-actions">
                        <button
                            className="gpay-button"
                            onClick={onGooglePayClick}
                            disabled={amountDue === 0}
                        >
                            Pay with Google Pay
                        </button>
                        <button className="secondary-button">
                            View Statement
                        </button>
                    </div>
                    


                </section>

                <section className="details-grid">
                    <div className="detail-card">
                        <label htmlFor="room">Your Room No.</label>
                        <select
                            id="room"
                            className="select"
                            value={selectedRoom}
                            onChange={(e) => setSelectedRoom(e.target.value)}
                        >
                            {["1","2","3","4","5","6","7"].map((r) => (
                                <option key={r} value={r}>{r}</option>
                            ))}
                        </select>
                    </div>

                    <div className="detail-card">
                        <h3>Due Date</h3>
                        <p>25th of this month</p>
                    </div>
                    <div className="detail-card">
                        <h3>Status</h3>
                        <p className={`status ${amountDue > 0 ? 'due' : 'paid'}`}>
                            {amountDue > 0 ? 'Due' : 'Paid'}
                        </p>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default User;