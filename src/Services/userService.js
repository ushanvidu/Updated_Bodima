// const API_URL = "http://localhost:8090/api/users";
//
// export const getUsers = async () => {
//     const response = await fetch(API_URL);
//     if (!response.ok) throw new Error("Failed to fetch users");
//     return response.json();
// };
//
// export const addUser = async (userData) => {
//     const response = await fetch(API_URL, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(userData),
//     });
//     if (!response.ok) throw new Error("Failed to add user");
//     return response.json();
// };
//
// export const updateUser = async (id, userData) => {
//     const response = await fetch(`${API_URL}/${id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(userData),
//     });
//     if (!response.ok) throw new Error("Failed to update user");
//     return response.json();
// };
//
// export const deleteUser = async (id) => {
//     const response = await fetch(`${API_URL}/${id}`, {
//         method: "DELETE",
//     });
//     if (!response.ok) throw new Error("Failed to delete user");
//     return response.json();
// };