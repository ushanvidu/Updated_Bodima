import { useState, useEffect } from "react";
import { Button, Container, Row, Col, Card, Modal, Form, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Admin.css";
import { useNavigate} from "react-router-dom";




export default function Admin() {
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const[room, setRoom] = useState("");
    const[admin, setAdmin] = useState("");
    const[payment, setPayment] = useState("");
    const[phone, setPhone] = useState("");
    const [,setError] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');



        try {

            const response = await fetch(`http://localhost:8090/api/users`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password,
                    phone: phone,
                    room: room? {id: room?.id}:null,
                    admin: admin?{id: admin?.id}:null,
                    payment: payment,
                })
            });

            const data = await response.json();
            if (response.ok) {
                console.log('Successfully logged in', data);
            } else
                setError(data.error||'login failed')
                console.error('Error logged in', data);





            const response2 = await fetch(`http://localhost:8090/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify({
                    username: name,
                    password: password
                })
            });

            const data1 = await response2.json();
            if(response2.ok){
                console.log('Successfully add to login', data1);
            }
         else
        setError(data.error||'login failed')
        console.error('can not add to login ', data1);
        }


        catch (err) {
            setError(err.message || "Something went wrong!");
            console.error("Error logged in", err);
        }





    }
    useEffect(() => {

        const stored = localStorage.getItem('user');
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                setUser(parsed);

                // admind blnwa
                if (parsed.role !== 'admin') {
                    alert('Access denied. Admin privileges required.');
                    navigate('/login');
                    return;
                }
            } catch (err) {
                console.error('Error parsing user data:', err);
                navigate('/login');
                return;
            }
        } else {
            navigate('/login');
            return;
        }
        setLoading(false);
    }, [navigate]);


    if (loading)
    {
        return (
            <div className="admin-main">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Loading...</p>
                </div>
            </div>
        );
    }

    const handleShowModal = (content) => {
        setModalContent(content);
        setShowModal(true);
    };

    const handleCloseModal = () => setShowModal(false);


    const modalContents = {
        addUser: {
            title: "Add New User",
            body: <UserForm handleSubmit={handleSubmit}
                            name={name} setName={setName}
                            email={email} setEmail={setEmail}
                            password={password} setPassword={setPassword}
                            phone={phone} setPhone={setPhone}
                            room={room} setRoom={setRoom}
                            admin={admin} setAdmin={setAdmin}
                            payment={payment} setPayment={setPayment}
            />
        },
        removeUser: {
            title: "Remove User",
            body: <RemoveUserForm handleSubmit={handleSubmit} />
        },
        updateUser: {
            title: "Update User",
            body: <UserForm isEdit={true} handleSubmit={handleSubmit}
                            name={name} setName={setName}
                            email={email} setEmail={setEmail}
                            password={password} setPassword={setPassword}
                            phone={phone} setPhone={setPhone}
                            room={room} setRoom={setRoom}
                            admin={admin} setAdmin={setAdmin}
                            payment={payment} setPayment={setPayment}
            />
        },
        addPayment: {
            title: "Add Payment Month",
            body: <PaymentForm handleSubmit={handleSubmit} />
        }
    };

    return (
        <div className="admin-main">
            <Container fluid>
                <Row>
                    <Col>
                        <div className="admin-header">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h1>Admin Dashboard</h1>
                                    <p>Welcome, {user?.name || 'Administrator'}</p>
                                </div>
                                <Button
                                    variant="outline-danger"
                                    onClick={() => {
                                        localStorage.removeItem('user');
                                        navigate('/login');
                                    }}
                                >
                                    Logout
                                </Button>
                            </div>
                        </div>
                    </Col>
                </Row>

                <Row className="justify-content-center">
                    <Col xl={10}>
                        <Row>
                            <Col md={6} lg={3} className="mb-4">
                                <AdminCard
                                    title="Add User"
                                    icon="user-plus"
                                    description="Create new user accounts"
                                    variant="primary"
                                    onClick={() => handleShowModal('addUser')}
                                />
                            </Col>
                            <Col md={6} lg={3} className="mb-4">
                                <AdminCard
                                    title="Remove User"
                                    icon="user-times"
                                    description="Delete user accounts"
                                    variant="danger"
                                    onClick={() => handleShowModal('removeUser')}
                                />
                            </Col>
                            <Col md={6} lg={3} className="mb-4">
                                <AdminCard
                                    title="Update User"
                                    icon="user-edit"
                                    description="Modify user information"
                                    variant="warning"
                                    onClick={() => handleShowModal('updateUser')}
                                />
                            </Col>
                            <Col md={6} lg={3} className="mb-4">
                                <AdminCard
                                    title="Add Payment month"
                                    icon="credit-card"
                                    description="Add payment month for users"
                                    variant="success"
                                    onClick={() => handleShowModal('addPayment')}
                                />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Container>

            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{modalContent && modalContents[modalContent].title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {modalContent && modalContents[modalContent].body}
                </Modal.Body>
            </Modal>
        </div>
    );
}


function AdminCard({ title, icon, description, variant, onClick }) {
    return (
        <Card className="admin-card h-100" onClick={onClick}>
            <Card.Body className="text-center">
                <div className={`card-icon bg-${variant}`}>
                    <i className={`fas fa-${icon}`}></i>
                </div>
                <h5>{title}</h5>
                <p>{description}</p>
                <Button variant={variant} className="mt-2">Action</Button>
            </Card.Body>
        </Card>
    );
}


function UserForm({

                      isEdit = false, handleSubmit,
                      name, setName,
                      email, setEmail,
                      password, setPassword,
                      phone, setPhone,
                      room, setRoom,
                      admin, setAdmin,
                      payment, setPayment}) {

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <Form.Control type="text" placeholder="Enter full name" value={name} onChange={(e)=> setName(e.target.value)} required />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Phone no.</Form.Label>
                <Form.Control type="tel" placeholder="Enter phone number" value={phone} onChange={(e)=>setPhone(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Admin</Form.Label>
                <Form.Control type="number" placeholder="Enter admin number" value={admin} onChange={(e)=>setAdmin(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Room </Form.Label>
                <Form.Control type="number" placeholder="Enter room ID" value={room} onChange={(e)=>setRoom(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Payment</Form.Label>
                <Form.Control type="text" placeholder="Enter Payment amount" value={payment} onChange={(e)=>setPayment(e.target.value)}/>
            </Form.Group>


            <Button variant="primary" type="submit">
                {isEdit ? 'Update User' : 'Create User'}
            </Button>
        </Form>
    );
}






function RemoveUserForm() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState("");
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await fetch("http://localhost:8090/api/users");

            if (response.ok) {
                const data = await response.json();
                setUsers(data);
                setError("");
            } else {
                setError("Failed to fetch users");
                console.error("Fetch users failed:", response.status);
            }
        } catch (err) {
            console.error("Failed to connect to the server");
            console.error("Error fetching users:", err);
        } finally {
            setLoading(false);
        }
    };


    const handleDeleteUser = async (e) => {
        e.preventDefault();

        if (!selectedUser) {
            alert("Please select a user!");
            return;
        }

        if (!confirmDelete) {
            alert("Please confirm before deleting!");
            return;
        }

        try {
            const response = await fetch(`http://localhost:8090/api/users/${selectedUser}`, {
                method: "DELETE",
            });

            if (response.ok) {
                alert(" User deleted successfully!");
                setSelectedUser("");
                setConfirmDelete(false);
                fetchUsers();
            } else if (response.status === 404) {
                alert(" User not found!");
            } else {
                alert(" Failed to delete user. Server error: " + response.status);
            }
        } catch (err) {
            console.error("Error deleting user:", err);
            alert("Something went wrong while connecting to the server!");
        }
    };


    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <Form onSubmit={handleDeleteUser}>

            <Form.Group className="mb-3">
                <Form.Label>Select User to Remove</Form.Label>
                <Form.Select
                    value={selectedUser}
                    onChange={(e) => setSelectedUser(e.target.value)}
                    required
                >
                    <option value="">-- Select a user --</option>
                    {users.length > 0 ? (
                        users.map((user) => (
                            <option key={user.userId} value={user.userId}>
                                {user.name} - {user.email}
                            </option>
                        ))
                    ) : (
                        <option disabled>No users found</option>
                    )}
                </Form.Select>
            </Form.Group>


            {selectedUser && (
                <Form.Group className="mb-3">
                    <Form.Check
                        type="checkbox"
                        label="I confirm I want to remove this user"
                        checked={confirmDelete}
                        onChange={(e) => setConfirmDelete(e.target.checked)}
                        required
                    />
                </Form.Group>
            )}


            {error && <div className="text-danger mb-3">{error}</div>}


            <Button
                variant="danger"
                type="submit"
                disabled={!selectedUser || !confirmDelete || loading}
            >
                {loading ? "Processing..." : "Remove User"}
            </Button>
        </Form>
    );
}



