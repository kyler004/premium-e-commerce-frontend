interface PageContainerProps {
    children: React.ReactNode;
    className?: string;
}

const PageContainer = ({ children, className = '' }: PageContainerProps) => (
    <div className={`mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-12 fade-in-element ${className}`}>
        {children}
    </div>
);

export default PageContainer;
