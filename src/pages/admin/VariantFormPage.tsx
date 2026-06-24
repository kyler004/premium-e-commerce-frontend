import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { catalogApi } from '../../api/catalog';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import PageHeader from '../../components/ui/PageHeader';
import { useToast } from '../../hooks/useToast';

const VariantFormPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { showToast } = useToast();
    const [form, setForm] = useState({ product: '', size: '', color: '', sku: '' });

    useEffect(() => {
        if (id) catalogApi.getVariant(Number(id)).then((v) => setForm({ product: String(v.product), size: v.size, color: v.color, sku: v.sku }));
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = { ...form, product: Number(form.product) };
        if (id) await catalogApi.updateVariant(Number(id), data);
        else await catalogApi.createVariant(data);
        showToast('Variant saved.', 'success');
        navigate('/admin/variants');
    };

    return (
        <div>
            <PageHeader eyebrow="Admin" title={id ? 'Edit Variant' : 'New Variant'} />
            <form onSubmit={handleSubmit} className="flex max-w-lg flex-col gap-4 border border-border bg-surface p-6">
                <Input label="Product ID" value={form.product} onChange={(e) => setForm({ ...form, product: e.target.value })} required />
                <Input label="Size" value={form.size} onChange={(e) => setForm({ ...form, size: e.target.value })} />
                <Input label="Color" value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })} />
                <Input label="SKU" value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} required />
                <Button type="submit">Save</Button>
            </form>
        </div>
    );
};

export default VariantFormPage;
