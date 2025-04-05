"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Search} from "lucide-react"
import { Input } from "@/components/ui/input"
import Pagination from "@/components/other components/Pagination"
import { useFetchClientAdminQuery } from "@/hooks/AdminCustomHooks"
import Table from "@/components/other components/Table"
import EmptyTableMessage from "@/components/other components/NoUserAvailable"
// Define the provider type

export default function EventProvidersPanel() {
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState<number>(1)

  const fetchClient = useFetchClientAdminQuery(currentPage)
  useEffect(() => {
    setTotalPages(fetchClient?.data?.totalPages)
  }, [fetchClient?.data?.totalPages])



  console.log(fetchClient.data)
  // if (fetchClient.isLoading) {
  //   console.log('loading')
  //   return <LoadingScreen />
  // }
  const clients = fetchClient?.data?.clients







  const handleBlockAndUnblock = (id: string) => {
    console.log(id)
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">

      {/* Main content */}
      {clients?.length <= 0 && <EmptyTableMessage />}
      <div className="flex-1 p-8 overflow-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Clients</h1>

            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="text"
                placeholder="Search Providers"
                className="pl-10 w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </motion.div>
          </div>

          {/* Table */}
          <Table data={clients} blockAndUnblock={handleBlockAndUnblock} />
          <Pagination current={currentPage} setPage={setCurrentPage} total={totalPages} />
        </motion.div>
      </div>
    </div>
  )
}

