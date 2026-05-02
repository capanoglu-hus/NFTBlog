const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const PostSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    body:{
        type:String,
        required: true
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    updatedAt:{
        type:Date,
        default:Date.now
    },
    nft: {
        isNFT: { type: Boolean, default: false },
        status: { type: String, enum: ['none', 'pending', 'minted'], default: 'none' },
        pinataUrl: { type: String },
        ipfsHash: { type: String },
        nftAddress: { type: String },
        ownerAddress: { type: String },
        tokenId: { type: String },
        txHash: { type: String },
        mintedAt: { type: Date }
    },

})

// models/Post.js içinde en altta:
module.exports = mongoose.model('Post', PostSchema);