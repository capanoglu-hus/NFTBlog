const { createWalletClient, createPublicClient, http, hexToBytes } = require('viem');
const { privateKeyToAccount } = require('viem/accounts');
const { sepolia } = require('viem/chains');
const contractABI = require('./contractABI.json');
const { Error } = require('mongoose');
const authorAddress = process.env.AUTHOR_ADDRESS

const account = privateKeyToAccount(process.env.account_private_key)
 
const client = createWalletClient({ 
  account, 
  chain: sepolia,
  transport: http('https://ethereum-sepolia-rpc.publicnode.com')
})

const publicClient = createPublicClient({
  chain: sepolia,
  transport: http('https://ethereum-sepolia-rpc.publicnode.com')
});

async function mintNFT(tokenURI) {
    try {
        console.log("mint başlıyor")
        const hash = await client.writeContract({
            address: process.env.CONTRACT_ADDRESS,
            abi: contractABI,
            functionName: 'awardItem',
            args: [authorAddress, tokenURI],
        })

       console.log("İşlem gönderildi, onay bekleniyor. Hash:", hash);

       const receipt = await publicClient.waitForTransactionReceipt({hash})
       if (receipt.status === 'reverted') {
        console.log("İşlem blokzincirinde başarısız oldu!");
        throw new Error("İşlem blokzincirinde başarısız oldu!");
        }
       return receipt;
    } catch (error) {
        console.error("Viem Hatası:", error);
        
    }
}

module.exports = { mintNFT };