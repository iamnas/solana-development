import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  sendAndConfirmTransaction,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { airdrop } from "../airdrop";
import { showBalance } from "../showBalance";

export const tansferSol = async (
  from: Keypair,
  to: PublicKey,
  amount: number
) => {
  const connection = new Connection("http://localhost:8899", "confirmed");

  const transaction = new Transaction();

  const instruction = SystemProgram.transfer({
    fromPubkey: from.publicKey,
    toPubkey: to,
    lamports: amount * LAMPORTS_PER_SOL,
  });

  transaction.add(instruction);
  await sendAndConfirmTransaction(connection, transaction, [from]);

  console.log("Done");
};

const secret = Uint8Array.from([
  103, 212, 231, 13, 189, 66, 86, 187, 202, 240, 241, 232, 86, 34, 82, 172, 96,
  115, 23, 115, 245, 126, 173, 92, 61, 74, 237, 15, 63, 240, 179, 88, 95, 163,
  215, 61, 16, 67, 131, 122, 158, 151, 129, 142, 117, 114, 49, 245, 139, 205,
  72, 167, 6, 71, 80, 143, 208, 165, 121, 20, 127, 40, 144, 229,
]);

const from = Keypair.fromSecretKey(secret);
const to = new PublicKey("DvQS7HkEuvPp7862NvMCaGyspRi7hTDNTAJr2MRBVniY");

(async () => {

    console.log("Befor transfer");
    await showBalance(from.publicKey)
    await showBalance(to)
    
    console.log('After airdrop balance of From');
    await airdrop(from.publicKey, 10);

    await tansferSol(from, to,10);

    console.log('After transfer from to to ');
    await showBalance(from.publicKey)
    await showBalance(to)

})();
