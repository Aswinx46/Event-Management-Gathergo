import { useConfirmTicketAndPayment, useCreateTicket } from '@/hooks/ClientCustomHooks'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import PaymentForm from './PaymentFormStripe'
import { TicketBackendEntity } from '@/types/TicketBackendType'
import { TicketConfirmationModal } from '../events/TicketConfirmation'
import { TicketEntity } from '@/types/TicketPaymentType'
import { toast } from 'react-toastify'

function TicketPaymentForm() {
    const [updatedTicket, setUpdatedTicket] = useState<TicketBackendEntity>()
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const location = useLocation()
    const data = location.state
    const createTicket = useCreateTicket()
    const confirmTicket = useConfirmTicketAndPayment()

    const handleCreatePaymentIntent = async (paymentMethodId: string) => {
        const response = await createTicket.mutateAsync({
            ticket: data.ticketData,
            paymentIntentId: paymentMethodId,
            totalAmount: data.amount,
            totalCount: data.totalTicketCount,
            vendorId: data.vendorId,
        });

        return {
            clientSecret: response.stripeClientId,
            payload: response.createdTicket,
        };
    };

    const handleConfirmSuccess = (ticketData: TicketEntity, paymentIntentId: string) => {
        confirmTicket.mutate({
            ticket: ticketData,
            paymentIntent: paymentIntentId,
            vendorId: data.vendorId,
        }, {
            onSuccess: (data) => {
                setUpdatedTicket(data.confirmTicketAndPayment)
                setIsOpen(true)
            },
            onError:(err)=>{
                toast.error(err.message)
            }
        });
    };

    return (
        <div>
            {isOpen && <TicketConfirmationModal isOpen={isOpen} setIsOpen={setIsOpen} ticket={updatedTicket!} />}
            <PaymentForm amount={data.amount} onConfirmSuccess={handleConfirmSuccess} onCreatePaymentIntent={handleCreatePaymentIntent} />
        </div>
    )
}

export default TicketPaymentForm
