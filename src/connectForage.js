import React from 'react';
import ProvideForage from './ProvideForage';

export default function connectStorage(storage, provide) {
    return Child => {
        return class ProvideForageDecorator extends React.PureComponent {
            render() {
                return (
                    <ProvideForage storage={storage} provide={provide}>
                        <Child {...this.props} />
                    </ProvideForage>
                );
            }
        };
    };
}
