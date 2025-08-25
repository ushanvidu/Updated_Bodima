// import { useEffect, useState } from "react";
// import { Form, Button } from "react-bootstrap";
// import { getUsers, deleteUser } from "../../services/userService";
//
// export default function RemoveUserForm({ onUserRemoved }) {
//     const [users, setUsers] = useState([]);
//     const [selectedUser, setSelectedUser] = useState("");
//     const [confirmDelete, setConfirmDelete] = useState(false);
//
//     const fetchUsers = async () => {
//         try {
//             const data = await getUsers();
//             setUsers(data);
//         } catch (error) {
//             console.error("Error fetching users:", error);
//         }
//     };
//
//     const handleDelete = async (e) => {
//         e.preventDefault();
//         if (!selectedUser || !confirmDelete) {
//             alert("Please select a user and confirm deletion!");
//             return;
//         }
//         try {
//             await deleteUser(selectedUser);
//             alert("User removed successfully!");
//             setConfirmDelete(false);
//             fetchUsers();
//             onUserRemoved();
//         } catch (error) {
//             alert("Failed to delete user");
//         }
//     };
//
//     useEffect(() => {
//         fetchUsers();
//     }, []);
//
//     return (
//         <Form onSubmit={handleDelete}>
//             <Form.Group>
//                 <Form.Label>Select User</Form.Label>
//                 <Form.Select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
//                     <option value="">-- Select a user --</option>
//                     {users.map((user) => (
//                         <option key={user.userId} value={user.userId}>
//                             {user.name} ({user.email})
//                         </option>
//                     ))}
//                 </Form.Select>
//             </Form.Group>
//             <Form.Group className="mt-3">
//                 <Form.Check
//                     type="checkbox"
//                     label="Confirm remove"
//                     checked={confirmDelete}
//                     onChange={(e) => setConfirmDelete(e.target.checked)}
//                 />
//             </Form.Group>
//             <Button variant="danger" type="submit" disabled={!confirmDelete}>
//                 Remove User
//             </Button>
//         </Form>
//     );
// }