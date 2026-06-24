import { useState } from 'react';
import type { Review } from '../../types/api';
import Button from '../ui/Button';
import Input from '../ui/Input';
import TextArea from '../ui/TextArea';
import Select from '../ui/Select';
import { reviewsApi } from '../../api/reviews';
import { useToast } from '../../hooks/useToast';
import { ApiError, getFieldErrors, parseApiError } from '../../api/client';

interface ReviewFormProps {
    productId: number;
    review?: Review | null;
    onSuccess: () => void;
    onCancel: () => void;
}

const ReviewForm = ({ productId, review, onSuccess, onCancel }: ReviewFormProps) => {
    const [rating, setRating] = useState(review?.rating ?? 5);
    const [title, setTitle] = useState(review?.title ?? '');
    const [body, setBody] = useState(review?.body ?? '');
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    const { showToast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});
        setLoading(true);
        try {
            if (review) {
                await reviewsApi.update(review.id, { rating, title, body });
                showToast('Review updated.', 'success');
            } else {
                await reviewsApi.create(productId, { rating, title, body });
                showToast('Review submitted.', 'success');
            }
            onSuccess();
        } catch (err) {
            if (err instanceof ApiError) {
                const fieldErrors = getFieldErrors(err.body);
                if (Object.keys(fieldErrors).length > 0) {
                    setErrors(Object.fromEntries(Object.entries(fieldErrors).map(([k, v]) => [k, v[0]])));
                } else {
                    showToast(parseApiError(err.body), 'error');
                }
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Select
                label="Rating"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                options={[5, 4, 3, 2, 1].map((r) => ({ value: r, label: `${r} Stars` }))}
            />
            <Input label="Title (optional)" value={title} onChange={(e) => setTitle(e.target.value)} error={errors.title} />
            <TextArea label="Review" value={body} onChange={(e) => setBody(e.target.value)} error={errors.body} required />
            <div className="flex gap-3">
                <Button type="submit" loading={loading}>{review ? 'Update Review' : 'Submit Review'}</Button>
                <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
            </div>
        </form>
    );
};

export default ReviewForm;
