import { AppRouter } from './router';
import { ToastProvider } from './components/ui/Toast';

const App = () => {
    return (
        <ToastProvider>
            <AppRouter />
        </ToastProvider>
    );
};

export default App;
