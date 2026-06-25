const Skeleton = ({ className = '' }: { className?: string }) => (
    <div className={`animate-pulse bg-border ${className}`} />
);

export const ProductCardSkeleton = () => (
    <div className="flex flex-col border border-border bg-surface transition-all duration-300">
        <Skeleton className="aspect-square w-full" />
        <div className="flex flex-col gap-2 p-5">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="h-5 w-1/4" />
        </div>
    </div>
);

export const ProductGridSkeleton = ({ count = 12 }: { count?: number }) => (
    <div className="grid flex-1 grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-3 bg-border">
        {Array.from({ length: count }).map((_, i) => (
            <div key={i} className="bg-bg">
                <ProductCardSkeleton />
            </div>
        ))}
    </div>
);

export const ProductDetailSkeleton = () => (
    <div className="mx-auto max-w-7xl px-6 py-12">
        <Skeleton className="mb-8 h-4 w-32" />
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div className="flex gap-4">
                <div className="flex flex-col gap-2">
                    <Skeleton className="h-20 w-20" />
                    <Skeleton className="h-20 w-20" />
                </div>
                <Skeleton className="aspect-square flex-1" />
            </div>
            <div className="flex flex-col gap-6">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-12 w-40" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-10 w-full" />
                <div className="flex gap-3">
                    <Skeleton className="h-12 w-28" />
                    <Skeleton className="h-12 flex-1" />
                    <Skeleton className="h-12 w-14" />
                </div>
            </div>
        </div>
    </div>
);

export default Skeleton;
