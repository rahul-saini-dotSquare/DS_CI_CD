import React from 'react';
import ReactTestRenderer, { act } from 'react-test-renderer';
import { Text } from 'react-native';
import ErrorBoundary from '@components/common/ErrorBoundary';

const Boom = () => {
  throw new Error('boom');
};

const getTexts = (tree: ReactTestRenderer.ReactTestRenderer) =>
  tree.root.findAllByType(Text).map(node => node.props.children);

describe('ErrorBoundary', () => {
  it('renders its children when nothing throws', () => {
    let tree: ReactTestRenderer.ReactTestRenderer;
    act(() => {
      tree = ReactTestRenderer.create(
        <ErrorBoundary>
          <Text>All good</Text>
        </ErrorBoundary>,
      );
    });
    expect(getTexts(tree!)).toContain('All good');
  });
  it('shows the fallback UI when a child throws during render', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    let tree: ReactTestRenderer.ReactTestRenderer;
    act(() => {
      tree = ReactTestRenderer.create(
        <ErrorBoundary>
          <Boom />
        </ErrorBoundary>,
      );
    });
    expect(getTexts(tree!)).toContain('Something went wrong');
    spy.mockRestore();
  });
});
