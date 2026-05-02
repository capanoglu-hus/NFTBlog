const express =  require('express');
const router = express.Router();
const Post = require('../models/Post');

router.get('' , async (req,res) => {
    
    try {
        const locals = {
        title:"Nodejs Blog",
        description: "Simple Blog created with node.js ,express and mongo db "
        }
        let perPage = 2;
        let page = req.query.page || 1;

        const data = await Post.aggregate([{$sort:{createdAt : -1}}])
        .skip(perPage * page - perPage)
        .limit(perPage)
        .exec();

        const count = await Post.countDocuments({});
        const nextPage = parseInt(page) + 1;

        const hasNextpage = nextPage <= Math.ceil(count/perPage);

        res.render('index', {locals,
            data,
            current:page, 
            nextPage:hasNextpage ? nextPage : null,
        })

    } catch (error) {
        console.log(error)
    }

})

router.get('/post/:id' , async (req,res) => {
    
    try {
        
        let slug = req.params.id;
        console.log(`${slug} id !!!!!!`)
        const data = await Post.findById(slug);
        const locals = {
        title:data.title,
        description: "Simple Blog created with node.js ,express and mongo db "
        }
        
        res.render('post' , {locals, data})
    }catch(error){
        console.log(error)
    }
})

router.post('/search' , async (req,res) => {
    
    try {
         const locals = {
        title:"Search",
        description: "Simple Blog created with node.js ,express and mongo db "
        }
        let searchTerm = req.body.searchTerm;
        console.log(searchTerm);
        const searchNoSpecial = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

        const data = await Post.find({
            $or:[
                {title:{$regex:new RegExp(searchNoSpecial,'i')}},
                {body:{$regex:new RegExp(searchNoSpecial,'i')}}
            ]
        })

        res.render("search",{
            data,
            locals
        })
    }catch(error){
        console.log(error)
    }
})


// function insertPostData () {
//     Post.insertMany([
//         {
//             title: "Web3 ve Geleceğin İnterneti",
//             body: "Bu yazıda blokzincir teknolojisinin web üzerindeki etkilerini inceleyeceğiz...",
//             NFT alanlarını başlangıçta bu şekilde gönderebilirsin
//             nft: {
//                 isNFT: false,
//                 status: 'none',
//                 pinataUrl: null,
//                 ipfsHash: null,
//                 tokenId: null,
//                 txHash: null
//             }
//     },
//       {
//             title: "Web3 ve blog ",
//             body: "Bu yazıda Web3 ve blog teknolojisinin web üzerindeki etkilerini inceleyeceğiz...",
//             NFT alanlarını başlangıçta bu şekilde gönderebilirsin
//             nft: {
//                 isNFT: false,
//                 status: 'none',
//                 pinataUrl: null,
//                 ipfsHash: null,
//                 tokenId: null,
//                 txHash: null
//             }
//     },
//      {
//             title: "Web3 ",
//             body: "Bu yazıda Web3 teknolojisinin web üzerindeki etkilerini inceleyeceğiz...",
//             NFT alanlarını başlangıçta bu şekilde gönderebilirsin
//             nft: {
//                 isNFT: false,
//                 status: 'none',
//                 pinataUrl: null,
//                 ipfsHash: null,
//                 tokenId: null,
//                 txHash: null
//             }
//     },
//     ])
// }
// insertPostData();

router.get('/about' , (req,res) => {
   res.render('about')
})

module.exports = router;