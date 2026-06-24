import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { catalogApi } from '../../api/catalog';
import PageHeader from '../../components/ui/PageHeader';
import DataTable from '../../components/admin/DataTable';
import Button from '../../components/ui/Button';
import { useToast } from '../../hooks/useToast';

interface InventoryRow {
    id: number;
    variant: number;
    quantity: number;
    last_updated: string;
}

const InventoriesListPage = () => {
    const [items, setItems] = useState<InventoryRow[]>([]);
    const { showToast } = useToast();
    const load = () => catalogApi.listInventories({ page_size: 100 }).then((d) => setItems(d.results as InventoryRow[]));

    useEffect(() => { load(); }, []);

    return (
        <div>
            <PageHeader eyebrow="Admin" title="Inventory" trailing={<Link to="/admin/inventories/new"><Button size="sm">New</Button></Link>} />
            <DataTable columns={['Variant', 'Quantity', 'Updated', 'Actions']}>
                {items.map((inv) => (
                    <tr key={inv.id}>
                        <td className="px-4 py-3 text-white">{inv.variant}</td>
                        <td className="px-4 py-3 text-gray-400">{inv.quantity}</td>
                        <td className="px-4 py-3 text-gray-400">{new Date(inv.last_updated).toLocaleDateString()}</td>
                        <td className="px-4 py-3">
                            <div className="flex gap-2">
                                <Link to={`/admin/inventories/${inv.id}/edit`}><Button size="sm" variant="secondary">Edit</Button></Link>
                                <Button size="sm" variant="danger" onClick={async () => { await catalogApi.deleteInventory(inv.id); showToast('Deleted.', 'success'); load(); }}>Delete</Button>
                            </div>
                        </td>
                    </tr>
                ))}
            </DataTable>
        </div>
    );
};

export default InventoriesListPage;
