import { Component, ReactNode } from "react";
import ErrorMessage from "./ErrorMessage";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public render() {
    if (this.state.hasError) {
      return <ErrorMessage message={"An unexpected error occurred"} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;