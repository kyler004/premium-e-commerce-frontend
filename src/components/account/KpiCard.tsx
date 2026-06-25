interface KpiCardProps {
    label: string;
    value: string;
    subtext?: string;
    accent?: boolean;
}

const KpiCard = ({ label, value, subtext, accent = false }: KpiCardProps) => (
    <div className="border border-border bg-surface p-6">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-500">{label}</p>
        <p className={`mt-2 text-2xl font-black ${accent ? 'text-accent' : 'text-white'}`}>{value}</p>
        {subtext && <p className="mt-1 text-xs text-gray-600">{subtext}</p>}
    </div>
);

export default KpiCard;
