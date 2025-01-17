const client = require('/home/manthan/Desktop/Buzzz/startup/server/db/index.js')
const Joi = require('joi');


const manageServices = async(req,res)=> {

    const schema = Joi.object({
        name : Joi.string().min(4).required(),
        description: Joi.string().min(4).required()
    })
    const {error} = schema.validate(req.body)
    if(error){
        return res.status(400).json({message:error.details[0].message});
    }
    const { name, description } = req.body;
    try {
        const result = await client.query('INSERT INTO SERVICES(name,description) VALUES($1,$2) RETURNING *',[name,description]);
        res.status(201).json({
            message:"Service added successfully",
            service:result.rows[0]
        })
    } catch (error) {
        res.status(500).json({ message: "Error adding service", error: error.message });
    }
}

const modifyService = async(req,res) => {
    const {id} = req.params;

    const schema = Joi.object({
        name : Joi.string().min(4).required(),
        description: Joi.string().min(4).required()
    })
    const {error} = schema.validate(req.body)
    if(error){
        return res.status(400).json({message:error.details[0].message});
    }

    if( !id || isNaN(Number(id))){
        return res.status(400).json({message:'Invalid service id'});
    }

    const { name, description } = req.body;

    try {
        const result = await client.query(
            'UPDATE services SET name = $1, description = $2 WHERE id = $3 RETURNING *', [name,description,id]
        )

        if(result.rowCount === 0){
            return res.status(404).json({message: 'Service not found'});
        }

        res.status(200).json({
            message:'Service updated successfully',
            service : result.rows[0]
        });
    } catch (error) {
        console.error('Error modifying stack:',error.stack);
        res.status(500).json({message:'Error modifying service',error:error.message})
    }
}

const deleteService = async(req,res) => {
    const {id} = req.params;

    const schema = Joi.object({
        id: Joi.number().integer().positive().required()
    })
    const { error } = schema.validate({ id: Number(id)});
    if(error){
        return res.status(400).json({message: error.details[0].message})
    }

    

    try {
       const result = await client.query('DELETE FROM services WHERE id = $1',[id]);

       if(result.rowCount === 0){
        return res.status(404).json({message: 'Service not found'});
       }

        res.status(200).json({message:'Service deleted successfully'});
    } catch (error) {
        console.error('Error deleting service',error.stack);
        res.status(500).json({message:'Error deleting service', error: error.message})
    }
}

module.exports = { manageServices,modifyService,deleteService }