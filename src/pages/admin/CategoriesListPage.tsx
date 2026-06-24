import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { catalogApi } from '../../api/catalog';
import type { Category } from '../../types/api';
import PageHeader from '../../components/ui/PageHeader';
import DataTable from '../../components/admin/DataTable';
import Button from '../../components/ui/Button';
import { useToast } from '../../hooks/useToast';

const CategoriesListPage = () => {
    const [items, setItems] = useState<Category[]>([]);
    const { showToast } = useToast();
    const load = () => catalogApi.listCategories({ page_size: 100 }).then((d) => setItems(d.results));
    useEffect(() => { load(); }, []);

    return (
        <div>
            <PageHeader eyebrow="Admin" title="Categories" trailing={<Link to="/admin/categories/new"><Button size="sm">New</Button></Link>} />
            <DataTable columns={['Name', 'Parent', 'Actions']}>
                {items.map((c) => (
                    <tr key={c.id}>
                        <td className="px-4 py-3 text-white">{c.name}</td>
                        <td className="px-4 py-3 text-gray-400">{c.parent ?? '—'}</td>
                        <td className="px-4 py-3">
                            <div className="flex gap-2">
                                <Link to={`/admin/categories/${c.id}/edit`}><Button size="sm" variant="secondary">Edit</Button></Link>
                                <Button size="sm" variant="danger" onClick={async () => { await catalogApi.deleteCategory(c.id); showToast('Deleted.', 'success'); load(); }}>Delete</Button>
                            </div>
                        </td>
                    </tr>
                ))}
            </DataTable>
        </div>
    );
};

export default CategoriesListPage;
