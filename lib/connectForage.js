'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

exports.default = connectStorage;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ProvideForage = require('./ProvideForage');

var _ProvideForage2 = _interopRequireDefault(_ProvideForage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function connectStorage(storage, provide) {
    return function (Child) {
        return function (_React$PureComponent) {
            (0, _inherits3.default)(ProvideForageDecorator, _React$PureComponent);

            function ProvideForageDecorator() {
                (0, _classCallCheck3.default)(this, ProvideForageDecorator);
                return (0, _possibleConstructorReturn3.default)(this, (ProvideForageDecorator.__proto__ || Object.getPrototypeOf(ProvideForageDecorator)).apply(this, arguments));
            }

            (0, _createClass3.default)(ProvideForageDecorator, [{
                key: 'render',
                value: function render() {
                    return _react2.default.createElement(
                        _ProvideForage2.default,
                        { storage: storage, provide: provide },
                        _react2.default.createElement(Child, this.props)
                    );
                }
            }]);
            return ProvideForageDecorator;
        }(_react2.default.PureComponent);
    };
}