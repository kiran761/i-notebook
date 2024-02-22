const express=require('express');
const router = express.Router();

router.get('/',(req,res)=>
{
   res.json(['hii'])
})

module.exports=router 