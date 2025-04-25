import React, { useState } from 'react'
import { Search, SortAsc } from 'lucide-react'
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"

interface FilterField {
  key: string              // filter key, e.g. "category", "status"
  label: string            // label to show in UI
  options: { value: string; label: string }[]  // filter choices
}

interface SortOption {
  key: string
  label: string
}

interface FilterComponentProps {
  filterFields: FilterField[]
  sortOptions: SortOption[]
  onFilterChange: (filters: Record<string, string>) => void
  onSortChange: (key: string) => void
  onClearFilter: (key: string) => void
  onClearSort: () => void
  
}

const FilterComponent = ({
  filterFields,
  sortOptions,
  onFilterChange,
  onSortChange,
  onClearFilter,
  onClearSort
}: FilterComponentProps) => {
  const [filters, setFilters] = useState<Record<string, string>>({})
  const [sortKey, setSortKey] = useState(sortOptions[0]?.key || '')

  const handleSearchChange = (value: string) => {
    const newFilters = { ...filters, search: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleSortChange = (value: string) => {
    setSortKey(value)
    onSortChange(value)
  }

  return (
    <div className=" ">
      <div className="flex flex-col md:flex-row justify-between items-center ">
        {/* Search input - Left side */}
        <div className="w-full md:w-1/3">
          {/* <div className="relative">
            <Input
              type="text"
              placeholder="Search..."
              value={filters.search || ''}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10 bg-gray-900 text-white border-gray-700 placeholder:text-gray-400 focus:border-purple-500"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          </div> */}
        </div>

        {/* Filters and Sort - Right side */}
        <div className="flex flex-row md:flex-row gap-4 justify-between w-full md:w-auto">
          {/* Dynamic filter dropdowns */}
          {filterFields.map((field) => (
            <Select
              key={field.key}
              value={filters[field.key] || ''}
              onValueChange={(val) => {
                if (val === 'clear') {
                  onClearFilter(field.key);
                  return;
                }
                handleFilterChange(field.key, val)
              }}
            >
              <SelectTrigger className="bg-gray-900 text-white border-gray-700 focus:ring-purple-500 focus:border-purple-500 w-full">
                <SelectValue placeholder={`Filter by ${field.label}`} className="text-gray-400" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border border-gray-700">
                {field.options.map((option) => (
                  <SelectItem 
                    key={option.value} 
                    value={option.value}
                    className="text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-purple-400"
                  >
                    {option.label}
                  </SelectItem>
                ))}
                <SelectItem 
                  value="clear"
                  className="text-purple-400 hover:bg-gray-800 focus:bg-gray-800 border-t border-gray-700"
                >
                  Clear Filter
                </SelectItem>
              </SelectContent>
            </Select>
          ))}

          {/* Sort dropdown */}
          <div className="relative">
            <Select 
              value={sortKey} 
              onValueChange={(val) => {
                if (val === 'clear') {
                  onClearSort();
                  return;
                }
                handleSortChange(val)
              }}
            >
              <SelectTrigger className="bg-gray-900 text-white border-gray-700 focus:ring-purple-500 focus:border-purple-500 w-full">
                <SelectValue placeholder="Sort by..." className="text-gray-400" />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border border-gray-700">
                {sortOptions.map((option) => (
                  <SelectItem 
                    key={option.key} 
                    value={option.key}
                    className="text-white hover:bg-gray-800 focus:bg-gray-800 focus:text-purple-400"
                  >
                    <div className="flex items-center gap-2">
                      <SortAsc className="h-4 w-4 text-gray-400" />
                      {option.label}
                    </div>
                  </SelectItem>
                ))}
                <SelectItem 
                  value="clear"
                  className="text-purple-400 hover:bg-gray-800 focus:bg-gray-800 border-t border-gray-700"
                >
                  Clear Sort
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilterComponent
