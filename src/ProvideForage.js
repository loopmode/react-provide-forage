import PropTypes from 'prop-types';
import React, { Component } from 'react';

export default class ProvideForage extends Component {
    static propTypes = {
        children: PropTypes.node,
        storage: PropTypes.shape({
            getItem: PropTypes.func,
            setItem: PropTypes.func
        }),
        propagate: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.string,
            PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.func])),
            PropTypes.func
        ]),
        provide: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.func])),
            PropTypes.func
        ])
    };
    static defaultProps = {
        propagate: true
    };

    state = {
        storageValues: undefined,
        propagationValues: undefined
    };

    constructor(props, context) {
        super(props, context);
        this.state.propagationValues = this.getPropagationValues(props);
    }
    componentDidMount() {
        this._isMounted = true;
        this.updateStorageValues();
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            propagationValues: this.getPropagationValues(nextProps)
        });
    }
    render() {
        return React.Children.map(this.props.children, child => {
            return React.cloneElement(child, {
                ...this.state.storageValues,
                ...this.state.propagationValues
            });
        });
    }

    async updateStorageValues() {
        if (this._isMounted) {
            const storageValues = await this.getStorageValues();
            this._isMounted && this.setState({ storageValues });
        }
    }
    async getStorageValues(ownProps = this.props) {
        let { provide, storage } = ownProps;

        if (typeof provide === 'function') {
            return provide(ownProps);
        }

        if (typeof provide === 'string') {
            provide = provide.split(',').map(str => str.trim());
        }

        if (Array.isArray(provide)) {
            // first get an array of value promises
            let values = await Promise.all(provide.map(prop => storage.getItem(prop)));
            // and turn that to an object of keys and values
            values = values.reduce((result, value, index) => {
                return {
                    ...result,
                    [provide[index]]: value
                };
            }, {});
            return values;
        }

        return {};
    }

    getPropagationValues(ownProps = this.props) {
        let { propagate, provide, storage, children, ...childProps } = ownProps;

        if (propagate === true) {
            return childProps;
        }
        if (typeof propagate === 'function') {
            return propagate(ownProps);
        }
        // comma-separated prop names. split to array
        if (typeof propagate === 'string') {
            propagate = propagate.split(',').map(str => str.trim());
        }
        // array of props to pass through
        if (Array.isArray(propagate)) {
            return propagate.reduce((result, prop) => {
                if (typeof prop === 'function') {
                    return { ...result, ...prop(ownProps) };
                } else {
                    result[prop] = ownProps[prop];
                }
                return result;
            }, {});
        }
        return {};
    }
}
