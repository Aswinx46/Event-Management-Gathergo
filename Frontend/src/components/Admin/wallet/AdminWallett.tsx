import Pagination from '@/components/other components/Pagination'
import { WalletCard } from '@/components/other components/wallet/Wallet'
import { useFindAdminWallet } from '@/hooks/AdminCustomHooks'
import { useState } from 'react'


function AdminWallet() {
    const userId = localStorage.getItem('adminId')
    const [currentPage, setCurrentPage] = useState<number>(1)
    const findAdminWallet = useFindAdminWallet(userId!, currentPage)
    const wallet = findAdminWallet.data?.wallet
    const transactions = findAdminWallet.data?.transactions
    const totalPages = findAdminWallet.data?.totalPages
    return (
        <div>
            <WalletCard wallet={wallet} transactions={transactions} />
            <Pagination current={currentPage} setPage={setCurrentPage} total={totalPages} />
        </div>
    )
}

export default AdminWallet
