// const PAYMENT_API = "http://localhost:8090/api/payments";
//
// export const addPayment = async (paymentData) => {
//     const response = await fetch(`${PAYMENT_API}/create`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(paymentData),
//     });
//     if (!response.ok) throw new Error("Failed to process payment");
//     return response.json();
// };