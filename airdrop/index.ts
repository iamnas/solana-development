import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

export const airdrop = async (address: PublicKey, amount: number) => {
  const connection = new Connection("http://localhost:8899", "confirmed");
  const publicKey = new PublicKey(address);
  const tx = await connection.requestAirdrop(
    publicKey,
    amount * LAMPORTS_PER_SOL
  );
  const latestBlockHash = await connection.getLatestBlockhash();
  await connection.confirmTransaction({
    blockhash: latestBlockHash.blockhash,
    lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
    signature: tx,
  });

  const balance = await connection.getBalance(publicKey);

  console.log(`balance of ${publicKey} is `,balance / LAMPORTS_PER_SOL);
};

// airdrop(new PublicKey("DvQS7HkEuvPp7862NvMCaGyspRi7hTDNTAJr2MRBVniY", 10));

