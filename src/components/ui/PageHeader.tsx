interface PageHeaderProps {
    eyebrow: string;
    title: string;
    trailing?: React.ReactNode;
}

const PageHeader = ({ eyebrow, title, trailing }: PageHeaderProps) => (
    <div className="mb-10 flex items-end justify-between border-b border-border pb-6">
        <div>
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-gray-500">
                {eyebrow}
            </p>
            <h1 className="text-4xl font-black uppercase tracking-tight text-white">{title}</h1>
        </div>
        {trailing}
    </div>
);

export default PageHeader;
