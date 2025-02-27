const Supplies = require("../models/supplies")

const getSupplies = async (req,res) => {
    try {
        const supplies = await Supplies.find()
        res.status(200).json(supplies);
    } catch (error) {
      res.status(500).json({ error: 'Server error while fetching Supplies' });
    }
    } 
    
    
    const addSupplies = async (req,res) => {
        try {
            const newSupplies = new Supplies(req.body);
            const savedSupplies = await newSupplies.save();
            res.status(201).json(savedSupplies);
          } catch (error) {
            res.status(500).json({ error: 'Server error while adding Supplies' });
          }
        }
    
        
    
        const editSupplies = async (req,res) => {
            try {
                const updatedSupplies = await Supplies.findByIdAndUpdate(req.params.id, req.body, { new: true });
                if (!updatedSupplies) return res.status(404).json({ error: 'Supplies not found' });
                res.status(200).json(updatedSupplies);
              } catch (error) {
                res.status(500).json({ error: 'Server error while updating Supplies' });
              }
                
            }
    
            
    
            const deleteSupplies = async (req,res) => {
                try {
                    const deletedSupplies = await Supplies.findByIdAndDelete(req.params.id);
                    if (!deletedSupplies) return res.status(404).json({ error: 'Supplies not found' });
                    res.status(200).json({ message: 'Supplies deleted successfully' });
                  } catch (error) {
                    res.status(500).json({ error: 'Server error while deleting Supplies' });
                  }
                    
                }
                
    
                module.exports = { getSupplies,addSupplies,editSupplies,deleteSupplies };