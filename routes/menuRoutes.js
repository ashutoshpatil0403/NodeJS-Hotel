const express = require('express');
const MenuItem=require('../models/MenuItem')
const router = express.Router();


router.post('/', async (req,res)=>{
    try {
      const data=req.body
      const newItem=new MenuItem(data)
      const response=await newItem.save();
      console.log('data saved')
      res.status(200).json(response)
    } 
    catch (error) {
      console.log(error)
      res.status(500).json({error:'Internal server error'})
    }
  
})
  
router.get('/',async(req,res)=>{
    try {
      const data=await MenuItem.find();
      console.log("data fetched...!")
      res.status(200).json(data)
    } catch (error) {
      console.log(error)
      res.status(500).json({error:'Internal server error'})
    }
})  

router.get('/:taste',async(req,res)=>{
    try {
        const EnteredTaste=req.params.taste
      const data=await MenuItem.find({taste:EnteredTaste});
      console.log("data fetched...!")
      res.status(200).json(data)
    } catch (error) {
      console.log(error)
      res.status(500).json({error:'Internal server error'})
    }
})  

router.put('/:id',async(req,res)=>{
  try {
    const user_entered_id= req.params.id;
    const updating_item_data= req.body;
    const response=await MenuItem.findByIdAndUpdate(user_entered_id,updating_item_data,{
        new:true,
        runValidators:true
    })

    if(!response){
        return res.status(404).json({error:"Item not found"})
    }

    console.log(response)
    res.status(200).json(response)
  } catch (error) {
    console.error('Error fetching persons:', error);
    res.status(500).json({ error: 'Internal server error' });

  }
})  

router.delete('/:id',async(req,res)=>{
  try {
      const entered_id=req.params.id
      const response=await MenuItem.findByIdAndDelete(entered_id)

      if(!response){
          return res.status(404).json({error:"Person not found"})
      }
      console.log("Item deleted from database")
      res.status(200).json({message:"Item deleted successfully...!"})

  } catch (error) {
       console.error('Error fetching persons:', error);
  res.status(500).json({ error: 'Internal server error' });
  }
})

module.exports=router