// import { useState } from "react";
// import { Form, Button } from "react-bootstrap";
// import { addPayment } from "../../services/paymentService";
//
// export default function PaymentForm() {
//     const [payment, setPayment] = useState({ amount: "", method: "", userId: "" });
//
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await addPayment(payment);
//             alert("Payment processed successfully!");
//             setPayment({ amount: "", method: "", userId: "" });
//         } catch (error) {
//             alert("Failed to process payment");
//         }
//     };
//
//     return (
//         <Form onSubmit={handleSubmit}>
//             <Form.Group>
//                 <Form.Label>Amount</Form.Label>
//                 <Form.Control
//                     type="number"
//                     placeholder="Enter amount"
//                     value={payment.amount}
//                     onChange={(e) => setPayment({ ...payment, amount: e.target.value })}
//                 />
//             </Form.Group>
//             <Form.Group>
//                 <Form.Label>Payment Method</Form.Label>
//                 <Form.Select
//                     value={payment.method}
//                     onChange={(e) => setPayment({ ...payment, method: e.target.value })}
//                 >
//                     <option value="">Select Method</option>
//                     <option value="CASH">Cash</option>
//                     <option value="CARD">Card</option>
//                 </Form.Select>
//             </Form.Group>
//             <Button type="submit" variant="success" className="mt-3">Process Payment</Button>
//         </Form>
//     );
// }