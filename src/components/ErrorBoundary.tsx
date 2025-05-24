import { Component, ErrorInfo, ReactNode } from "react";

export const CustomErrorName = "CustomError";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: any;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      error: "",
      hasError: false,
    };
  }

  public resetErrorBoundary() {
    this.setState({ hasError: false });
  }

  public componentDidCatch(error: any, errorInfo: ErrorInfo) {
    this.setState({ hasError: true, error });
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="relative font-serif top-[23vh] m-10">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-7xl md:text-8xl font-bold mb-12">
                <span>Opps!</span>
              </h2>
              <p className="text-3xl md:text-4xl mb-12 whitespace-pre-wrap">
                {this.state.error.name === CustomErrorName &&
                this.state.error.message
                  ? this.state.error.message
                  : "Something went wrong."}
              </p>
              <a
                href={process.env.PUBLIC_URL + "/home"}
                className="text-white bg-blue-700 hover:bg-blue-800 rounded-lg px-5 py-2.5 focus:outline-none"
              >
                Back to home
              </a>
            </div>
          </div>
        </div>
      );
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBoundary;
