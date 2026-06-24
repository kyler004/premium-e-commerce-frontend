import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { catalogApi } from '../../api/catalog';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import PageHeader from '../../components/ui/PageHeader';
import { useToast } from '../../hooks/useToast';

const InventoryFormPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { showToast } = useToast();
    const [variant, setVariant] = useState('');
    const [quantity, setQuantity] = useState('');

    useEffect(() => {
        if (id) {
            catalogApi.listInventories({ page_size: 100 }).then((d) => {
                const inv = (d.results as { id: number; variant: number; quantity: number }[]).find((i) => i.id === Number(id));
                if (inv) { setVariant(String(inv.variant)); setQuantity(String(inv.quantity)); }
            });
        }
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = { variant: Number(variant), quantity: Number(quantity) };
        if (id) await catalogApi.updateInventory(Number(id), data);
        else await catalogApi.createInventory(data);
        showToast('Inventory saved.', 'success');
        navigate('/admin/inventories');
    };

    return (
        <div>
            <PageHeader eyebrow="Admin" title={id ? 'Edit Inventory' : 'New Inventory'} />
            <form onSubmit={handleSubmit} className="flex max-w-lg flex-col gap-4 border border-border bg-surface p-6">
                <Input label="Variant ID" value={variant} onChange={(e) => setVariant(e.target.value)} required />
                <Input label="Quantity" type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
                <Button type="submit">Save</Button>
            </form>
        </div>
    );
};

export default InventoryFormPage;
