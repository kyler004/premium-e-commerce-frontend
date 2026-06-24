import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import PageHeader from '../../components/ui/PageHeader';
import DataTable from '../../components/admin/DataTable';
import { useEffect, useState } from 'react';
import { promotionsApi } from '../../api/promotions';
import type { Promotion } from '../../types/api';
import { useToast } from '../../hooks/useToast';

const PromotionsListPage = () => {
    const [promotions, setPromotions] = useState<Promotion[]>([]);
    const { showToast } = useToast();

    const load = () => promotionsApi.list(1, 50).then((d) => setPromotions(d.results));

    useEffect(() => { load(); }, []);

    const handleDelete = async (id: number) => {
        if (!confirm('Delete this promotion?')) return;
        await promotionsApi.delete(id);
        showToast('Promotion deleted.', 'success');
        load();
    };

    return (
        <div>
            <PageHeader
                eyebrow="Admin"
                title="Promotions"
                trailing={<Link to="/admin/promotions/new"><Button size="sm">New Promotion</Button></Link>}
            />
            <DataTable columns={['Code', 'Type', 'Value', 'Active', 'Actions']}>
                {promotions.map((p) => (
                    <tr key={p.id}>
                        <td className="px-4 py-3 font-bold text-white">{p.code}</td>
                        <td className="px-4 py-3 text-gray-400">{p.discount_type}</td>
                        <td className="px-4 py-3 text-gray-400">{p.discount_value}</td>
                        <td className="px-4 py-3 text-gray-400">{p.is_active ? 'Yes' : 'No'}</td>
                        <td className="px-4 py-3">
                            <div className="flex gap-2">
                                <Link to={`/admin/promotions/${p.id}/edit`}><Button size="sm" variant="secondary">Edit</Button></Link>
                                <Button size="sm" variant="danger" onClick={() => handleDelete(p.id)}>Delete</Button>
                            </div>
                        </td>
                    </tr>
                ))}
            </DataTable>
        </div>
    );
};

export default PromotionsListPage;
