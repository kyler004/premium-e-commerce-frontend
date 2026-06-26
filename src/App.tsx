import { AppRouter } from './router';
import ErrorBoundary from './components/ErrorBoundary';
import { ToastProvider } from './components/ui/Toast';

const App = () => {
    return (
        <ToastProvider>
            <ErrorBoundary>
                <AppRouter />
            </ErrorBoundary>
        </ToastProvider>
    );
};

export default App;
