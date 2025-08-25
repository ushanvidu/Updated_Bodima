// import { useState } from "react";
// import { Form, Button } from "react-bootstrap";
// import { addUser } from "../../services/userService";
//
// export default function AddUserForm({ onUserAdded }) {
//     const [formData, setFormData] = useState({ name: "", email: "", role: "" });
//
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await addUser(formData);
//             alert("User added successfully!");
//             setFormData({ name: "", email: "", role: "" });
//             onUserAdded();
//         } catch (error) {
//             alert("Failed to add user");
//         }
//     };
//
//     return (
//         <Form onSubmit={handleSubmit}>
//             <Form.Group>
//                 <Form.Label>Name</Form.Label>
//                 <Form.Control
//                     type="text"
//                     placeholder="Enter name"
//                     value={formData.name}
//                     onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                     required
//                 />
//             </Form.Group>
//             <Form.Group>
//                 <Form.Label>Email</Form.Label>
//                 <Form.Control
//                     type="email"
//                     placeholder="Enter email"
//                     value={formData.email}
//                     onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                     required
//                 />
//             </Form.Group>
//             <Form.Group>
//                 <Form.Label>Role</Form.Label>
//                 <Form.Select
//                     value={formData.role}
//                     onChange={(e) => setFormData({ ...formData, role: e.target.value })}
//                 >
//                     <option value="">Select Role</option>
//                     <option value="ADMIN">Admin</option>
//                     <option value="USER">User</option>
//                 </Form.Select>
//             </Form.Group>
//             <Button type="submit" variant="primary" className="mt-3">Add User</Button>
//         </Form>
//     );
// }