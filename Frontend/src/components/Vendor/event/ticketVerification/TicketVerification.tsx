// import { useVerifyTicket } from '@/hooks/VendorCustomHooks'

import TicketScanner from './TicketScanner'

function TicketVerification() {
    // const scanQr=useVerifyTicket()
    // scanQr.mutate()
  return (
    <div>
      <TicketScanner />
    </div>
  )
}

export default TicketVerification
