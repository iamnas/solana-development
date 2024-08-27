import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  sendAndConfirmTransaction,
  Transaction,
} from "@solana/web3.js";
import {
  createMint,
  createTransferInstruction,
  getAccount,
  getOrCreateAssociatedTokenAccount,
  mintTo,
  transfer,
} from "@solana/spl-token";

// import { showBalance } from "../showBalance";
(async () => {
  // step 1 keyGen
  const secret = Uint8Array.from([
    103, 212, 231, 13, 189, 66, 86, 187, 202, 240, 241, 232, 86, 34, 82, 172,
    96, 115, 23, 115, 245, 126, 173, 92, 61, 74, 237, 15, 63, 240, 179, 88, 95,
    163, 215, 61, 16, 67, 131, 122, 158, 151, 129, 142, 117, 114, 49, 245, 139,
    205, 72, 167, 6, 71, 80, 143, 208, 165, 121, 20, 127, 40, 144, 229,
  ]);

  const connection = new Connection("http://localhost:8899", "confirmed");

  const payer = Keypair.fromSecretKey(secret);

  // step 2 createMint
  const mint = await createMint(
    connection,
    payer,
    payer.publicKey,
    payer.publicKey,
    9
  );
  console.log(`Token Mint Address: ${mint.toBase58()}`);

  // Create a token account for the payer
  const payerTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    payer, // Payer for transaction fees
    mint, // The token's mint address
    payer.publicKey // Owner of the token account
  );

  console.log(`Payer Token Account: ${payerTokenAccount.address.toBase58()}`);

  // Mint some tokens to the payer's account
  await mintTo(
    connection,
    payer, // Payer for transaction fees
    mint, // The token's mint address
    payerTokenAccount.address, // Account to mint tokens to
    payer.publicKey, // Minting authority
    1000 * LAMPORTS_PER_SOL // Amount of tokens to mint (1,000 tokens)
  );

  console.log(`Minted 1000 tokens to ${payerTokenAccount.address.toBase58()}`);

  const tokenAccountInfo = await getAccount(
    connection,
    payerTokenAccount.address
  );
  console.log(`Token Account Balance: ${tokenAccountInfo.amount}`);

  //   Tranafer
  // Replace with the recipient's public key
  const recipientPublicKey = new PublicKey(
    "DvQS7HkEuvPp7862NvMCaGyspRi7hTDNTAJr2MRBVniY"
  );

  // Get or create the associated token account for the recipient
  const recipientTokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    payer,
    mint,
    recipientPublicKey
  );

  const sendAmount = 1_000_000_000;
  
  const tx = new Transaction().add(
    createTransferInstruction(
        payerTokenAccount.address,
        recipientTokenAccount.address,
        payer.publicKey,
        sendAmount,
  ));

  await sendAndConfirmTransaction(connection, tx, [payer]);
})();
