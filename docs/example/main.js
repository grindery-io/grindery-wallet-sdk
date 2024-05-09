const shortenAddress = address => {
  return address.length > 10
    ? address.substring(0, 6) + '...' + address.substring(address.length - 4)
    : address;
};
const provider =
  window.Grindery &&
  window.Grindery.WalletSDK &&
  window.Grindery.WalletSDK.provider;
const WebApp = window && window.Telegram && window.Telegram.WebApp;
const user = WebApp && WebApp.initDataUnsafe && WebApp.initDataUnsafe.user;

if (provider) {
  provider.on('connect', () => {
    const parent = document.getElementById('walletSDK');
    if (WebApp) {
      if (user) {
        var userNamePlaceholder = parent.querySelector('.username');
        if (userNamePlaceholder) {
          userNamePlaceholder.innerHTML = ' @' + user.username;
        }
      }
    }

    if (parent) {
      parent.innerHTML = `
        <button class="py-2 px-4 bg-blue-500 text-white rounded-xl connect">
            Connect Grindery Wallet
        </button>
        `;
      const button = parent.querySelector('button');
      if (button) {
        button.addEventListener('click', () => {
          button.innerHTML = 'Connecting...';
          button.disabled = true;

          provider.on('pairing', data => {
            parent.innerHTML = `
              <p class="text-center mb-4">Approve wallet connection in Grindery Bot</p>
                <p class="text-center mb-4"><a
                target="_blank"
                class="!text-blue-500" href="${data.connectUrlBrowser}">Click here</a> if you weren't redirected automatically</p>
              `;
            if (
              WebApp &&
              WebApp.openTelegramLink &&
              WebApp.platform &&
              WebApp.platform !== 'unknown'
            ) {
              WebApp.openTelegramLink(data.connectUrlBrowser);
              if (WebApp.close) {
                window.Telegram.WebApp.close();
              }
            } else {
              window.open(data.connectUrlBrowser, '_blank');
            }
          });

          provider.request({ method: 'eth_requestAccounts' }).catch(error => {
            console.error('eth_requestAccounts', error);
            parent.innerHTML = `
                  <p class="text-center mb-4">Failed to connect wallet</p>
                  <button class="py-2 px-4 bg-blue-500 text-white rounded-xl connect" onClick="window.location.reload();">
                    Reload and try again
                  </button>
                `;
          });
        });
      }

      provider.on('restorePairing', data => {
        parent.innerHTML = `
          <p class="text-center mb-4">Approve wallet connection in Grindery Bot</p>
            <p class="text-center mb-4"><a href="${data.connectUrlBrowser}" target="_blank" rel="noreferrer">Click here</a> if you weren't redirected automatically</p>
          `;
      });
    }

    provider.on('accountsChanged', ({ accounts }) => {
      console.log('accountsChanged', accounts);
      if (accounts.length > 0) {
        const address = accounts[0];
        parent.innerHTML = `
            <p class="text-center mb-4">Grindery Wallet Connected!</p>
            <p class="text-center mb-4">${shortenAddress(address)}</p>
            <div class="mt-6">
                <button id="personal_sign" class="py-2 px-4 bg-blue-500 text-white rounded-xl">
                Sign message
                </button>
            </div>
            <div class="mt-4">
                <button id="eth_sendTransaction" class="py-2 px-4 bg-blue-500 text-white rounded-xl">
                Send transaction
                </button>
            </div>
          `;
        const signButton = parent.querySelector('#personal_sign');
        signButton.addEventListener('click', () => {
          signButton.disabled = true;
          signButton.innerHTML = 'Approve request in Grindery Bot...';
          provider
            .request({
              method: 'personal_sign',
              params: ['Hello, Grindery!', address],
            })
            .then(signature => {
              console.log('personal_sign', signature);
              //alert('Signature: ' + signature);
              signButton.parentElement.innerHTML = `<p class="text-center max-w-full overflow-hidden text-ellipsis">Signature: <em>${signature}</em></p>`;
            })
            .catch(error => {
              console.error('personal_sign', error);
              signButton.disabled = false;
              signButton.innerHTML = 'Personal sign';
              alert('Error: ' + error.message);
            });
        });

        const sendButton = parent.querySelector('#eth_sendTransaction');
        sendButton.addEventListener('click', () => {
          sendButton.disabled = true;
          sendButton.innerHTML = 'Approve request in Grindery Bot...';
          provider
            .request({
              method: 'eth_sendTransaction',
              params: [{ to: address, value: '0xde0b6b3a7640000' }],
            })
            .then(txHash => {
              console.log('eth_sendTransaction', txHash);
              //alert('Signature: ' + signature);
              sendButton.parentElement.innerHTML = `<p class="text-center max-w-full overflow-hidden text-ellipsis">Transaction: <em>${txHash}</em></p>`;
            })
            .catch(error => {
              console.error('eth_sendTransaction', error);
              sendButton.disabled = false;
              sendButton.innerHTML = 'Send transaction';
              alert('Error: ' + error.message);
            });
        });
      } else {
        parent.innerHTML = `
            <button class="py-2 px-4 bg-blue-500 text-white rounded-xl connect">
              Connect Grindery Wallet
            </button>
          `;
      }
    });

    provider.on('disconnect', data => {
      console.log('disconnect', data);
      parent.innerHTML = `
          <button class="py-2 px-4 bg-blue-500 text-white rounded-xl connect">
            Connect Grindery Wallet
          </button>
        `;
    });
  });
}
