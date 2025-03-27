import Pagination from '@/components/other components/Pagination'
import { Table } from '@/components/other components/Table'
import { useFindRejectedVendors } from '@/hooks/AdminCustomHooks'
import React, { useEffect, useState } from 'react'
import { animate, motion } from 'framer-motion'
interface Vendor {
    _id: string;
    vendorId: string;
    name: string;
    email: string;
    phone: number;
    idProof: string;
    role: 'vendor';
    status: 'active' | 'inactive' | 'blocked';
    vendorStatus: 'pending' | 'approved' | 'rejected';
    onlineStatus: 'online' | 'offline';
    lastLogin: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    profileImage?: string
}

function RejectedVendors() {
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [totalPages, setTotalPages] = useState<number>(1)
    const [rejectedVendors, setRejectedVendors] = useState<Vendor[]>()
    const rejectedVendorsQuery = useFindRejectedVendors(currentPage)
    useEffect(() => {
        setTotalPages(rejectedVendorsQuery?.data?.totalPages)
        setRejectedVendors(rejectedVendorsQuery?.data?.rejectedVendors)
    }, [rejectedVendorsQuery?.data])
    console.log(rejectedVendorsQuery.data)

    const blockAndUnblock = () => {

    }

    return (
        <div className=''>
            <motion.h1
                className='text-2xl font-bold tracking-tight'
                initial={{ opacity: 0, x: -20, y: -10, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                transition={{ duration: 0.7, ease: "easeOut", bounce: 0.4 }}
            >
                Rejected Vendors
            </motion.h1>

            <Table data={rejectedVendors ?? []} blockAndUnblock={blockAndUnblock} />
            <Pagination total={totalPages} current={currentPage} setPage={setCurrentPage} />
        </div>
    )
}

export default RejectedVendors
