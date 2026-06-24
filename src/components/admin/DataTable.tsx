interface DataTableProps {
    columns: string[];
    children: React.ReactNode;
}

const DataTable = ({ columns, children }: DataTableProps) => (
    <div className="overflow-x-auto border border-border">
        <table className="w-full text-left text-sm">
            <thead>
                <tr className="border-b border-border bg-surface">
                    {columns.map((col) => (
                        <th key={col} className="px-4 py-3 text-[10px] font-semibold uppercase tracking-widest text-gray-500">
                            {col}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className="divide-y divide-border">{children}</tbody>
        </table>
    </div>
);

export default DataTable;
