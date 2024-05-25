import { Component } from "react";
import SomethingWentWrong from "../../pages/error-boundary-fallback/SomethingWentWrong";


class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      errorMessage: "",
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorMessage: errorInfo.componentStack });
  }

  render() {
    if (this.state.hasError) {
      return <SomethingWentWrong errorMessage={this.state.errorMessage} />;
    }
    return this.props.children;
  }
}
export default ErrorBoundary;