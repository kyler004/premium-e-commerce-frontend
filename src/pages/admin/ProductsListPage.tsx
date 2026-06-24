import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { catalogApi } from '../../api/catalog';
import type { Product } from '../../types/api';
import PageHeader from '../../components/ui/PageHeader';
import DataTable from '../../components/admin/DataTable';
import Button from '../../components/ui/Button';
import { formatPrice } from '../../lib/format';
import { useToast } from '../../hooks/useToast';

const ProductsListPage = () => {
    const [items, setItems] = useState<Product[]>([]);
    const { showToast } = useToast();
    const load = () => catalogApi.listProducts({ page_size: 100 }).then((d) => setItems(d.results));

    useEffect(() => { load(); }, []);

    return (
        <div>
            <PageHeader eyebrow="Admin" title="Products" trailing={<Link to="/admin/products/new"><Button size="sm">New</Button></Link>} />
            <DataTable columns={['Name', 'Price', 'Category', 'Actions']}>
                {items.map((p) => (
                    <tr key={p.id}>
                        <td className="px-4 py-3 text-white">{p.name}</td>
                        <td className="px-4 py-3 text-gray-400">{formatPrice(p.price)}</td>
                        <td className="px-4 py-3 text-gray-400">{p.category}</td>
                        <td className="px-4 py-3">
                            <div className="flex gap-2">
                                <Link to={`/admin/products/${p.id}/edit`}><Button size="sm" variant="secondary">Edit</Button></Link>
                                <Button size="sm" variant="danger" onClick={async () => { await catalogApi.deleteProduct(p.id); showToast('Deleted.', 'success'); load(); }}>Delete</Button>
                            </div>
                        </td>
                    </tr>
                ))}
            </DataTable>
        </div>
    );
};

export default ProductsListPage;
