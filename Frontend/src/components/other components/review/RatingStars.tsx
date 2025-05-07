import { Star, StarHalf } from "lucide-react";

interface RatingStarsProps {
  rating: number;
  size?: number;
  className?: string;
}

export function RatingStars({ rating, size = 5, className = "" }: RatingStarsProps) {
  // Calculate full stars and whether there's a half star
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  return (
    <div className={`flex ${className}`}>
      {/* Full stars */}
      {Array(fullStars).fill(0).map((_, i) => (
        <Star 
          key={`full-${i}`} 
          className="text-yellow-400 fill-yellow-400" 
          size={size} 
        />
      ))}
      
      {/* Half star if needed */}
      {hasHalfStar && <StarHalf className="text-yellow-400" size={size} />}
      
      {/* Empty stars */}
      {Array(emptyStars).fill(0).map((_, i) => (
        <Star 
          key={`empty-${i}`} 
          className="text-gray-600" 
          size={size} 
        />
      ))}
    </div>
  );
}