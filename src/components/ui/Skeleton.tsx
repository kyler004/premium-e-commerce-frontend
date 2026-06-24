const Skeleton = ({ className = '' }: { className?: string }) => (
    <div className={`animate-pulse bg-border ${className}`} />
);

export const ProductCardSkeleton = () => (
    <div className="flex flex-col gap-4 border border-border bg-surface p-4">
        <Skeleton className="aspect-square w-full" />
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-3 w-1/3" />
    </div>
);

export const PageSkeleton = () => (
    <div className="mx-auto max-w-7xl px-6 py-12">
        <Skeleton className="mb-8 h-12 w-64" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
            ))}
        </div>
    </div>
);

export default Skeleton;
