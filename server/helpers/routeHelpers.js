const Post = require('../models/Post');
const crypto = require('crypto');
const pinataSDK = require('@pinata/sdk');
const pinata = new pinataSDK({ pinataJWTKey: process.env.PINATA_JWT  });

function generateContentHash(content) {
    return crypto
        .createHash('sha256') // Algoritmayı seçiyoruz
        .update(content)      // Veriyi veriyoruz
        .digest('hex');       // Çıktı formatını (genelde hex kullanılır) belirliyoruz
}


async function  PinataIPFS(PostId){
   
    try {
        const post = await Post.findById(PostId);

        if (!post) throw new Error("Post bulunamadı");
        const hash = generateContentHash(post.title);
        //metadata
        const metadata = {
            name: post.body,
            description: "Bu blog yazısı bir NFT olarak mühürlenmiştir.",
            external_url: ``,
            attributes: [
                {
                    trait_type: "Content Hash",
                    value: hash
                },
                {
                    trait_type: "Creation Date",
                    value: post.createdAt
                }
            ]
        };

        // 2. Pinata'ya yükle
        const options = {
            pinataMetadata: {
                name: `${post.body}_Metadata.json`,
            },
            pinataOptions: {
                cidVersion: 0
            }
        };

        const result = await pinata.pinJSONToIPFS(metadata, options);
        
        
        await Post.findByIdAndUpdate(PostId, {
            nft: {
                isNFT: true,
                status: 'pending',
                ipfsHash: result.IpfsHash,
                pinataUrl: `https://gateway.pinata.cloud/ipfs/${result.IpfsHash}`
            },
            updatedAt: Date.now()
        });
        // Bu IpfsHash (CID), akıllı sözleşmeye verilecek olan adrestir.
        console.log("IPFS Yükleme Başarılı:", result.IpfsHash);
        return result.IpfsHash;

    } catch (error) {
        console.error("Pinata yükleme hatası:", error);
    }

}
module.exports = {PinataIPFS};