import { Wallet } from "ethers";
import * as dotenv from "dotenv";

dotenv.config();

async function main() {
    const wallet = new Wallet(process.env.PRIVATE_KEY!);

    const message = "Sign this message to verify your wallet ownership.Nonce: 92569dd8841021724285b25183703974";
    const signedMessage = await wallet.signMessage(message);

    console.log("Address:", wallet.address);
    console.log("Signature:", signedMessage);
}

main();
