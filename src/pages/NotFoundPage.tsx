import { Link } from 'react-router-dom';
import PageContainer from '../components/layout/PageContainer';
import PageHeader from '../components/ui/PageHeader';
import Button from '../components/ui/Button';

const NotFoundPage = () => (
    <PageContainer>
        <PageHeader eyebrow="404" title="Page Not Found" />
        <p className="mb-8 max-w-md text-sm text-gray-400">
            The page you are looking for does not exist or may have been moved.
        </p>
        <Link to="/">
            <Button>Back to Shop</Button>
        </Link>
    </PageContainer>
);

export default NotFoundPage;
