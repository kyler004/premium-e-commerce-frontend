interface PageHeaderProps {
    eyebrow: string;
    title: string;
    trailing?: React.ReactNode;
}

const PageHeader = ({ eyebrow, title, trailing }: PageHeaderProps) => (
    <div className="mb-8 flex flex-col gap-4 border-b border-border pb-6 md:mb-10 md:flex-row md:items-end md:justify-between">
        <div>
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-gray-500">
                {eyebrow}
            </p>
            <h1 className="text-3xl font-black uppercase tracking-tight text-white md:text-4xl">{title}</h1>
        </div>
        {trailing && <div className="w-full shrink-0 md:w-auto">{trailing}</div>}
    </div>
);

export default PageHeader;
