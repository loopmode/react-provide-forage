'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = connectStorage;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ProvideForage = require('./ProvideForage');

var _ProvideForage2 = _interopRequireDefault(_ProvideForage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function connectStorage(storage, provide) {
    return function (Child) {
        return function (props) {
            return _react2.default.createElement(
                _ProvideForage2.default,
                { storage: storage, provide: provide },
                _react2.default.createElement(Child, props)
            );
        };
    };
}