interface PaginationProps {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination = ({ page, totalPages, onPageChange }: PaginationProps) => {
    if (totalPages <= 1) return null;

    return (
        <div className="mt-8 flex items-center justify-center gap-2">
            <button
                disabled={page <= 1}
                onClick={() => onPageChange(page - 1)}
                className="border border-border px-4 py-2 text-xs uppercase tracking-widest text-gray-400 transition-colors hover:border-accent hover:text-accent disabled:opacity-40"
            >
                Prev
            </button>
            <span className="px-4 text-xs text-gray-500">
                Page {page} of {totalPages}
            </span>
            <button
                disabled={page >= totalPages}
                onClick={() => onPageChange(page + 1)}
                className="border border-border px-4 py-2 text-xs uppercase tracking-widest text-gray-400 transition-colors hover:border-accent hover:text-accent disabled:opacity-40"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
