import PaymentForm from '../paymentForm/PaymentFormStripe'
import { useConfirmBookingPayment, useCreateBookingPayment } from '@/hooks/ClientCustomHooks'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { BookingType } from '@/types/BookingType'

function BookingPayment() {
    const location = useLocation()
    const data = location.state.booking
    const createBookingPaymentHook = useCreateBookingPayment()
    const confirmBookingPaymentHook = useConfirmBookingPayment()
    const totalAmount = data.date.length * data.service.servicePrice
    console.log(data)
    const navigate = useNavigate()
    const createBookingPayment = async (paymentMethodId: string) => {
        const response = await createBookingPaymentHook.mutateAsync({
            bookingId: data._id,
            paymentIntentId: paymentMethodId,
        })
        return {
            clientSecret: response.clientStripeId,
            payload: response.booking,
        };
    }

    const confirmBookingPayment = async (booking: BookingType, paymentIntentId: string) => {
        confirmBookingPaymentHook.mutate({ booking: booking, paymentIntentId: paymentIntentId }, {
            onSuccess: (data) => {
                toast.success(data.message)
                navigate('/profile/bookings')
            },
            onError: (err) => {
                toast.error(err.message)
            }
        })
    }

    return (
        <div>
            <PaymentForm amount={totalAmount} onConfirmSuccess={confirmBookingPayment} onCreatePaymentIntent={createBookingPayment} />
        </div>
    )
}

export default BookingPayment
