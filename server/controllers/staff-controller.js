const Staff = require("../models/staff")

const getStaffs = async (req,res) => {
    try {
        const staffs = await Staff.find()
        res.status(200).json(staffs);
    } catch (error) {
      res.status(500).json({ error: 'Server error while fetching Staffs' });
    }
    } 
    
    
    const addStaff = async (req,res) => {
        try {
            const newStaff = new Staff(req.body);
            const savedStaff = await newStaff.save();
            res.status(201).json(savedStaff);
          } catch (error) {
            res.status(500).json({ error: 'Server error while adding Staff' });
          }
        }
    
        
    
        const editStaff = async (req,res) => {
            try {
                const updatedStaff = await Staff.findByIdAndUpdate(req.params.id, req.body, { new: true });
                if (!updatedStaff) return res.status(404).json({ error: 'Staff not found' });
                res.status(200).json(updatedStaff);
              } catch (error) {
                res.status(500).json({ error: 'Server error while updating Staff' });
              }
                
            }
    
            
    
            const deleteStaff = async (req,res) => {
                try {
                    const deletedStaff = await Staff.findByIdAndDelete(req.params.id);
                    if (!deletedStaff) return res.status(404).json({ error: 'Staff not found' });
                    res.status(200).json({ message: 'Staff deleted successfully' });
                  } catch (error) {
                    res.status(500).json({ error: 'Server error while deleting Staff' });
                  }
                    
                }
                
    
                module.exports = { getStaffs,addStaff,editStaff,deleteStaff };