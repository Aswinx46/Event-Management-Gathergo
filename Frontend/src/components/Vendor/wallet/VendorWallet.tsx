import Pagination from '@/components/other components/Pagination'
import { WalletCard } from '@/components/other components/wallet/Wallet'
import { useFindWalletDetailsVendor } from '@/hooks/VendorCustomHooks'
import { RootState } from '@/store/store'
import { useState } from 'react'
import { useSelector } from 'react-redux'

function VendorWallet() {
    const [currentPage, setCurrentPage] = useState<number>(1)
    const vendorId = useSelector((state: RootState) => state.vendorSlice.vendor?._id)
    const findWalletDetails = useFindWalletDetailsVendor(vendorId!, currentPage)
    const wallet = findWalletDetails.data?.wallet
    const transactions = findWalletDetails.data?.transactions
    const totalPages = findWalletDetails.data?.totalPages
    return (
        <div>
            <WalletCard wallet={wallet} transactions={transactions} />
            <Pagination current={currentPage} setPage={setCurrentPage} total={totalPages} />
        </div>
    )
}

export default VendorWallet
