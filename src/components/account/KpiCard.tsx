interface KpiCardProps {
    label: string;
    value: string;
    accent?: boolean;
    subtext?: string;
}

const KpiCard = ({ label, value, accent = false, subtext }: KpiCardProps) => (
    <div className="border border-border bg-surface p-5">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-500">{label}</p>
        <p className={`mt-2 text-xl font-black md:text-2xl ${accent ? 'text-accent' : 'text-white'}`}>{value}</p>
        {subtext && <p className="mt-1 text-xs text-gray-600">{subtext}</p>}
    </div>
);

export default KpiCard;
