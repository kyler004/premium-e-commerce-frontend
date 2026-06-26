import { Component, type ErrorInfo, type ReactNode } from 'react';
import Button from './ui/Button';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
    state: State = { hasError: false };

    static getDerivedStateFromError(): State {
        return { hasError: true };
    }

    componentDidCatch(error: Error, info: ErrorInfo) {
        console.error('Uncaught error:', error, info.componentStack);
    }

    handleReload = () => {
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-bg px-4 text-center">
                    <div>
                        <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-gray-500">
                            Error
                        </p>
                        <h1 className="text-2xl font-black uppercase tracking-tight text-white">
                            Something went wrong
                        </h1>
                        <p className="mt-2 text-sm text-gray-400">
                            An unexpected error occurred. Try reloading the page.
                        </p>
                    </div>
                    <Button onClick={this.handleReload}>Reload Page</Button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
