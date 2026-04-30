import ProductCard from '../components/product/ProductCard.tsx';
import { products } from '../data/product.ts'
import type {Product} from "../types";

const ProductListingPage = () => {
    return (
        <div className={"p-8 grid grid-cols-3 gap-4"}>
            {products.map((product: Product) => ( <ProductCard key={product.id} product={product} />))}
        </div>
    )
};

export default ProductListingPage;