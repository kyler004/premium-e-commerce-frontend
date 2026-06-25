interface PaginationProps {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    disabled?: boolean;
}

const Pagination = ({ page, totalPages, onPageChange, disabled = false }: PaginationProps) => {
    if (totalPages <= 1) return null;

    return (
        <div className={`mt-8 flex items-center justify-center gap-2 ${disabled ? 'opacity-50 pointer-events-none' : ''}`}>
            <button
                disabled={page <= 1 || disabled}
                onClick={() => onPageChange(page - 1)}
                className="border border-border px-4 py-2 text-xs uppercase tracking-widest text-gray-400 transition-colors hover:border-accent hover:text-accent disabled:opacity-40"
            >
                Prev
            </button>
            <span className="px-4 text-xs text-gray-500">
                Page {page} of {totalPages}
            </span>
            <button
                disabled={page >= totalPages || disabled}
                onClick={() => onPageChange(page + 1)}
                className="border border-border px-4 py-2 text-xs uppercase tracking-widest text-gray-400 transition-colors hover:border-accent hover:text-accent disabled:opacity-40"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
