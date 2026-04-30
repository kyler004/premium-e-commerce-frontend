import { Star } from 'lucide-react';

interface RatingProps {
    value: number;       // e.g. 4.7
    count?: number;      // review count to display alongside
    size?: 'sm' | 'md';
}

const Rating = ({ value, count, size = 'sm' }: RatingProps) => {
    const starSize = size === 'sm' ? 12 : 16;

    return (
        <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => {
                    const filled = value >= star;
                    const partial = !filled && value >= star - 0.5;

                    return (
                        <span key={star} className="relative inline-block">
              {/* Empty star base */}
                            <Star
                                size={starSize}
                                className="text-[#1f1f1f]"
                                fill="currentColor"
                            />
                            {/* Filled or partial overlay */}
                            {(filled || partial) && (
                                <span
                                    className="absolute inset-0 overflow-hidden"
                                    style={{ width: filled ? '100%' : '50%' }}
                                >
                  <Star
                      size={starSize}
                      className="text-[#e8ff00]"
                      fill="currentColor"
                  />
                </span>
                            )}
            </span>
                    );
                })}
            </div>

            {/* Numeric value */}
            <span className={`font-semibold text-white ${size === 'sm' ? 'text-xs' : 'text-sm'}`}>
        {value.toFixed(1)}
      </span>

            {/* Review count */}
            {count !== undefined && (
                <span className={`text-gray-500 ${size === 'sm' ? 'text-xs' : 'text-sm'}`}>
          ({count.toLocaleString()})
        </span>
            )}
        </div>
    );
};

export default Rating;