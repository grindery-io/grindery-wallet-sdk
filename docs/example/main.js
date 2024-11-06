const WalletSDK = window.Grindery && window.Grindery.WalletSDK;
const WebApp = window.Telegram && window.Telegram.WebApp;

let newChainId = 'eip155:204';
let newChainName = 'opBNB';

const shortenAddress = (address) => {
  return address.length > 10
    ? address.substring(0, 6) + '...' + address.substring(address.length - 4)
    : address;
};

const showUsername = (target) => {
  if (WebApp) {
    const user = WebApp && WebApp.initDataUnsafe && WebApp.initDataUnsafe.user;
    if (user && target) {
      var userNamePlaceholder = target.querySelector('.username');
      if (userNamePlaceholder) {
        userNamePlaceholder.innerHTML = ' @' + user.username;
      }
    }
  }
};

const getAndShowWalletAddress = (target) => {
  if (WebApp) {
    const user = WebApp && WebApp.initDataUnsafe && WebApp.initDataUnsafe.user;
    if (user && user.id && target && WalletSDK) {
      WalletSDK.getUserWalletAddress(user.id)
        .then((address) => {
          if (address) {
            target.innerHTML = `<p class="py-2 px-4 text-text text-center">Auto-detected wallet address: ${shortenAddress(
              address
            )}</p>`;
          }
        })
        .catch((error) => {
          console.error('getUserWalletAddress', error);
        });
    }
  }
};

const showConnectButton = (target) => {
  if (!target) {
    return;
  }
  target.innerHTML = `
      <button class="py-2 px-4 bg-blue-500 text-white rounded-xl connect disabled:opacity-50">
          Connect Grindery Wallet
      </button>
      `;
  const button = target.querySelector('button');
  if (button) {
    button.addEventListener('click', (event) => {
      onConnectButtonClick(event, button, target);
    });
  }
};

const showConnectedWallet = (address, target) => {
  if (!target || !address) {
    return;
  }
  document.getElementById('wallet').innerHTML = '';
  target.innerHTML = `
        <p class="text-center mb-4">Grindery Wallet Connected to <span id="chain_name">${
          newChainId === 'eip155:204' ? 'Polygon' : 'opBNB'
        }</span>!</p>
        <p class="text-center mb-4">${shortenAddress(address)}</p>
        <div class="mt-6">
            <button id="personal_sign" class="py-2 px-4 bg-blue-500 text-white rounded-xl disabled:opacity-50">
            Sign message
            </button>
        </div>
        <div class="mt-4">
            <button id="eth_sendTransaction" class="py-2 px-4 bg-blue-500 text-white rounded-xl disabled:opacity-50">
            Send transaction
            </button>
        </div>
        <div class="mt-4">
            <button id="wallet_switchEthereumChain" class="py-2 px-4 bg-blue-500 text-white rounded-xl disabled:opacity-50">
            Switch chain to ${newChainName}
            </button>
        </div>
        <div class="mt-4">
            <button id="getUser" class="py-2 px-4 bg-blue-500 text-white rounded-xl disabled:opacity-50">
            Get user data
            </button>
        </div>
        <div class="mt-4">
            <button id="gws_disconnect" class="py-2 px-4 bg-red-500 text-white rounded-xl disabled:opacity-50">
              Disconnect wallet
            </button>
        </div>
      `;
};

const showReloadButton = (target) => {
  if (!target) {
    return;
  }
  target.innerHTML = `
    <p class="text-center mb-4">Failed to connect wallet</p>
    <button class="py-2 px-4 bg-blue-500 text-white rounded-xl connect" onClick="window.location.reload();">
      Reload and try again
    </button>
  `;
};

const onConnectButtonClick = (e, button, target) => {
  if (WalletSDK) {
    button.innerHTML = 'Connecting...';
    button.disabled = true;
    WalletSDK.connect().catch((error) => {
      console.error('connect', error);
      showReloadButton(target);
    });
  }
};

const onDisconnectButtonClick = (e, button, target) => {
  if (WalletSDK) {
    button.innerHTML = 'Connecting...';
    button.disabled = true;
    WalletSDK.disconnect()
      .then(() => {
        showConnectButton(target);
      })
      .catch((error) => {
        console.error('disconnect', error);
      });
  }
};

const onSignButtonClick = (e, button, address) => {
  if (WalletSDK) {
    button.disabled = true;
    button.innerHTML = 'Approve request in Grindery Bot...';
    WalletSDK.signMessage('Hello, Grindery!')
      .then((signature) => {
        console.log('signMessage', signature);
        button.parentElement.innerHTML = `<p class="text-center max-w-full overflow-hidden text-ellipsis">Signature: <em>${signature}</em></p>`;
      })
      .catch((error) => {
        console.error('signMessage', error);
        button.disabled = false;
        button.innerHTML = 'Personal sign';
        alert('Error: ' + error.message);
      });
  }
};

