import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AdaptiveButton from '@components/ui/AdaptiveButton';
import Colors from '@theme/Colors';
import Style from '@constants/Style';
import Logger from '@utils/Logger';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    Logger.error('ErrorBoundary caught', error, info.componentStack);
  }

  handleReset = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Something went wrong</Text>
          <Text style={styles.message}>
            An unexpected error occurred. Please try again.
          </Text>
          <View style={styles.action}>
            <AdaptiveButton
              variant="dark"
              title="Try Again"
              onPress={this.handleReset}
            />
          </View>
        </View>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    backgroundColor: Colors.white,
  },
  title: {
    ...Style.getTextStyle(20, 'Bold', Colors.black),
    textAlign: 'center',
  },
  message: {
    ...Style.getTextStyle(15, 'Regular', Colors.textColor),
    textAlign: 'center',
    marginTop: 8,
  },
  action: {
    alignSelf: 'stretch',
    marginTop: 24,
  },
});
