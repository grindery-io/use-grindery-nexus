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

const FlowAuthenticationButton = () => {
  const { flowUser, connectFlow, disconnectFlow } = useGrinderyNexus();

  return (
    <button
      onClick={() => {
        if (flowUser && flowUser.addr) {
          disconnectFlow();
        } else {
          connectFlow();
        }
      }}
    >
      {flowUser && flowUser.addr ? 'Disconnect' : 'Connect with Flow'}
    </button>
  );
};

const App = () => {
  return (
    <GrinderyNexusContextProvider>
      <AuthenticationButton />
      <FlowAuthenticationButton />
    </GrinderyNexusContextProvider>
  );
};

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container!);
root.render(<App />);
