// // src/components/PaymentForm.tsx
// import React, { useState } from "react";
// import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import { Button } from "../../ui/button";
// import { useLocation } from "react-router-dom";
// import { useCreateTicket } from "@/hooks/ClientCustomHooks";
// import { TicketEntity } from "@/types/TicketPaymentType";

// export interface PaymentFormProps {
//   amount: number;
//   metadata: Record<string, string>; // dynamic values like eventId, ticketId etc.
//   onSuccess?: () => void;
// }



// const PaymentForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [loading, setLoading] = useState(false);
//   const location = useLocation()
//   const data = location.state
//   const ticket: TicketEntity = data.ticketData
//   console.log(data)
//   const createTicket = useCreateTicket()
//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();

//     if (!stripe || !elements) return;

//     const cardElement = elements.getElement(CardElement);
//     if (!cardElement) return;

//     setLoading(true);

//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: "card",
//       card: cardElement,
//     });

//     if (error) {
//       console.error("Stripe error:", error);
//     } else {
//       console.log("✅ PaymentMethod ID:", paymentMethod.id);
//       console.log("💰 Amount:", data.amount);
//       console.log("📦 Metadata:", data);
//       const response = await createTicket.mutateAsync({
//         ticket: ticket,
//         paymentIntentId: paymentMethod.id,
//         totalAmount: data.amount,
//         totalCount: data.totalTicketCount,
//         vendorId: data.hostedBy
//       })
//       const clientSecret = response.stripeClientId

//       const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: cardElement,
//         },
//       });

//       if (error) {
//         console.error("❌ Payment failed:", error.message);
//       } else if (paymentIntent?.status === "succeeded") {
//         console.log("✅ Payment successful:", paymentIntent);
//         data.onSuccess?.();
//       }

//     }

//     setLoading(false);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4 p-4 rounded-xl border shadow-lg w-full max-w-md mx-auto bg-white">
//       <CardElement className="border p-2 rounded-md" />
//       <div className="text-lg font-medium">Total: ₹{data.amount}</div>
//       <Button type="submit" className="w-full" disabled={loading}>
//         {loading ? "Processing..." : "Pay Now"}
//       </Button>
//     </form>
//   );
// };

// export default PaymentForm;


import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "../../ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import { useConfirmTicketAndPayment, useCreateTicket } from "@/hooks/ClientCustomHooks";
import { TicketEntity } from "@/types/TicketPaymentType";
import { useState } from "react";
import { toast } from "react-toastify";
import { TicketConfirmationModal } from "../events/TicketConfirmation";
import { TicketBackendEntity } from "@/types/TicketBackendType";

export interface PaymentFormProps {
  amount: number;
  metadata: Record<string, string>; // dynamic values like eventId, ticketId etc.
  onSuccess?: () => void;
}

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [paymentStatus, setPaymentStatus] = useState<string>(""); // Track the payment status
  const [updatedTicket, setUpdatedTicket] = useState<TicketBackendEntity>()
  const location = useLocation();
  const data = location.state;
  const ticket: TicketEntity = data.ticketData;
  const createTicket = useCreateTicket();
  const confirmTicket = useConfirmTicketAndPayment()
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const vendorId = data.vendorId
    console.log('vendorId in form', vendorId)
    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) return;

    setLoading(true);
    setPaymentStatus("Processing...");

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.error("Stripe error:", error);
      setPaymentStatus("Payment Failed");
    } else {
      console.log("✅ PaymentMethod ID:", paymentMethod.id);
      const response = await createTicket.mutateAsync({
        ticket: ticket,
        paymentIntentId: paymentMethod.id,
        totalAmount: data.amount,
        totalCount: data.totalTicketCount,
        vendorId: data.vendorId,
      });

      const clientSecret = response.stripeClientId;
      const updatedTicket = response.createdTicket
      setUpdatedTicket(updatedTicket)
      const { error: paymentError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        },
      });

      if (paymentError) {
        console.error("❌ Payment failed:", paymentError.message);
        setPaymentStatus("Payment Failed");
      } else if (paymentIntent?.status === "succeeded") {
        confirmTicket.mutate({ ticket: updatedTicket, paymentIntent: paymentIntent.id, vendorId: data.vendorId }, {
          onSuccess: () => {
            console.log("✅ Payment successful:", paymentIntent);
            setPaymentStatus("Payment Successful");
            data.onSuccess?.();
            setIsOpen(true)
          },
          onError: (err) => {
            toast.error(err.message)
          }
        })

      }
    }

    setLoading(false);
  };

  const cardElementOptions = {
    style: {
      base: {
        iconColor: "#666ee8",
        color: "#31325F",
        lineHeight: "40px",
        fontWeight: 300,
        fontFamily: "Arial, sans-serif",
        fontSize: "18px",
        "::placeholder": {
          color: "#CFD7E0",
        },
      },
      invalid: {
        iconColor: "#e25950",
        color: "#e25950",
      },
    },
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 rounded-xl border shadow-lg w-full max-w-md mx-auto bg-white">
      {/* Card Element with custom styles */}
      <CardElement options={cardElementOptions} className="border p-2 rounded-md" />
      {isOpen && <TicketConfirmationModal isOpen={isOpen} ticket={updatedTicket!} setIsOpen={setIsOpen} />}
      <div className="text-lg font-medium">Total: ₹{data.amount}</div>

      {/* Payment status with animated UI */}
      {paymentStatus && (
        <div className="text-center text-xl font-bold">
          {paymentStatus === "Processing..."
            ? "Processing payment... Please wait."
            : paymentStatus === "Payment Successful"
              ? "Payment Successful! 🎉"
              : "Payment Failed. Please try again."}
        </div>
      )}

      {/* Payment Button with Loading Animation */}
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? (
          <div className="flex justify-center items-center">
            <svg className="animate-spin h-5 w-5 mr-3 border-t-2 border-b-2 border-gray-900 rounded-full" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 1116 0A8 8 0 014 12z"></path>
            </svg>
            Processing...
          </div>
        ) : (
          "Pay Now"
        )}
      </Button>
    </form>
  );
};

export default PaymentForm;
