import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { catalogApi } from '../../api/catalog';
import Input from '../../components/ui/Input';
import TextArea from '../../components/ui/TextArea';
import Button from '../../components/ui/Button';
import PageHeader from '../../components/ui/PageHeader';
import { useToast } from '../../hooks/useToast';

const ProductFormPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { showToast } = useToast();
    const [form, setForm] = useState({ name: '', description: '', price: '', category: '' });

    useEffect(() => {
        if (id) catalogApi.getProduct(Number(id)).then((p) => setForm({ name: p.name, description: p.description, price: p.price, category: String(p.category) }));
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = { ...form, category: Number(form.category) };
        if (id) await catalogApi.updateProduct(Number(id), data);
        else await catalogApi.createProduct(data);
        showToast('Product saved.', 'success');
        navigate('/admin/products');
    };

    return (
        <div>
            <PageHeader eyebrow="Admin" title={id ? 'Edit Product' : 'New Product'} />
            <form onSubmit={handleSubmit} className="flex max-w-lg flex-col gap-4 border border-border bg-surface p-6">
                <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                <TextArea label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
                <Input label="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
                <Input label="Category ID" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required />
                <Button type="submit">Save</Button>
            </form>
        </div>
    );
};

export default ProductFormPage;
