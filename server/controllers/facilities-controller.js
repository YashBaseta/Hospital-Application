const Facilities = require("../models/facilities")

const getFacilities = async (req,res) => {
    try {
        const Facility = await Facilities.find()
        res.status(200).json(Facility);
    } catch (error) {
      res.status(500).json({ error: 'Server error while fetching Facilities' });
    }
    } 
    
    
    const addFacility = async (req,res) => {
        try {
            const newFacility = new Facilities(req.body);
            const savedFacility = await newFacility.save();
            res.status(201).json(savedFacility);
          } catch (error) {
            res.status(500).json({ error: 'Server error while adding Facility' });
          }
        }
    
        
    
        const editFacility = async (req,res) => {
            try {
                const updatedFacility = await Facilities.findByIdAndUpdate(req.params.id, req.body, { new: true });
                if (!updatedFacility) return res.status(404).json({ error: 'Facility not found' });
                res.status(200).json(updatedFacility);
              } catch (error) {
                res.status(500).json({ error: 'Server error while updating Facility' });
              }
                
            }
    
            
    
            const deleteFacility = async (req,res) => {
                try {
                    const deletedFacility = await Facilities.findByIdAndDelete(req.params.id);
                    if (!deletedFacility) return res.status(404).json({ error: 'Facility not found' });
                    res.status(200).json({ message: 'Facility deleted successfully' });
                  } catch (error) {
                    res.status(500).json({ error: 'Server error while deleting Facility' });
                  }
                    
                }
                
    
                module.exports = { getFacilities,addFacility,editFacility,deleteFacility };