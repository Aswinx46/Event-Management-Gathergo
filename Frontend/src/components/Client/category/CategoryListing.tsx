import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useFindAllCategoryForListing } from "@/hooks/ClientCustomHooks";
import Pagination from "@/components/other components/Pagination";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SearchContainer from "@/components/other components/search/SearchContainer";

interface Category {
  _id: string,
  title: string,
  image: string
}

interface SearchResult {
  id: number;
  title: string;
  description: string;
  image: string;
  active: boolean;
}

const CategoryListing = () => {
  // const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [searchOpen, setSearchOpen] = useState<boolean>(false)
  const fetchCategoryQuery = useFindAllCategoryForListing(currentPage)
  
  const handleSearch = async (query: string): Promise<SearchResult[]> => {
    // Implement your search logic here
    console.log('Search query:', query);return[]
    // For now, return empty array or mock data
    // return fetchCategoryQuery.data?.categories.map(cat => ({
    //   id: parseInt(cat._id),
    //   title: cat.title,
    //   description: cat.title,
    //   image: cat.image,
    //   active: true
    // })) || [];
  };

  const handleSearchResult = (result: SearchResult) => {
    console.log('Selected result:', result);
    if (result) {
      navigate(`/services/${result.id}/${result.title}`);
    }
    setSearchOpen(false);
  };

  const categories: Category[] = fetchCategoryQuery?.data?.categories
  const totalPages = fetchCategoryQuery?.data?.totalPages

  const navigate = useNavigate()

  return (
    <motion.div
      className="min-h-screen bg-zinc-950 text-white py-8 px-4 md:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {searchOpen && (
        <SearchContainer 
          onSearch={handleSearch}
          onSelect={handleSearchResult}
          onClose={setSearchOpen}
        />
      )}
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="flex flex-col items-center text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
            Explore Event <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-teal-500 to-purple-500">Essentials</span>
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mb-8">
            Manage your event categories — from delicious food to stunning decorations, all in one place.</p>

          {/* Search and Add Category Section */}
          <div className="w-full max-w-5xl flex flex-col md:flex-row gap-4 mb-8 justify-between">
            {/* <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" size={20} />
              <input
                type="text"
                placeholder="Search categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-zinc-900 border border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white"
              />
            </div> */}
            <Button onClick={() => setSearchOpen(true)}>SEARCH</Button>
          </div>

          {/* Categories Grid */}
          <motion.div
            className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {categories?.map((category, index) => (
              <motion.div
                key={category._id}
                onClick={() => navigate(`/services/${category._id}/${category.title}`)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.1 * index,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 25px -5px rgba(124, 58, 237, 0.3)",
                  transition: { duration: 0.2 }
                }}
              >
                <Card className="overflow-hidden bg-zinc-900 border-zinc-800 hover:border-purple-500 transition-all h-full">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent h-1/2"></div>
                  </div>

                  <CardContent className="p-4 flex items-center justify-between">
                    <h3 className="font-medium text-white text-lg">{category.title}</h3>

                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>


        </motion.div>
      </div>
      <Pagination current={currentPage} setPage={setCurrentPage} total={totalPages} />
    </motion.div>
  );
};

export default CategoryListing;