import React from 'react'

interface paginationParams{
    total:number;
    current:number;
    setPage:React.Dispatch<React.SetStateAction<number>>
}

function Pagination({total, current, setPage}:paginationParams) {
  return (
    <div className="flex items-center justify-center space-x-4">
      <button
        onClick={() => setPage(current - 1)}
        disabled={current === 1}
        className={`px-4 py-2 rounded ${current === 1 ? 'bg-gray-300' : 'bg-black text-white hover:bg-gray-700'}`}
      >
        Previous
      </button>
      <span className="text-gray-700">
        Page {current} of {total}
      </span>
      <button
        onClick={() => setPage(current + 1)}
        disabled={current === total}
        className={`px-4 py-2 rounded ${current === total ? 'bg-gray-300' : 'bg-black text-white hover:bg-gray-700'}`}
      >
        Next
      </button>
    </div>
  )
}

export default Pagination