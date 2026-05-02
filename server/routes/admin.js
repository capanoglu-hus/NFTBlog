const express =  require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const NftFile = require('../helpers/routeHelpers')
const nftMint = require('../helpers/nftMint')
const adminLayout = '../views/layouts/admin'
const jwtsecret = process.env.jwtsecret
const authMiddleware = (req,res,next) => {
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({message:'Unauthorized'})
    }

    try {
        const decoded = jwt.verify(token,jwtsecret);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(401).json({message:'Unauthorized'})
    }
}


router.get('/admin' , async (req,res) => {
    
    try {
        const locals = {
        title:"admin",
        description: "Simple Blog created with node.js ,express and mongo db "
        }

        res.render('admin/index',{locals , layout: adminLayout})

    } catch (error) {
        console.log(error)
    }

})

router.post('/admin',async(req,res) => {
    try {
        const {username,password} = req.body;
        
        const user = await User.findOne({username});
        if(!user){
            return res.status(401).json({message:'Invalid credentials'})
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if(!isPasswordValid){
            return res.status(401).json({message:'Invalid credentials'})
        }

        const token = jwt.sign({userId: user._id} , jwtsecret)
        res.cookie('token', token, {httpOnly:true})
        res.redirect('/dashboard')
    } catch (error) {
        console.log(error);
    }
})

router.get('/dashboard',authMiddleware, async (req,res )=> {
    try {
        const locals = {
        title:"admin",
        description: "Simple Blog created with node.js ,express and mongo db "
        }
        const data = await Post.find();
        console.log(data);
        res.render('admin/dashboard' ,{
            locals,
            data,
            layout:adminLayout
        });
    } catch (error) {
         console.log(error);
    }
   
})

router.get('/add-post',authMiddleware, async(req,res) => {
     try {
        const locals = {
        title:"admin",
        description: "Simple Blog created with node.js ,express and mongo db "
        }
        
   
        res.render('admin/add-post' ,{
            locals,
            layout:adminLayout
        });
    } catch (error) {
         console.log(error);
    }
})

router.post('/add-post',authMiddleware, async(req,res) => {
     try {
      
        const newPost = new Post({
            title: req.body.title,
            body: req.body.body
        })
        await Post.create(newPost);
        res.redirect('/dashboard')
    } catch (error) {
         console.log(error);
    }
})

router.get('/edit-post/:id',authMiddleware, async(req,res) => {
     try {
        const locals = {
        title:"edit post",
        description: "Simple Blog created with node.js ,express and mongo db "
        }

        const data = await Post.findOne({_id:req.params.id})

        res.render('admin/edit-post',{
            locals,
            data,
            layout:adminLayout
        })
    } catch (error) {
         console.log(error);
    }
})

router.put('/edit-post/:id',authMiddleware, async(req,res) => {
     try {
        await Post.findByIdAndUpdate(req.params.id,{
            title: req.body.title,
            body: req.body.body,
            updatedAt: Date.now()
        })
        res.redirect(`/edit-post/${req.params.id}`)
    } catch (error) {
         console.log(error);
    }
})
router.delete('/delete-post/:id',authMiddleware, async(req,res) => {
     try {
        await Post.deleteOne( {_id : req.params.id})
        res.redirect('/dashboard')
    } catch (error) {
         console.log(error);
    }
})
router.put('/NFT-post/:id', authMiddleware, async (req, res) => {
    try {
        await NftFile.PinataIPFS(req.params.id);
        const data = await Post.findOne({_id:req.params.id})
        
        res.redirect('/dashboard');
    } catch (error) {
        console.log("NFT İşlem Hatası:", error);
        res.status(500).send("NFT Hazırlanırken bir hata oluştu.");
    }
});

router.put('/mint-nft/:id', authMiddleware, async (req, res) => {
    try {
        const PostId = req.params.id
        const data = await Post.findOne({_id:PostId})
        const hash = await nftMint.mintNFT(`ipfs://${data.nft.ipfsHash}`)
        
        await Post.findByIdAndUpdate(PostId, {
            nft: {
                status:'minted',
                ipfsHash: data.nft.ipfsHash,
                pinataUrl: data.nft.pinataUrl,
                nftAddress:  hash.contractAddress,
                ownerAddress: hash.from,
                tokenId: hash.transactionIndex,
                txHash: hash.transactionHash,
                mintedAt: Date.now()
            },
            updatedAt: Date.now()
        });
        
        
        res.redirect('/dashboard');
    } catch (error) {
        console.log("NFT İşlem Hatası:", error);
        res.status(500).send("NFT Hazırlanırken bir hata oluştu.");
    }
});



router.post('/register',async(req,res) => {
    try {
        const {username,password} = req.body;
        const hashedPassword = await bcrypt.hash(password,10);

       try {
         const user = await User.create({username, password:hashedPassword})
         res.status(201).json({message: 'User created' , user})
       } catch (error) {
         if(error.code === 11000){
            res.status(409).json({message:'User already in use'})
         }
         res.status(500).json({message:'Internal server error '})
       }

    } catch (error) {
        console.log(error);
    }
})

router.get('/logout', async (req,res) => {
    res.clearCookie('token');
    //res.json({message: ' logout successful'})
    res.redirect('/')
})

module.exports = router;