const onSendTxButtonClick = (e, button, address) => {
  if (WalletSDK) {
    button.disabled = true;
    button.innerHTML = 'Approve request in Grindery Bot...';

    // send 0.001 native tokens
    WalletSDK.sendTransaction({ to: address, value: '0x38d7ea4c68000' })
      .then((txHash) => {
        console.log('sendTransaction', txHash);
        button.parentElement.innerHTML = `<p class="text-center max-w-full overflow-hidden text-ellipsis">Transaction: <em>${txHash}</em></p>`;
      })
      .catch((error) => {
        console.error('sendTransaction', error);
        button.disabled = false;
        button.innerHTML = 'Send transaction';
        alert('Error: ' + error.message);
      });
  }
};

const onSwitchChainButtonclick = (e, button) => {
  if (WalletSDK) {
    button.disabled = true;
    WalletSDK.switchChain(newChainId)
      .then(() => {
        button.disabled = false;
        button.innerHTML = `Switch chain to ${newChainName}`;
      })
      .catch((error) => {
        console.error('switchChain', error);
        button.disabled = false;
        alert('Error: ' + error.message);
      });
  }
};

const listenWalletButtonsClicks = (address, target) => {
  if (!target || !address) {
    return;
  }
  const signButton = target.querySelector('#personal_sign');
  const sendButton = target.querySelector('#eth_sendTransaction');
  const switchChainButton = target.querySelector('#wallet_switchEthereumChain');
  const getUserButton = target.querySelector('#getUser');
  const disconnectButton = target.querySelector('#gws_disconnect');
  if (signButton) {
    signButton.addEventListener('click', (event) =>
      onSignButtonClick(event, signButton, address)
    );
  }
  if (sendButton) {
    sendButton.addEventListener('click', (event) =>
      onSendTxButtonClick(event, sendButton, address)
    );
  }
  if (switchChainButton) {
    switchChainButton.addEventListener('click', (event) =>
      onSwitchChainButtonclick(event, switchChainButton)
    );
  }
  if (getUserButton) {
    getUserButton.addEventListener('click', (event) => {
      getUserButton.disabled = true;
      if (WalletSDK) {
        WalletSDK.getUser()
          .then((user) => {
            alert(JSON.stringify(user));
            getUserButton.disabled = false;
          })
          .catch((error) => {
            console.error('getUser', error);
            alert('Error: ' + error.message);
            getUserButton.disabled = false;
          });
      }
    });
  }
  if (disconnectButton) {
    disconnectButton.addEventListener('click', (event) =>
      onDisconnectButtonClick(event, disconnectButton, target)
    );
  }
};

const onPairing = (data, target) => {
  if (!target) {
    return;
  }
  const redirectUrl =
    data.connectUrlBrowser || data.shortToken
      ? `https://www.grindery.com/connect/wc?uri=${data.shortToken}`
      : '';
  if (redirectUrl) {
    target.innerHTML = `
    <p class="text-center mb-4">Approve wallet connection in Grindery Bot</p>
    <p class="text-center mb-4">
      <a
        target="_blank"
        class="!text-blue-500" 
        href="${redirectUrl}"
      >Click here</a> if you weren't redirected automatically
    </p>
  `;
  }
};

const onAccountsChanged = (accounts, target) => {
  if (!target) {
    return;
  }
  if (accounts.length > 0) {
    showConnectedWallet(accounts[0], target);
    listenWalletButtonsClicks(accounts[0], target);
  } else {
    showConnectButton(target);
  }
};

const onDisconnect = (_, target) => {
  showConnectButton(target);
};

const onChainChanged = ({ chainId }) => {
  alert(`Chain changed to ${chainId}`);
  let chain_name = document.getElementById('chain_name');
  if (chainId === '0xcc') {
    newChainId = 'eip155:137';
    newChainName = 'Polygon';
    if (chain_name) {
      chain_name.innerHTML = 'opBNB';
    }
  } else {
    newChainId = 'eip155:204';
    newChainName = 'opBNB';
    if (chain_name) {
      chain_name.innerHTML = 'Polygon';
    }
  }
};

const listenProviderEvents = (target) => {
  if (WalletSDK) {
    WalletSDK.on('pair', (data) => onPairing(data, target));
    WalletSDK.on('accountsChanged', (data) => onAccountsChanged(data, target));
    WalletSDK.on('disconnect', (data) => onDisconnect(data, target));
    WalletSDK.on('chainChanged', (data) => onChainChanged(data));
  }
};

const onProviderConnect = ({ chainId }) => {
  const targetEl = document.getElementById('sdk-example');

  newChainId = chainId === '0xcc' ? 'eip155:137' : 'eip155:204';

  newChainName = chainId === '0xcc' ? 'Polygon' : 'opBNB';

  listenProviderEvents(targetEl);

  showUsername(targetEl);

  getAndShowWalletAddress(document.getElementById('wallet'));

  showConnectButton(targetEl);
};

const init = () => {
  if (WalletSDK) {
    WalletSDK.on('connect', onProviderConnect);
  }
};

init();
