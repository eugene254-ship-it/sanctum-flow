import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { Wallet } from "lucide-react";

export function ConnectWalletButton() {
  const { publicKey, disconnect, connecting, connected, wallet } = useWallet();
  const { setVisible } = useWalletModal();

  const short = publicKey ? `${publicKey.toBase58().slice(0, 4)}…${publicKey.toBase58().slice(-4)}` : null;

  if (connected && short) {
    return (
      <button
        onClick={() => disconnect()}
        title={`Disconnect ${wallet?.adapter.name ?? "wallet"}`}
        className="px-4 py-2 rounded-lg glass-card text-sm font-mono hover:border-primary/50 transition flex items-center gap-2"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
        {short}
      </button>
    );
  }

  return (
    <button
      onClick={() => setVisible(true)}
      disabled={connecting}
      className="px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-secondary text-primary-foreground text-sm font-semibold hover:opacity-90 transition glow-ring flex items-center gap-2 disabled:opacity-60"
    >
      <Wallet className="w-4 h-4" />
      {connecting ? "Connecting…" : "Connect Wallet"}
    </button>
  );
}
