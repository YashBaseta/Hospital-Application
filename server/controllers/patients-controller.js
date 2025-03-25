const Patient = require("../models/patients")

const getPatients = async (req,res) => {
try {
    const patients = await Patient.find()
    res.status(200).json(patients);
} catch (error) {
  res.status(500).json({ error: 'Server error while fetching patients' });
}
} 


const addPatient = async (req,res) => {
  try {
      const newPatient = new Patient(req.body);
      const savedPatient = await newPatient.save();
      res.status(201).json(savedPatient);
    } catch (error) {
      res.status(500).json({ error: 'Server error while adding Patient' });
    }
  }

    

    const editPatient = async (req,res) => {
        try {
            const updatedPatient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedPatient) return res.status(404).json({ error: 'Patient not found' });
            res.status(200).json(updatedPatient);
          } catch (error) {
            res.status(500).json({ error: 'Server error while updating patient' });
          }
            
        }

        

        const deletePatient = async (req,res) => {
            try {
                const deletedPatient = await Patient.findByIdAndDelete(req.params.id);
                if (!deletedPatient) return res.status(404).json({ error: 'Patient not found' });
                res.status(200).json({ message: 'Patient deleted successfully' });
              } catch (error) {
                res.status(500).json({ error: 'Server error while deleting patient' });
              }
                
            }
            

            module.exports = { getPatients,addPatient,editPatient,deletePatient };