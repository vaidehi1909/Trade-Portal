import { useState, useEffect } from "react";
import detectEthereumProvider from "@metamask/detect-provider";
import { Alert, Button, Card } from "antd";

const MetaMask = () => {
  const [hasProvider, setHasProvider] = useState(null);
  const initialState = { accounts: [], balance: "", chainId: "" };
  const [wallet, setWallet] = useState(initialState);

  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const refreshAccounts = (accounts) => {
      if (accounts.length > 0) {
        updateWallet(accounts);
      } else {
        // if length 0, user is disconnected
        setWallet(initialState);
      }
    };

    const refreshChain = (chainId) => {
      setWallet((wallet) => ({ ...wallet, chainId }));
    };

    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true });
      setHasProvider(Boolean(provider));

      if (provider) {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        refreshAccounts(accounts);
        window.ethereum.on("accountsChanged", refreshAccounts);
        window.ethereum.on("chainChanged", refreshChain);
      }
    };

    getProvider();

    return () => {
      window.ethereum?.removeListener("accountsChanged", refreshAccounts);
      window.ethereum?.removeListener("chainChanged", refreshChain);
    };
  }, []);

  const updateWallet = async (accounts) => {
    const balance = formatBalance(
      await window.ethereum?.request({
        method: "eth_getBalance",
        params: [accounts[0], "latest"],
      })
    );
    const chainId = await window.ethereum?.request({
      method: "eth_chainId",
    });
    setWallet({ accounts, balance, chainId });
  };

  const handleConnect = async () => {
    setIsConnecting(true);
    await window.ethereum
      .request({
        method: "eth_requestAccounts",
      })
      .then((accounts) => {
        setError(false);
        updateWallet(accounts);
      })
      .catch((err) => {
        setError(true);
        setErrorMessage(err.message);
      });
    setIsConnecting(false);
  };

  const disableConnect = Boolean(wallet) && isConnecting;

  return (
    <div className="">
      {wallet.accounts.length <= 0 && (
        <Alert
          message={`Injected Provider ${
            hasProvider ? "DOES" : "DOES NOT"
          } Exist`}
          type={hasProvider ? "success" : "error"}
        />
      )}

      {window.ethereum?.isMetaMask && wallet.accounts.length < 1 && (
        <div
          style={{
            justifyContent: "center",
            textAlign: "center",
            marginTop: "20px",
          }}>
          <Button disabled={disableConnect} onClick={handleConnect}>
            Connect MetaMask
          </Button>
        </div>
      )}

      {wallet.accounts.length > 0 && (
        <>
          <Card
            title={`Accounts No: ${wallet.accounts[0]}`}
            style={{ justifyContent: "center", textAlign: "center" }}>
            <div>Wallet Balance: {wallet.balance}</div>
            <div>Hex ChainId: {wallet.chainId}</div>
            <div>Numeric ChainId: {formatChainAsNum(wallet.chainId)}</div>
          </Card>
        </>
      )}
      {error /* New code block */ && (
        <div onClick={() => setError(false)}>
          <strong>Error:</strong> {errorMessage}
        </div>
      )}
    </div>
  );
};

export const formatBalance = (rawBalance) => {
  const balance = (parseInt(rawBalance) / 1000000000000000000).toFixed(2);
  return balance;
};

export const formatChainAsNum = (chainIdHex) => {
  const chainIdNum = parseInt(chainIdHex);
  return chainIdNum;
};

export default MetaMask;
