'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ProvideForage = function (_Component) {
    (0, _inherits3.default)(ProvideForage, _Component);

    function ProvideForage(props, context) {
        (0, _classCallCheck3.default)(this, ProvideForage);

        var _this = (0, _possibleConstructorReturn3.default)(this, (ProvideForage.__proto__ || Object.getPrototypeOf(ProvideForage)).call(this, props, context));

        _this.state = {
            storageValues: undefined,
            propagationValues: undefined
        };

        _this.state.propagationValues = _this.getPropagationValues(props);
        return _this;
    }

    (0, _createClass3.default)(ProvideForage, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this._isMounted = true;
            this.updateStorageValues();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this._isMounted = false;
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.setState({
                propagationValues: this.getPropagationValues(nextProps)
            });
        }
    }, {
        key: 'render',
        value: function render() {
            if (!this.props.children || !_react2.default.Children.count(this.props.children)) {
                return null;
            }
            var childProps = (0, _extends4.default)({}, this.state.storageValues, this.state.propagationValues);
            return _react2.default.Children.map(this.props.children, function (child) {
                return child ? _react2.default.cloneElement(child, childProps) : null;
            });
        }
    }, {
        key: 'updateStorageValues',
        value: function () {
            var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
                var storageValues;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return this.getStorageValues();

                            case 2:
                                storageValues = _context.sent;

                                this._isMounted && this.setState({ storageValues: storageValues });

                            case 4:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function updateStorageValues() {
                return _ref.apply(this, arguments);
            }

            return updateStorageValues;
        }()
    }, {
        key: 'getStorageValues',
        value: function () {
            var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
                var ownProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
                var provide, storage, values;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                provide = ownProps.provide, storage = ownProps.storage;

                                if (!(typeof provide === 'function')) {
                                    _context2.next = 3;
                                    break;
                                }

                                return _context2.abrupt('return', provide(ownProps));

                            case 3:

                                if (typeof provide === 'string') {
                                    provide = provide.split(',').map(function (str) {
                                        return str.trim();
                                    });
                                }

                                if (!Array.isArray(provide)) {
                                    _context2.next = 10;
                                    break;
                                }

                                _context2.next = 7;
                                return Promise.all(provide.map(function (prop) {
                                    return storage.getItem(prop);
                                }));

                            case 7:
                                values = _context2.sent;

                                // and turn that to an object of keys and values
                                values = values.reduce(function (result, value, index) {
                                    return (0, _extends4.default)({}, result, (0, _defineProperty3.default)({}, provide[index], value));
                                }, {});
                                return _context2.abrupt('return', values);

                            case 10:
                                return _context2.abrupt('return', {});

                            case 11:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function getStorageValues() {
                return _ref2.apply(this, arguments);
            }

            return getStorageValues;
        }()
    }, {
        key: 'getPropagationValues',
        value: function getPropagationValues() {
            var ownProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
            var propagate = ownProps.propagate,
                provide = ownProps.provide,
                storage = ownProps.storage,
                children = ownProps.children,
                childProps = (0, _objectWithoutProperties3.default)(ownProps, ['propagate', 'provide', 'storage', 'children']);


            if (propagate === true) {
                return childProps;
            }
            if (typeof propagate === 'function') {
                return propagate(ownProps);
            }
            // comma-separated prop names. split to array
            if (typeof propagate === 'string') {
                propagate = propagate.split(',').map(function (str) {
                    return str.trim();
                });
            }
            // array of props to pass through
            if (Array.isArray(propagate)) {
                return propagate.reduce(function (result, prop) {
                    if (typeof prop === 'function') {
                        return (0, _extends4.default)({}, result, prop(ownProps));
                    } else {
                        result[prop] = ownProps[prop];
                    }
                    return result;
                }, {});
            }
            return {};
        }
    }]);
    return ProvideForage;
}(_react.Component);

ProvideForage.propTypes = {
    children: _propTypes2.default.node,
    storage: _propTypes2.default.shape({
        getItem: _propTypes2.default.func,
        setItem: _propTypes2.default.func
    }),
    propagate: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.string, _propTypes2.default.arrayOf(_propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func])), _propTypes2.default.func]),
    provide: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.arrayOf(_propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.func])), _propTypes2.default.func])
};
ProvideForage.defaultProps = {
    propagate: true
};
exports.default = ProvideForage;