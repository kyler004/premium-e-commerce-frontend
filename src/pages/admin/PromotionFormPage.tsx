import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Button from '../../components/ui/Button';
import PageHeader from '../../components/ui/PageHeader';
import { promotionsApi } from '../../api/promotions';
import type { DiscountType } from '../../types/api';
import { useToast } from '../../hooks/useToast';

const PromotionFormPage = () => {
    const { id } = useParams();
    const isEdit = !!id;
    const navigate = useNavigate();
    const { showToast } = useToast();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        code: '',
        description: '',
        discount_type: 'percentage' as DiscountType,
        discount_value: '10.00',
        min_order_amount: '',
        max_uses: '',
        valid_from: '',
        valid_until: '',
        is_active: true,
    });

    useEffect(() => {
        if (id) {
            promotionsApi.get(Number(id)).then((p) => setForm({
                code: p.code,
                description: p.description,
                discount_type: p.discount_type,
                discount_value: p.discount_value,
                min_order_amount: p.min_order_amount ?? '',
                max_uses: p.max_uses?.toString() ?? '',
                valid_from: p.valid_from?.slice(0, 16) ?? '',
                valid_until: p.valid_until?.slice(0, 16) ?? '',
                is_active: p.is_active,
            }));
        }
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const payload = {
            ...form,
            min_order_amount: form.min_order_amount || null,
            max_uses: form.max_uses ? Number(form.max_uses) : null,
            valid_from: form.valid_from ? new Date(form.valid_from).toISOString() : null,
            valid_until: form.valid_until ? new Date(form.valid_until).toISOString() : null,
        };
        try {
            if (isEdit) await promotionsApi.update(Number(id), payload);
            else await promotionsApi.create(payload);
            showToast('Promotion saved.', 'success');
            navigate('/admin/promotions');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <PageHeader eyebrow="Admin" title={isEdit ? 'Edit Promotion' : 'New Promotion'} />
            <form onSubmit={handleSubmit} className="flex max-w-lg flex-col gap-4 border border-border bg-surface p-6">
                <Input label="Code" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} required />
                <Input label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                <Select label="Discount Type" value={form.discount_type} onChange={(e) => setForm({ ...form, discount_type: e.target.value as DiscountType })} options={[{ value: 'percentage', label: 'Percentage' }, { value: 'fixed', label: 'Fixed' }]} />
                <Input label="Discount Value" value={form.discount_value} onChange={(e) => setForm({ ...form, discount_value: e.target.value })} required />
                <Input label="Min Order Amount" value={form.min_order_amount} onChange={(e) => setForm({ ...form, min_order_amount: e.target.value })} />
                <Input label="Max Uses" type="number" value={form.max_uses} onChange={(e) => setForm({ ...form, max_uses: e.target.value })} />
                <Input label="Valid From" type="datetime-local" value={form.valid_from} onChange={(e) => setForm({ ...form, valid_from: e.target.value })} />
                <Input label="Valid Until" type="datetime-local" value={form.valid_until} onChange={(e) => setForm({ ...form, valid_until: e.target.value })} />
                <label className="flex items-center gap-2 text-sm text-gray-400">
                    <input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} />
                    Active
                </label>
                <Button type="submit" loading={loading}>Save</Button>
            </form>
        </div>
    );
};

export default PromotionFormPage;
