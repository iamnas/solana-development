import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

export const showBalance = async (address: PublicKey) => {
  const connection = new Connection("http://localhost:8899", "confirmed");
  const publicKey = new PublicKey(address);

  const balance = (await connection.getBalance(publicKey)) ;
  console.log(`balance of ${publicKey} ${balance/ LAMPORTS_PER_SOL} SOL`);
};

// showBalance(new PublicKey('DvQS7HkEuvPp7862NvMCaGyspRi7hTDNTAJr2MRBVniY'))