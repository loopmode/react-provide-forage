import React from 'react';
import ProvideForage from './ProvideForage';

export default function connectStorage(storage, provide) {
    return Child => props => (
        <ProvideForage storage={storage} provide={provide}>
            <Child {...props} />
        </ProvideForage>
    );
}
