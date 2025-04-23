import { useConfirmTicketAndPayment, useCreateTicket } from '@/hooks/ClientCustomHooks'
import  { useState } from 'react'
import { useLocation } from 'react-router-dom'
import PaymentForm from './PaymentFormStripe'
import { TicketBackendEntity } from '@/types/TicketBackendType'
import { TicketConfirmationModal } from '../events/TicketConfirmation'

function TicketPaymentForm() {
    const [updatedTicket, setUpdatedTicket] = useState<TicketBackendEntity>()
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const location = useLocation()
    const data = location.state
    const createTicket = useCreateTicket()
    const confirmTicket = useConfirmTicketAndPayment()
    console.log(data)
    return (
        <div>
            {isOpen && <TicketConfirmationModal isOpen={isOpen} setIsOpen={setIsOpen} ticket={updatedTicket!} />}
            <PaymentForm amount={data.amount} onCreatePaymentIntent={async (paymentMethodId) => {
                const response = await createTicket.mutateAsync({
                    ticket: data.ticketData,
                    paymentIntentId: paymentMethodId,
                    totalAmount: data.amount,
                    totalCount: data.totalTicketCount,
                    vendorId: data.vendorId,
                })
                return {
                    clientSecret: response.stripeClientId,
                    payload: response.createdTicket,
                };
            }}
                onConfirmSuccess={(ticketData, paymentIntentId) => {
                    confirmTicket.mutate({
                        ticket: ticketData,
                        paymentIntent: paymentIntentId,
                        vendorId: data.vendorId
                    },
                        {
                            onSuccess: (data) => {
                                setUpdatedTicket(data.confirmTicketAndPayment)
                                data.onSuccess?.();
                                setIsOpen(true)
                            }
                        })
                }} />
        </div>
    )
}

export default TicketPaymentForm
