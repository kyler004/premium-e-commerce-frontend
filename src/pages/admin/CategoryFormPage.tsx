import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { catalogApi } from '../../api/catalog';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import PageHeader from '../../components/ui/PageHeader';
import { useToast } from '../../hooks/useToast';

const CategoryFormPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { showToast } = useToast();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [parent, setParent] = useState('');

    useEffect(() => {
        if (id) catalogApi.getCategory(Number(id)).then((c) => { setName(c.name); setDescription(c.description); setParent(c.parent?.toString() ?? ''); });
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = { name, description, parent: parent ? Number(parent) : null };
        if (id) await catalogApi.updateCategory(Number(id), data);
        else await catalogApi.createCategory(data);
        showToast('Category saved.', 'success');
        navigate('/admin/categories');
    };

    return (
        <div>
            <PageHeader eyebrow="Admin" title={id ? 'Edit Category' : 'New Category'} />
            <form onSubmit={handleSubmit} className="flex max-w-lg flex-col gap-4 border border-border bg-surface p-6">
                <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <Input label="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                <Input label="Parent ID" value={parent} onChange={(e) => setParent(e.target.value)} />
                <Button type="submit">Save</Button>
            </form>
        </div>
    );
};

export default CategoryFormPage;
