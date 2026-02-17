import { Wallet } from "ethers";
import * as dotenv from "dotenv";
import { JsonRpcProvider, ethers } from "ethers";
dotenv.config();

async function main() {
    const wallet = new Wallet(process.env.PRIVATE_KEY!);

    const message = "Sign this message to verify your wallet ownership.Nonce: 5e27809bc546799e53681ab84fcc6ab1";
    const signedMessage = await wallet.signMessage(message);

    console.log("Address:", wallet.address);
    console.log("Signature:", signedMessage);
}
async function signTxn() {
    const provider = new JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
    const wallet = new Wallet(process.env.PRIVATE_KEY!, provider);

    const value = ethers.parseEther("0.0000001");

    const nonce = await provider.getTransactionCount(wallet.address, "pending");

    const gasLimit = await provider.estimateGas({
        from: wallet.address,
        to: "0x655e34e483A834279298E329ab753a8839638B4E",
        value,
    });

    const feeData = await provider.getFeeData();

    const network = await provider.getNetwork();
    const to = "0x655e34e483A834279298E329ab753a8839638B4E";
    const txn = {
        to,
        value,
        gasLimit,
        nonce,
        chainId: Number(network.chainId),
        maxFeePerGas: feeData.maxFeePerGas!,
        maxPriorityFeePerGas: feeData.maxPriorityFeePerGas!,
        type: 2,
    };

    const signedTxn = await wallet.signTransaction(txn);

    console.log("Signed Transaction:", signedTxn);
}

main();
signTxn();