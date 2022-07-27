import * as React from 'react';
import * as ReactDOM from 'react-dom';
import GrinderyNexusContextProvider, { useGrinderyNexus } from '../.';

declare global {
  interface Window {
    ethereum: any;
  }
}

const AuthenticationButton = () => {
  const { user, connection, connectUser, disconnect } = useGrinderyNexus();

  if(user){
      return (
          <button onClick={() => { disconnect(); }}>Disconnect</button>
      )
  }

  if(!window.ethereum){
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

  return !connection || connection.status !== "connected" ? (
      <button
          onClick={() => {
              if (!connection || connection.status !== "connecting") {
                  connectUser();
              }
          }}
      >Connect</button>
  ) : null;
}

const App = () => {
    return (
        <GrinderyNexusContextProvider>
            <AuthenticationButton />
        </GrinderyNexusContextProvider>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
