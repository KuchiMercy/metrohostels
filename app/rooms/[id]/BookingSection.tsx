// "use client";

// import { useState } from "react";
// import Image from "next/image";

// interface IconWithLabel {
//   icon: React.ReactNode;
//   label: string;
// }

// interface Room {
//   image?: string;
//   roomName: string;
//   description: string;
//   icons: IconWithLabel[];
//   price: string;
// }

// interface BookingSectionProps {
//   room: Room;
//   showLabels?: boolean;
// }

// export default function BookingSection({
//   room,
//   showLabels = true,
// }: BookingSectionProps) {
//   const [showBooking, setShowBooking] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [form, setForm] = useState({
//     checkIn: "",
//     checkOut: "",
//     adults: 1,
//     children: 0,
//     customerEmail: "",
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const submitBooking = () => {
//     if (!form.customerEmail) return alert("Please enter your email");
//     if (!form.checkIn || !form.checkOut)
//       return alert("Please select check-in and check-out dates");

//     setLoading(true);

//     try {
//       const checkInDate = new Date(form.checkIn);
//       const checkOutDate = new Date(form.checkOut);
//       const days = Math.max(
//         1,
//         Math.ceil(
//           (checkOutDate.getTime() - checkInDate.getTime()) /
//             (1000 * 60 * 60 * 24)
//         )
//       );

//       // Ensure Paystack is loaded
//       if (!(window as any).PaystackPop) {
//         alert("Paystack not loaded yet. Refresh and try again.");
//         setLoading(false);
//         return;
//       }

//       const handler = (window as any).PaystackPop.setup({
//         key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "",
//         email: form.customerEmail,
//         amount: Number(room.price) * 100 * days, // Paystack expects kobo
//         currency: "NGN",
//         metadata: {
//           roomName: room.roomName,
//           checkIn: form.checkIn,
//           checkOut: form.checkOut,
//           adults: form.adults,
//           children: form.children,
//           days,
//         },
//         callback: function (response: { reference: string }) {
//           // Wrap async inside IIFE
//           (async () => {
//             try {
//               const res = await fetch("/api/booking", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({
//                   ...form,
//                   roomName: room.roomName,
//                   price: room.price,
//                   days,
//                   transactionRef: response.reference,
//                 }),
//               });
//               const data = await res.json();

//               if (data.status === "success") {
//                 alert(
//                   `Payment successful! Transaction ref: ${response.reference}`
//                 );
//                 window.location.href = "/booking/success";
//               } else {
//                 alert("Payment successful but email failed. Check console.");
//               }
//             } catch (err) {
//               console.log(err);
//               alert("Payment successful but email failed. Check console.");
//             }
//           })();
//         },
//         onClose: function () {
//           alert("Payment window closed.");
//         },
//       });

//       handler.openIframe();
//     } catch (err) {
//       console.log(err);
//       alert("Something went wrong. Check console.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-5xl mx-auto p-6 bg-white rounded-2xl shadow-md mt-10">
//       {/* CARD */}
//       <div className="flex flex-col md:flex-row gap-6">
//         {/* IMAGE */}
//         <div className="w-full md:w-1/2 h-64 relative rounded-xl overflow-hidden">
//           <Image
//             src={room.image || "/placeholder-room.jpg"}
//             alt={room.roomName}
//             fill
//             className="object-cover"
//           />
//         </div>

//         {/* ROOM INFO */}
//         <div className="flex-1">
//           <h1 className="text-2xl font-semibold">{room.roomName}</h1>
//           <p className="text-gray-600 mt-1">{room.description}</p>

//           <div className="mt-5">
//             <div className="grid grid-cols-3 gap-4 mt-2 text-gray-500">
//               {room.icons.map((item, index) => (
//                 <div
//                   key={index}
//                   className="flex items-center gap-2 hover:text-black transition-colors duration-200"
//                 >
//                   <span className="text-xl">{item.icon}</span>
//                   {showLabels && <span className="text-sm">{item.label}</span>}
//                 </div>
//               ))}
//             </div>

//             <p className="text-3xl font-bold mt-4">₦{room.price}</p>
//             <p className="text-sm text-gray-500 -mt-1">Per Night</p>
//           </div>

//           {!showBooking && (
//             <button
//               onClick={() => setShowBooking(true)}
//               className="bg-[#B38E71] text-white px-4 py-2 rounded-full text-sm mt-4"
//             >
//               Click To Reserve
//             </button>
//           )}
//         </div>
//       </div>

//       {/* BOOKING FORM */}
//       {showBooking && (
//         <div className="mt-10 border-t pt-6">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//             <div>
//               <label className="text-sm font-medium">Check-in Date:</label>
//               <input
//                 type="date"
//                 name="checkIn"
//                 onChange={handleChange}
//                 value={form.checkIn}
//                 className="w-full p-2 border rounded-md"
//               />
//             </div>

//             <div>
//               <label className="text-sm font-medium">Check-out Date:</label>
//               <input
//                 type="date"
//                 name="checkOut"
//                 onChange={handleChange}
//                 value={form.checkOut}
//                 className="w-full p-2 border rounded-md"
//               />
//             </div>

//             <div>
//               <label className="text-sm font-medium">Adults:</label>
//               <input
//                 type="number"
//                 name="adults"
//                 min="1"
//                 onChange={handleChange}
//                 value={form.adults}
//                 className="w-full p-2 border rounded-md"
//               />
//             </div>

//             <div>
//               <label className="text-sm font-medium">Children:</label>
//               <input
//                 type="number"
//                 name="children"
//                 min="0"
//                 onChange={handleChange}
//                 value={form.children}
//                 className="w-full p-2 border rounded-md"
//               />
//             </div>

//             <div>
//               <label className="text-sm font-medium">Your Email:</label>
//               <input
//                 type="email"
//                 name="customerEmail"
//                 onChange={handleChange}
//                 value={form.customerEmail}
//                 className="w-full p-2 border rounded-md"
//                 required
//               />
//             </div>
//           </div>

//           <button
//             onClick={submitBooking}
//             disabled={loading}
//             className="bg-[#B38E71] w-full text-white py-3 rounded-full mt-6 flex justify-center items-center"
//           >
//             {loading ? "Processing..." : "Proceed To Payment"}
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import Image from "next/image";

interface IconWithLabel {
  icon: React.ReactNode;
  label: string;
}

interface Room {
  image?: string;
  roomName: string;
  description: string;
  icons: IconWithLabel[];
  price: string;
}

interface BookingSectionProps {
  room: Room;
  showLabels?: boolean;
}

export default function BookingSection({
  room,
  showLabels = true,
}: BookingSectionProps) {
  const [showBooking, setShowBooking] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentError, setPaymentError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [redirectLoading, setRedirectLoading] = useState(false);
  const [form, setForm] = useState({
    checkIn: "",
    checkOut: "",
    adults: 1,
    children: 0,
    customerEmail: "",
    firstName: "",
    lastName: "",
  });
  const [errors, setErrors] = useState({
    checkIn: "",
    checkOut: "",
    customerEmail: "",
    firstName: "",
    lastName: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitBooking = () => {
    let hasError = false;
    const newErrors = {
      customerEmail: "",
      checkIn: "",
      checkOut: "",
      firstName: "",
      lastName: "",
    };

    if (!form.checkIn) {
      newErrors.checkIn = "Please select check-in date";
      hasError = true;
    }

    if (!form.checkOut) {
      newErrors.checkOut = "Please select check-out date";
      hasError = true;
    }
    if (!form.customerEmail) {
      newErrors.customerEmail = "Please enter your email";
      hasError = true;
    }
    if (!form.firstName) {
      newErrors.firstName = "Please enter your first name";
      hasError = true;
    }
    if (!form.lastName) {
      newErrors.lastName = "Please enter your last name";
      hasError = true;
    }

    setErrors(newErrors);
    if (hasError) return;

    setLoading(true);

    try {
      const checkInDate = new Date(form.checkIn);
      const checkOutDate = new Date(form.checkOut);
      const days = Math.max(
        1,
        Math.ceil(
          (checkOutDate.getTime() - checkInDate.getTime()) /
            (1000 * 60 * 60 * 24)
        )
      );

      // Ensure Paystack is loaded
      interface WindowWithPaystack extends Window {
        PaystackPop?: {
          setup: (config: {
            key: string;
            email: string;
            amount: number;
            currency: string;
            metadata: Record<string, unknown>;
            callback: (response: { reference: string }) => void;
            onClose: () => void;
          }) => { openIframe: () => void };
        };
      }
      if (!(window as WindowWithPaystack).PaystackPop) {
        alert("Paystack not loaded yet. Refresh and try again.");
        setLoading(false);
        return;
      }

      const handler = (window as WindowWithPaystack).PaystackPop!.setup({
        key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || "",
        email: form.customerEmail,
        amount: Number(room.price) * 100 * days,
        currency: "NGN",
        metadata: {
          roomName: room.roomName,
          checkIn: form.checkIn,
          checkOut: form.checkOut,
          adults: form.adults,
          children: form.children,
          days,
        },
        callback: function (response: { reference: string }) {
          (async () => {
            try {
              setRedirectLoading(true);
              await fetch("/api/booking", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  ...form,
                  roomName: room.roomName,
                  price: room.price,
                  days,
                  transactionRef: response.reference,
                }),
              });

              window.location.href = "/booking/success";
            } catch (err) {
              console.log(err);
              window.location.href = "/";
            }
          })();
        },
        onClose: function () {
          setErrorMessage("Payment failed or was cancelled. Please try again.");
          setPaymentError(true);
        },
      });

      handler.openIframe();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-2xl shadow-md mt-10">
      {/* CARD */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* IMAGE */}
        <div className="w-full md:w-1/2 h-64 relative rounded-xl overflow-hidden">
          <Image
            src={room.image || "/placeholder-room.jpg"}
            alt={room.roomName}
            fill
            className="object-cover"
          />
        </div>

        {/* ROOM INFO */}
        <div className="flex-1">
          <h1 className="text-2xl font-semibold">{room.roomName}</h1>
          <p className="text-gray-600 mt-1">{room.description}</p>

          <div className="mt-5">
            <div className="grid grid-cols-3 gap-4 mt-2 text-gray-500">
              {room.icons.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 hover:text-black transition-colors duration-200"
                >
                  <span className="text-xl">{item.icon}</span>
                  {showLabels && <span className="text-sm">{item.label}</span>}
                </div>
              ))}
            </div>

            <p className="text-3xl font-bold mt-5">₦{room.price}</p>
            <p className="text-sm text-gray-500 -mt-1">Per Night</p>
          </div>

          {!showBooking && (
            <button
              onClick={() => setShowBooking(true)}
              className="bg-[#B38E71] text-white px-4 py-2 rounded-full text-sm mt-4 cursor-pointer"
            >
              Click To Reserve
            </button>
          )}
        </div>
      </div>

      {/* BOOKING FORM */}
      {showBooking && (
        <div className="mt-10 border-t border-[#a5a5a5] pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium">Check-in Date:</label>
              <input
                type="date"
                name="checkIn"
                onChange={handleChange}
                value={form.checkIn}
                // className="w-full p-2 border rounded-md"
                className="
  w-full p-3 
  border border-gray-200 
  rounded-full 
  bg-gray-50 
  shadow-inner 
  focus:outline-none 
  focus:ring-2 focus:ring-[#B38E71]/30
  focus:border-[#B38E71]
  transition-all duration-200
"
              />
              {errors.checkIn && (
                <p className="text-red-500 text-sm mt-1">{errors.checkIn}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium">Check-out Date:</label>
              <input
                type="date"
                name="checkOut"
                onChange={handleChange}
                value={form.checkOut}
                // className="w-full p-2 border rounded-md"
                className="
  w-full p-3 
  border border-gray-200 
  rounded-full 
  bg-gray-50 
  shadow-inner 
  focus:outline-none 
  focus:ring-2 focus:ring-[#B38E71]/30
  focus:border-[#B38E71]
  transition-all duration-200
"
              />
              {errors.checkOut && (
                <p className="text-red-500 text-sm mt-1">{errors.checkOut}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium">Adults:</label>
              <input
                type="number"
                name="adults"
                min="1"
                onChange={handleChange}
                value={form.adults}
                // className="w-full p-2 border rounded-md"
                className="
  w-full p-3 
  border border-gray-200 
  rounded-full 
  bg-gray-50 
  shadow-inner 
  focus:outline-none 
  focus:ring-2 focus:ring-[#B38E71]/30
  focus:border-[#B38E71]
  transition-all duration-200
"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Children:</label>
              <input
                type="number"
                name="children"
                min="0"
                onChange={handleChange}
                value={form.children}
                className="
  w-full p-3 
  border border-gray-200 
  rounded-full 
  bg-gray-50 
  shadow-inner 
  focus:outline-none 
  focus:ring-2 focus:ring-[#B38E71]/30
  focus:border-[#B38E71]
  transition-all duration-200
"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Email:</label>
              <input
                type="email"
                name="customerEmail"
                onChange={handleChange}
                value={form.customerEmail}
                placeholder="example@gmail.com"
                className="
  w-full p-3 
  border border-gray-200 
  rounded-full 
  bg-gray-50 
  shadow-inner 
  focus:outline-none 
  focus:ring-2 focus:ring-[#B38E71]/30
  focus:border-[#B38E71]
  transition-all duration-200
"
                required
              />
              {errors.customerEmail && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.customerEmail}
                </p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium">First Name:</label>
              <input
                type="text"
                name="firstName"
                placeholder="John"
                onChange={handleChange}
                value={form.firstName}
                className="
  w-full p-3 
  border border-gray-200 
  rounded-full 
  bg-gray-50 
  shadow-inner 
  focus:outline-none 
  focus:ring-2 focus:ring-[#B38E71]/30
  focus:border-[#B38E71]
  transition-all duration-200
"
                required
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium">Last Name:</label>
              <input
                type="text"
                name="lastName"
                placeholder="Doe"
                onChange={handleChange}
                value={form.lastName}
                className="
  w-full p-3 
  border border-gray-200 
  rounded-full 
  bg-gray-50 
  shadow-inner 
  focus:outline-none 
  focus:ring-2 focus:ring-[#B38E71]/30
  focus:border-[#B38E71]
  transition-all duration-200
"
                required
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
              )}
            </div>
          </div>

          <button
            onClick={submitBooking}
            disabled={loading}
            className="bg-[#B38E71] w-full text-white py-3 rounded-full mt-6 flex justify-center items-center focus:outline-none 
  focus:ring-2 focus:ring-[#B38E71]/30
  focus:border-[#B38E71]
  transition-all duration-200   shadow-inner "
          >
            {loading ? "Processing..." : "Proceed To Payment"}
          </button>
        </div>
      )}
      {paymentError && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl max-w-sm w-full text-center">
            <p className="text-red-600 font-semibold mb-4">{errorMessage}</p>
            <button
              onClick={() => setPaymentError(false)}
              className="bg-[#B38E71] text-white px-4 py-2 rounded-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
      {redirectLoading && (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex justify-center items-center z-[9999]">
          <div className="animate-spin h-12 w-12 border-4 border-[#B38E71] border-t-transparent rounded-full"></div>
          <p className="mt-4 text-[#B38E71] font-medium">Redirecting...</p>
        </div>
      )}
    </div>
  );
}
