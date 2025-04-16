import React, { useState, useCallback, useEffect } from 'react';
import SearchInput from './SearchInput';
import { X, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SearchResults from './SearchResults';

// Mock data for demonstration with categories matching the image
export interface SearchResult {
    id: number;
    title: string;
    description: string;
    image: string;
    active: boolean
}
const mockData: SearchResult[] = [
    {
        id: 1,
        title: 'Photography & Videography',
        description: '9e60dd3a-0a81-46e7-878e-5ce74ed5edcd',
        image: '/lovable-uploads/733a1128-ebb7-446f-8a4b-1ddaf8642312.png',
        active: true
    },
    {
        id: 2,
        title: 'Food',
        description: '311b0103-61a7-4158-833b-9524687c13d0',
        image: '/lovable-uploads/733a1128-ebb7-446f-8a4b-1ddaf8642312.png',
        active: true
    },
    {
        id: 3,
        title: 'Entertainment',
        description: '7cf6deac-1e4a-42b2-97cf-0931bf300dbb',
        image: '/lovable-uploads/733a1128-ebb7-446f-8a4b-1ddaf8642312.png',
        active: true
    },
    {
        id: 4,
        title: 'Fashion & Style',
        description: 'd4757ff5-f03d-42cb-bcbd-93672962479',
        image: '/lovable-uploads/733a1128-ebb7-446f-8a4b-1ddaf8642312.png',
        active: true
    },
    {
        id: 5,
        title: 'Decorations',
        description: '8072ea27-bba2-4d4b-82b4-142d649fef2a',
        image: '/lovable-uploads/733a1128-ebb7-446f-8a4b-1ddaf8642312.png',
        active: true
    }
];

interface SearchContainerProps {
    onResultSelect?: (result: SearchResult) => void;
    onSearch: (query: string) => Promise<SearchResult[]>;
    onClose?: () => React.Dispatch<React.SetStateAction<boolean>>;
    onSelect: (result: SearchResult) => void
}

const SearchContainer: React.FC<SearchContainerProps> = ({ onResultSelect, onSearch, onClose }) => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [results, setResults] = useState<SearchResult[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Close on escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && onClose) {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    const handleSearch = useCallback(async (query: string) => {
        setSearchQuery(query);

        if (!query.trim() || !onSearch) {
            setResults([]);
            return;
        }

        setIsLoading(true);
        try {
            const searchResults = await onSearch(query);
            setResults(searchResults);
        } catch (error) {
            console.error('Search error:', error);
            setResults([]);
        } finally {
            setIsLoading(false);
        }
    }, [onSearch]);

    const triggerSearch = async () => {
        if (searchQuery.trim()) {
            await handleSearch(searchQuery);
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 bg-black/90 flex flex-col items-center pt-28 px-4 z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
            >
                <button
                    className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
                    onClick={onClose}
                    aria-label="Close search"
                >
                    <X size={32} />
                </button>

                <div className="w-full max-w-3xl mx-auto mb-10">
                    <motion.h1
                        className="text-7xl font-bold text-white text-left mb-8"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.3 }}
                    >
                        Search...
                    </motion.h1>
                </div>

                <div className="w-full max-w-3xl mx-auto flex gap-2">
                    <div className="flex-1">
                        <SearchInput
                            onSearch={setSearchQuery}
                            onEnterPress={triggerSearch}
                        />
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={triggerSearch}
                        className="px-6 py-3 bg-white text-black rounded-md hover:bg-gray-200 transition-colors flex items-center gap-2"
                    >
                        <Search size={20} />
                        Search
                    </motion.button>
                </div>

                <SearchResults
                    results={results}
                    searchQuery={searchQuery}
                    isLoading={isLoading}
                    onSelect={onResultSelect}
                />
            </motion.div>
        </AnimatePresence>
    );
};

export default SearchContainer;