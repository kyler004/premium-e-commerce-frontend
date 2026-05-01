import type { Review } from '../../types';
import Rating from '../ui/Rating';
// import Badge from '../ui/Badge';
import { CheckCircle2 } from 'lucide-react';

interface ReviewSectionProps {
    reviews: Review[];
    averageRating: number;
    reviewCount: number;
}

const ReviewSection = ({
                           reviews,
                           averageRating,
                           reviewCount,
                       }: ReviewSectionProps) => {

    // Build rating breakdown: how many reviews per star level
    const breakdown = [5, 4, 3, 2, 1].map((star) => ({
        star,
        count: reviews.filter((r) => Math.round(r.rating) === star).length,
        percent:
            reviews.length > 0
                ? (reviews.filter((r) => Math.round(r.rating) === star).length /
                    reviews.length) *
                100
                : 0,
    }));

    return (
        <div className="border-t border-border pt-12">

            {/* Section heading */}
            <h2 className="mb-8 text-xl font-black uppercase tracking-widest text-white">
                Reviews
                <span className="ml-3 text-gray-600">({reviewCount})</span>
            </h2>

            {/* Summary + Breakdown */}
            <div className="mb-10 flex gap-12 border border-border p-6">

                {/* Big average number */}
                <div className="flex flex-col items-center justify-center gap-2">
          <span className="text-6xl font-black text-white">
            {averageRating.toFixed(1)}
          </span>
                    <Rating value={averageRating} size="md" />
                    <span className="text-xs text-gray-500">{reviewCount} reviews</span>
                </div>

                {/* Bar breakdown */}
                <div className="flex flex-1 flex-col justify-center gap-2">
                    {breakdown.map(({ star, count, percent }) => (
                        <div key={star} className="flex items-center gap-3">
                            <span className="w-4 text-right text-xs text-gray-500">{star}</span>
                            <div className="h-1.5 flex-1 bg-border">
                                <div
                                    className="h-full bg-accent transition-all duration-500"
                                    style={{ width: `${percent}%` }}
                                />
                            </div>
                            <span className="w-4 text-xs text-gray-600">{count}</span>
                        </div>
                    ))}
                </div>

            </div>

            {/* Individual Reviews */}
            {reviews.length === 0 ? (
                <p className="text-center text-sm text-gray-600 py-8">
                    No reviews yet. Be the first.
                </p>
            ) : (
                <div className="flex flex-col divide-y divide-border">
                    {reviews.map((review) => (
                        <div key={review.id} className="flex gap-4 py-6">

                            {/* Avatar */}
                            <img
                                src={review.avatar}
                                alt={review.author}
                                className="h-10 w-10 shrink-0 rounded-full object-cover grayscale"
                            />

                            {/* Content */}
                            <div className="flex flex-1 flex-col gap-2">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">
                      {review.author}
                    </span>
                                        {review.verified && (
                                            <span className="flex items-center gap-1 text-[10px]
                                       text-emerald-400 uppercase tracking-wider">
                        <CheckCircle2 size={10} />
                        Verified
                      </span>
                                        )}
                                    </div>
                                    <span className="text-xs text-gray-600">
                    {new Date(review.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                    })}
                  </span>
                                </div>

                                <Rating value={review.rating} size="sm" />

                                <p className="text-sm leading-relaxed text-gray-400">
                                    {review.comment}
                                </p>
                            </div>

                        </div>
                    ))}
                </div>
            )}

        </div>
    );
};

export default ReviewSection;