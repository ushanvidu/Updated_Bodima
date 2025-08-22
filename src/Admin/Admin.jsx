import { useState, useEffect } from "react";
import { Button, Container, Row, Col, Card, Modal, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Admin.css";
import { useNavigate } from "react-router-dom";

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

            const response2 = await fetch(`http://localhost:8090/api/auth/login`, {
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

    // Modal content definitions
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
            body: <UserForm isEdit={true} handleSubmit={handleSubmit} />
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
                                    <p>Welcome, {user?.userName || 'Administrator'}</p>
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
                                    title="Add Payment"
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
    return (
        <Form>
            <Form.Group className="mb-3">
                <Form.Label>Select User to Remove</Form.Label>
                <Form.Select>
                    <option>Select a user...</option>
                    <option>John Doe (john@example.com)</option>
                    <option>Jane Smith (jane@example.com)</option>
                    <option>Robert Johnson (robert@example.com)</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Check
                    type="checkbox"
                    label="I confirm I want to remove this user"
                />
            </Form.Group>
            <Button variant="danger" type="submit">
                Remove User
            </Button>
        </Form>
    );
}

function PaymentForm() {
    return (
        <Form>
            <Form.Group className="mb-3">
                <Form.Label>Select User</Form.Label>
                <Form.Select>
                    <option>Select a user...</option>
                    <option>John Doe (john@example.com)</option>
                    <option>Jane Smith (jane@example.com)</option>
                    <option>Robert Johnson (robert@example.com)</option>
                </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Payment Month</Form.Label>
                <Form.Control type="month" />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Amount</Form.Label>
                <Form.Control type="number" placeholder="Enter amount" />
            </Form.Group>
            <Button variant="success" type="submit">
                Add Payment
            </Button>
        </Form>
    );
}