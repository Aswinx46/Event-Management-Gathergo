import { useVerifyTicket } from '@/hooks/VendorCustomHooks'

import TicketScanner from './TicketScanner'

function TicketVerification() {
    const scanQr=useVerifyTicket()
    // scanQr.mutate()
  return (
    <div>
      <TicketScanner scanQr={scanQr}/>
    </div>
  )
}

export default TicketVerification
