import * as React from 'react';
import ReactDOM from 'react-dom/client';
import GrinderyNexusContextProvider, { useGrinderyNexus } from '../.';

declare global {
  interface Window {
    ethereum: any;
  }
}

const AuthenticationButton = () => {
  const { user, connect, disconnect } = useGrinderyNexus();

  console.log('user', user);

  if (user) {
    return (
      <button
        onClick={() => {
          disconnect();
        }}
      >
        Disconnect
      </button>
    );
  }

  if (!window.ethereum) {
    return (
      <p>
        An injected Ethereum provider such as{' '}
        <a href="https://metamask.io/" target="_blank" rel="noreferrer">
          MetaMask
        </a>{' '}
        is needed to authenticate.
      </p>
    );
  }

  return !user ? (
    <button
      onClick={() => {
        connect();
      }}
    >
      Connect
    </button>
  ) : null;
};

const App = () => {
  return (
    <GrinderyNexusContextProvider>
      <AuthenticationButton />
    </GrinderyNexusContextProvider>
  );
};

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container!);
root.render(<App />);
