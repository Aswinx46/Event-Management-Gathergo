import React from "react";

const EventCardSkeleton: React.FC = () => {
    return (
        <div className="bg-zinc-900 rounded-lg border border-zinc-800 overflow-hidden h-[400px] animate-pulse">
            <div className="bg-zinc-800 h-48 w-full"></div>
            <div className="p-4 space-y-3">
                <div className="h-4 bg-zinc-800 rounded w-3/4"></div>
                <div className="h-3 bg-zinc-800 rounded w-1/2"></div>
                <div className="h-3 bg-zinc-800 rounded w-5/6"></div>
                <div className="pt-2 flex items-center space-x-2">
                    <div className="h-8 w-8 bg-zinc-800 rounded-full"></div>
                    <div className="h-3 bg-zinc-800 rounded w-1/3"></div>
                </div>
            </div>
        </div>
    );
};

export default EventCardSkeleton;
