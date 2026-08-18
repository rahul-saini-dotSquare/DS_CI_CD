/**
 * react-native-svg-transformer only runs in Metro, so under Jest a `.svg`
 * import resolves to the RN asset object rather than a component. Map them
 * here so components rendering SVG icons mount in tests.
 */
const React = require('react');

const SvgMock = React.forwardRef((props, ref) =>
  React.createElement('SvgMock', { ...props, ref }),
);
SvgMock.displayName = 'SvgMock';

module.exports = SvgMock;
module.exports.default = SvgMock;
module.exports.ReactComponent = SvgMock;
