# react-provide-forage

A higher-order-componennt and a decorator for providing localforage values to react components.

## Usage

### Component

If you want to provide localforage data to child components in the JSX tree you control, you can use the component:

```javascript
import React, { Component } from 'react';
import ProvideForage from 'react-provide-forage'
import localforage from 'localforage';

export default class MyComponent extends Component {
    render() {
        return ( 
            <ProvideForage storage={localforage} provide="activeIndex">
                <MyTabbedComponent
                    items={this.props.items}
                    foo="bar"
                    bar="baz"
                />
            </ProvideForage> 
        );
    }
}

```

The `MyTabbedComponent` will receive an additional prop `activeIndex` as soon as the value is loaded from localforage.


### Decorator

If you want to provide data "to yourself", you can use the decorator:


```javascript
import React, { Component } from 'react';
import { connectForage } from 'react-provide-forage'; 
import localforage from 'localforage';

@connectForage(localforage, ['activeIndex'])
export default class MyComponent extends Component {
    static propTypes = {
        activeIndex: PropTypes.number
    };
    render() {
        return ( 
            <MyTabbedComponent
                activeIndex={this.props.activeIndex}
                items={this.props.items}
                foo="bar"
                bar="baz"
            /> 
        );
    }
}


```

If you prefer not to use ES7 decorator syntax, you can write the same as:


```javascript
import React, { Component } from 'react';
import { connectForage } from 'react-provide-forage'; 
import localforage from 'localforage';

const withForage = connectForage(localforage, ['activeIndex']);

class MyComponent extends Component {
    static propTypes = {
        activeIndex: PropTypes.number
    };
    render() {
        return ( 
            <MyTabbedComponent
                activeIndex={this.props.activeIndex}
                items={this.props.items}
                foo="bar"
                bar="baz"
            /> 
        );
    }
}

export default withForage(MyComponent)

```


