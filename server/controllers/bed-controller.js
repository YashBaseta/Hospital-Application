const Bed = require("../models/bed")

const getBeds = async (req,res) => {
    try {
        const beds = await Bed.find()
        res.status(200).json(beds);
    } catch (error) {
      res.status(500).json({ error: 'Server error while fetching Beds' });
    }
    } 
    
    
    const addBed = async (req,res) => {
        try {
            const newBed = new Bed(req.body);
            const savedBed = await newBed.save();
            res.status(201).json(savedBed);
          } catch (error) {
            res.status(500).json({ error: 'Server error while adding Bed' });
          }
        }
    
        
    
        const editBed = async (req,res) => {
            try {
                const updatedBed = await Bed.findByIdAndUpdate(req.params.id, req.body, { new: true });
                if (!updatedBed) return res.status(404).json({ error: 'Bed not found' });
                res.status(200).json(updatedBed);
              } catch (error) {
                res.status(500).json({ error: 'Server error while updating Bed' });
              }
                
            }
    
            
    
            const deleteBed = async (req,res) => {
                try {
                    const deletedBed = await Bed.findByIdAndDelete(req.params.id);
                    if (!deletedBed) return res.status(404).json({ error: 'Bed not found' });
                    res.status(200).json({ message: 'Bed deleted successfully' });
                  } catch (error) {
                    res.status(500).json({ error: 'Server error while deleting Bed' });
                  }
                    
                }
                
    
                module.exports = { getBeds,addBed,editBed,deleteBed };