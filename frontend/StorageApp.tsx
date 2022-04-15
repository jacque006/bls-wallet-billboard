import { ethers } from "ethers";
import * as React from "react";
import { Storage, Storage__factory } from "../typechain";
import loadConfig from "./loadConfig";

const provider = new ethers.providers.Web3Provider((window as any).ethereum);
const config = loadConfig();

const StorageApp: React.FunctionComponent = () => {
  const storageRef = React.useRef<Storage>();
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const [progressMsg, setProgressMsg] = React.useState("");
  const [slot, setSlot] = React.useState("");

  const refreshStorage = React.useCallback(async () => {
    if (!storageRef.current) {
      storageRef.current = Storage__factory.connect(
        config.storageAddress,
        provider
      );
    }

    const value = await storageRef.current.slot();
    setSlot(value.toString());
  }, []);

  const handleNewBlock = React.useCallback(
    async (blockNumber: number) => {
      try {
        console.debug(`new block ${blockNumber}`);
        await refreshStorage();
      } catch (err) {
        console.error(err);
      }
    },
    [refreshStorage]
  );

  React.useEffect(() => {
    (async () => {
      await refreshStorage();
    })().catch(console.error);
  }, [refreshStorage]);

  React.useEffect(() => {
    provider.on("block", handleNewBlock);

    return () => {
      provider.off("block", handleNewBlock);
    };
  }, [handleNewBlock]);

  if (!slot) {
    return <>Loading...</>;
  }

  async function store() {
    try {
      const newSlotValue = inputRef.current?.value;
      if (!newSlotValue) {
        throw new Error("no value set for slot in input");
      }

      setProgressMsg("Connecting...");

      const storage = Storage__factory.connect(
        config.storageAddress,
        provider.getSigner()
      );

      await provider.send("eth_requestAccounts", []);

      setProgressMsg("Sending...");

      const tx = await storage.setSlot(newSlotValue);

      setProgressMsg("Waiting for confirmation...");

      const recpt = await tx.wait();

      setProgressMsg(`Confirmed! ${recpt.transactionHash}`);

      await refreshStorage();
    } catch (err) {
      console.error(err);
      setProgressMsg(`Error: ${(err as Error).message}`);
    }
  }

  return (
    <>
      <h1>Storage Sample dApp</h1>

      <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
        <div>Current value: {slot}</div>
        <div>
          <input type="number" ref={inputRef} />
        </div>
        <div>
          <button
            onClick={async () => {
              await store();
            }}
          >
            Store
          </button>
        </div>
        <div>{progressMsg}</div>
      </div>
    </>
  );
};

export default StorageApp;
