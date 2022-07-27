# Grindery Nexus React Hook

React Hook for managing Grindery Nexus user authentication.

## How to use

### Install library

`yarn add use-grindery-nexus`

or 

`npm install use-grindery-nexus`

### Add Provider component to your React app

```js
import GrinderyNexusContextProvider from 'use-grindery-nexus';

const App = () => {
    return (
        <GrinderyNexusContextProvider>
            {/* your app components */}
        </GrinderyNexusContextProvider>
    );
};
```

### Use hook in your components to access user context

```js
import { useGrinderyNexus } from "use-grindery-nexus";

const AuthenticationButton = () => {
    const { user, connect, disconnect } = useGrinderyNexus();

    if(user){
        return (
            <button onClick={() => { disconnect(); }}>Disconnect</button>
        )
    }

    if(!"ethereum" in window){
        return (
            <p>
                An injected Ethereum provider such as{" "}
                <a href="https://metamask.io/" target="_blank" rel="noreferrer">
                    MetaMask
                </a>{" "}
                is needed to authenticate.
            </p>
        )
    }

    return !user ? (
        <button
            onClick={() => {
                connect();
            }}
        >Connect</button>
    ) : null;
}
```

## Development

See [DEVELOPMENT.md](https://github.com/grindery-io/use-grindery-nexus/blob/master/DEVELOPMENT.md) file.

## License

MIT License