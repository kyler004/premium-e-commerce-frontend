import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { catalogApi } from '../../api/catalog';
import type { Variant } from '../../types/api';
import PageHeader from '../../components/ui/PageHeader';
import DataTable from '../../components/admin/DataTable';
import Button from '../../components/ui/Button';
import { useToast } from '../../hooks/useToast';

const VariantsListPage = () => {
    const [items, setItems] = useState<Variant[]>([]);
    const { showToast } = useToast();
    const load = () => catalogApi.listVariants({ page_size: 100 }).then((d) => setItems(d.results));

    useEffect(() => { load(); }, []);

    return (
        <div>
            <PageHeader eyebrow="Admin" title="Variants" trailing={<Link to="/admin/variants/new"><Button size="sm">New</Button></Link>} />
            <DataTable columns={['SKU', 'Product', 'Size', 'Color', 'Actions']}>
                {items.map((v) => (
                    <tr key={v.id}>
                        <td className="px-4 py-3 text-white">{v.sku}</td>
                        <td className="px-4 py-3 text-gray-400">{v.product}</td>
                        <td className="px-4 py-3 text-gray-400">{v.size}</td>
                        <td className="px-4 py-3 text-gray-400">{v.color}</td>
                        <td className="px-4 py-3">
                            <div className="flex gap-2">
                                <Link to={`/admin/variants/${v.id}/edit`}><Button size="sm" variant="secondary">Edit</Button></Link>
                                <Button size="sm" variant="danger" onClick={async () => { await catalogApi.deleteVariant(v.id); showToast('Deleted.', 'success'); load(); }}>Delete</Button>
                            </div>
                        </td>
                    </tr>
                ))}
            </DataTable>
        </div>
    );
};

export default VariantsListPage;
