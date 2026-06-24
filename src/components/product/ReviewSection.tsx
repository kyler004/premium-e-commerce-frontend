import { useEffect, useState } from 'react';
import type { Review } from '../../types/api';
import Rating from '../ui/Rating';
import Pagination from '../ui/Pagination';
import { formatDate, getInitials } from '../../lib/format';
import ReviewForm from '../forms/ReviewForm';
import Button from '../ui/Button';
import { reviewsApi } from '../../api/reviews';
import { catalogApi } from '../../api/catalog';
import { useAuthStore } from '../../store/authStore';
import { useToast } from '../../hooks/useToast';
import { ApiError, parseApiError } from '../../api/client';

interface ReviewSectionProps {
    productId: number;
    averageRating: number | null;
    reviewCount: number;
}

const ReviewSection = ({ productId, averageRating, reviewCount }: ReviewSectionProps) => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [showForm, setShowForm] = useState(false);
    const [editingReview, setEditingReview] = useState<Review | null>(null);
    const user = useAuthStore((s) => s.user);
    const { showToast } = useToast();

    useEffect(() => {
        let cancelled = false;
        catalogApi.listProductReviews(productId, page, 5).then((data) => {
            if (cancelled) return;
            setReviews(data.results);
            setTotalPages(Math.max(1, Math.ceil(data.count / 5)));
        });
        return () => { cancelled = true; };
    }, [productId, page]);

    const breakdown = [5, 4, 3, 2, 1].map((star) => ({
        star,
        count: reviews.filter((r) => r.rating === star).length,
        percent: reviews.length > 0 ? (reviews.filter((r) => r.rating === star).length / reviews.length) * 100 : 0,
    }));

    const reloadReviews = () => {
        catalogApi.listProductReviews(productId, page, 5).then((data) => {
            setReviews(data.results);
            setTotalPages(Math.max(1, Math.ceil(data.count / 5)));
        });
    };

    const handleDelete = async (id: number) => {
        try {
            await reviewsApi.delete(id);
            showToast('Review deleted.', 'success');
            reloadReviews();
        } catch (err) {
            if (err instanceof ApiError) showToast(parseApiError(err.body), 'error');
        }
    };

    return (
        <div className="border-t border-border pt-12">
            <div className="mb-8 flex items-center justify-between">
                <h2 className="text-xl font-black uppercase tracking-widest text-white">
                    Reviews <span className="text-gray-600">({reviewCount})</span>
                </h2>
                {user?.email_verified_at && (
                    <Button variant="secondary" size="sm" onClick={() => { setShowForm(!showForm); setEditingReview(null); }}>
                        {showForm ? 'Cancel' : 'Write Review'}
                    </Button>
                )}
            </div>

            {showForm && (
                <div className="mb-8 border border-border bg-surface p-6">
                    <ReviewForm
                        productId={productId}
                        review={editingReview}
                        onSuccess={() => { setShowForm(false); setEditingReview(null); reloadReviews(); }}
                        onCancel={() => { setShowForm(false); setEditingReview(null); }}
                    />
                </div>
            )}

            <div className="mb-10 flex gap-12 border border-border p-6">
                <div className="flex flex-col items-center justify-center gap-2">
                    <span className="text-6xl font-black text-white">
                        {(averageRating ?? 0).toFixed(1)}
                    </span>
                    <Rating value={averageRating ?? 0} size="md" />
                    <span className="text-xs text-gray-500">{reviewCount} reviews</span>
                </div>
                <div className="flex flex-1 flex-col justify-center gap-2">
                    {breakdown.map(({ star, count, percent }) => (
                        <div key={star} className="flex items-center gap-3">
                            <span className="w-4 text-right text-xs text-gray-500">{star}</span>
                            <div className="h-1.5 flex-1 bg-border">
                                <div className="h-full bg-accent transition-all duration-500" style={{ width: `${percent}%` }} />
                            </div>
                            <span className="w-4 text-xs text-gray-600">{count}</span>
                        </div>
                    ))}
                </div>
            </div>

            {reviews.length === 0 ? (
                <p className="py-8 text-center text-sm text-gray-600">No reviews yet. Be the first.</p>
            ) : (
                <div className="flex flex-col divide-y divide-border">
                    {reviews.map((review) => (
                        <div key={review.id} className="flex gap-4 py-6">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-border text-xs font-bold text-white">
                                {getInitials(review.user_email)}
                            </div>
                            <div className="flex flex-1 flex-col gap-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-bold text-white">{review.user_email}</span>
                                    <span className="text-xs text-gray-600">{formatDate(review.created_at)}</span>
                                </div>
                                {review.title && <p className="text-sm font-semibold text-white">{review.title}</p>}
                                <Rating value={review.rating} size="sm" />
                                <p className="text-sm leading-relaxed text-gray-400">{review.body}</p>
                                {user?.email === review.user_email && (
                                    <div className="flex gap-2 pt-2">
                                        <button onClick={() => { setEditingReview(review); setShowForm(true); }} className="text-xs text-gray-500 hover:text-accent">Edit</button>
                                        <button onClick={() => handleDelete(review.id)} className="text-xs text-gray-500 hover:text-red-400">Delete</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
        </div>
    );
};

export default ReviewSection;
