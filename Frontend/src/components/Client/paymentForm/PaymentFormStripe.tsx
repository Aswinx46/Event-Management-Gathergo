// src/components/PaymentForm.tsx
import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "../../ui/button";
import { useLocation } from "react-router-dom";

export interface PaymentFormProps {
  amount: number;
  metadata: Record<string, string>; // dynamic values like eventId, ticketId etc.
  onSuccess?: () => void;
}



const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const location = useLocation()
  const data = location.state
  console.log(data)
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) return;

    setLoading(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.error("Stripe error:", error);
    } else {
      console.log("✅ PaymentMethod ID:", paymentMethod.id);
      console.log("💰 Amount:", data.amount);
      console.log("📦 Metadata:", data);

      // Send this info to your backend to confirm the payment
      // POST /api/pay with { paymentMethod.id, amount, metadata }

      // onSuccess?.(); // callback on success (optional)
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 rounded-xl border shadow-lg w-full max-w-md mx-auto bg-white">
      <CardElement  className="border p-2 rounded-md" />
      <div className="text-lg font-medium">Total: ₹{data.amount}</div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Processing..." : "Pay Now"}
      </Button>
    </form>
  );
};

export default PaymentForm;
