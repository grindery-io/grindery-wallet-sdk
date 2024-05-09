const WalletSDK = window.Grindery && window.Grindery.WalletSDK;

const shortenAddress = address => {
  return address.length > 10
    ? address.substring(0, 6) + '...' + address.substring(address.length - 4)
    : address;
};

const renderUsername = target => {
  const WebApp = window && window.Telegram && window.Telegram.WebApp;
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

const renderReloadButton = target => {
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
  button.innerHTML = 'Connecting...';
  button.disabled = true;

  WalletSDK.on('pairing', data => onPairing(data, target));

  WalletSDK.connect().catch(error => {
    console.error('eth_requestAccounts', error);
    renderReloadButton(target);
  });
};

const renderConnectButton = target => {
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
    button.addEventListener('click', event => {
      onConnectButtonClick(event, button, target);
    });
  }
};

const onSignButtonClick = (e, button, address) => {
  button.disabled = true;
  button.innerHTML = 'Approve request in Grindery Bot...';
  WalletSDK.signMessage('Hello, Grindery!')
    .then(signature => {
      console.log('signMessage', signature);
      button.parentElement.innerHTML = `<p class="text-center max-w-full overflow-hidden text-ellipsis">Signature: <em>${signature}</em></p>`;
    })
    .catch(error => {
      console.error('signMessage', error);
      button.disabled = false;
      button.innerHTML = 'Personal sign';
      alert('Error: ' + error.message);
    });
};

const onSendTxButtonClick = (e, button, address) => {
  button.disabled = true;
  button.innerHTML = 'Approve request in Grindery Bot...';
  WalletSDK.sendTransaction({ to: address, value: '0xde0b6b3a7640000' })
    .then(txHash => {
      console.log('sendTransaction', txHash);
      button.parentElement.innerHTML = `<p class="text-center max-w-full overflow-hidden text-ellipsis">Transaction: <em>${txHash}</em></p>`;
    })
    .catch(error => {
      console.error('sendTransaction', error);
      button.disabled = false;
      button.innerHTML = 'Send transaction';
      alert('Error: ' + error.message);
    });
};

const renderConnectedWallet = (address, target) => {
  if (!target || !address) {
    return;
  }
  target.innerHTML = `
        <p class="text-center mb-4">Grindery Wallet Connected!</p>
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
      `;
};

const listenWalletButtonsClicks = (address, target) => {
  if (!target || !address) {
    return;
  }
  const signButton = target.querySelector('#personal_sign');
  const sendButton = target.querySelector('#eth_sendTransaction');
  if (signButton) {
    signButton.addEventListener('click', event =>
      onSignButtonClick(event, signButton, address)
    );
  }
  if (sendButton) {
    sendButton.addEventListener('click', event =>
      onSendTxButtonClick(event, sendButton, address)
    );
  }
};

const onPairing = (data, target) => {
  target.innerHTML = `
  <p class="text-center mb-4">Approve wallet connection in Grindery Bot</p>
    <p class="text-center mb-4"><a
    target="_blank"
    class="!text-blue-500" href="${data.connectUrlBrowser}">Click here</a> if you weren't redirected automatically</p>
  `;
};

const onRestorePairing = (data, target) => {
  target.innerHTML = `
  <p class="text-center mb-4">Approve wallet connection in Grindery Bot</p>
    <p class="text-center mb-4"><a href="${data.connectUrlBrowser}" target="_blank" rel="noreferrer">Click here</a> if you weren't redirected automatically</p>
  `;
};

const onAccountsChanged = ({ accounts }, target) => {
  if (!target) {
    return;
  }
  if (accounts.length > 0) {
    renderConnectedWallet(accounts[0], target);
    listenWalletButtonsClicks(accounts[0], target);
  } else {
    renderConnectButton(target);
  }
};

const onDisconnect = (data, target) => {
  renderConnectButton(target);
};

const listenProviderEvents = target => {
  WalletSDK.on('restorePairing', data => onRestorePairing(data, target));
  WalletSDK.on('accountsChanged', data => onAccountsChanged(data, target));
  WalletSDK.on('disconnect', data => onDisconnect(data, target));
};

const onProviderConnect = () => {
  const targetEl = document.getElementById('sdk-example');
  listenProviderEvents(targetEl);
  renderUsername(targetEl);
  renderConnectButton(targetEl);
};

const init = () => {
  if (WalletSDK) {
    WalletSDK.on('connect', onProviderConnect);
  }
};

init();
