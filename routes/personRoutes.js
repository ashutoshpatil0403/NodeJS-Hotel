const express = require('express');
const Person=require('../models/Person');
const { json } = require('body-parser');
const router = express.Router();

router.post('/', async (req,res)=>{
    try {
      const data=req.body
      const newPerson=new Person(data)
      const response=await newPerson.save();
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
      const data=await Person.find();
      console.log("data fetched...!")
      res.status(200).json(data)
    } catch (error) {
      console.log(error)
      res.status(500).json({error:'Internal server error'})
    }
  })

router.get('/:work', async (req, res) => {
    try {
        const workType = req.params.work
        const persons = await Person.find({ work: workType });
        res.json(persons);
    } 
    catch (error) {
        console.error('Error fetching persons:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
  })

router.put('/:id',async(req,res)=>{
  try {
    const user_entered_id= req.params.id;
    const updating_user_data= req.body;
    const response=await Person.findByIdAndUpdate(user_entered_id,updating_user_data,{
        new:true,
        runValidators:true
    })

    if(!response){
        return res.status(404).json({error:"Person not found"})
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
        const response=await Person.findByIdAndDelete(entered_id)

        if(!response){
            return res.status(404).json({error:"Person not found"})
        }
        console.log("Person deleted from database")
        res.status(200).json({message:"Person deleted successfully...!"})

    } catch (error) {
         console.error('Error fetching persons:', error);
    res.status(500).json({ error: 'Internal server error' });
    }
})

module.exports=router;  