function PaymentForm({ onClose, setError, setSuccess }) {
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({
        userId: "",
        month: "",
        monthlyCharge: ""
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUsersForPayment = async () => {
            try {
                setLoading(true);
                const response = await fetch("http://localhost:8090/api/users");

                if (response.ok) {
                    const data = await response.json();
                    setUsers(data);
                    if (setError) setError("");
                } else {
                    if (setError) setError("Failed to fetch users");
                    console.error("Fetch users failed:", response.status);
                }
            } catch (err) {
                if (setError) setError("Failed to connect to the server");
                console.error("Error fetching users:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchUsersForPayment();
    }, [setError]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (setError) setError("");

        try {

            const monthDate = formData.month ? `${formData.month}-01` : null;


            const requestBody = {
                user: { userId: parseInt(formData.userId) },
                month: monthDate,
                monthlyCharge: parseFloat(formData.monthlyCharge) || 0,
                paidAmount: 0,
                status: "PENDING"
            };

            console.log("Sending payment data:", requestBody);


            const response = await fetch("http://localhost:8090/api/payments/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody)
            });

            if (response.ok) {
                const data = await response.json();
                if (setSuccess) setSuccess("Payment created successfully!");
                console.log("Payment created:", data);

                // Close modal after success
                setTimeout(() => {
                    if (onClose) onClose();
                }, 1500);
            } else {
                const errorData = await response.json();
                if (setError) setError(`Failed to create payment: ${errorData.message || response.status}`);
                console.error("Error creating payment:", response.status, errorData);
            }
        } catch (err) {
            if (setError) setError("Something went wrong while creating payment");
            console.error("Error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Form.Label>Select User</Form.Label>
                <Form.Select
                    name="userId"
                    value={formData.userId}
                    onChange={handleChange}
                    required
                    disabled={loading}
                >
                    <option value="">Select a user...</option>
                    {users.map(user => (
                        <option key={user.userId} value={user.userId}>
                            {user.name} ({user.email}) - {user.payment || 'No payment'}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Payment Month</Form.Label>
                <Form.Control
                    type="month"
                    name="month"
                    value={formData.month}
                    onChange={handleChange}
                    required
                    disabled={loading}
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Monthly Charge Amount</Form.Label>
                <Form.Control
                    type="number"
                    name="monthlyCharge"
                    placeholder="Enter monthly charge amount"
                    value={formData.monthlyCharge}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    required
                    disabled={loading}
                />
            </Form.Group>

            <div className="d-flex gap-2 justify-content-end">
                <Button variant="outline-secondary" onClick={onClose} disabled={loading}>
                    Cancel
                </Button>
                <Button variant="success" type="submit" disabled={loading}>
                    {loading ? (
                        <>
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                                className="me-2"
                            />
                            Processing...
                        </>
                    ) : (
                        "Add Payment"
                    )}
                </Button>
            </div>
        </Form>
    );
}