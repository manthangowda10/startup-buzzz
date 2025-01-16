const client = require('/home/manthan/Desktop/Buzzz/startup/server/db/index.js')


const manageServices = async(req,res)=> {
    const { name, description } = req.body;
    try {
        const result = await client.query('INSERT INTO SERVICES(name,description) VALUES($1,$2) RETURNING *',[name,description]);
        res.status(201).json({
            message:"Service added successfully",
            service:result.rows[0]
        })
    } catch (error) {
        res.status(500).json({ message: "Error adding service", error: err.message });
    }
}

const modifyService = async(req,res) => {
    const id = req.params;

    const { name, description } = req.body;

    try {
        await client.query(
            'UPDATE services SET name = $1, description = $2 WHERE id = $3', [name,description,id]
        )
        res.status(200).json({message:'Service updated successfully'});
    } catch (error) {
        console.error('Error modifying stack:',error.stack);
        res.status(500).json({message:'Error modifying service',error:error.message})
    }
}

const deleteService = async(req,res) => {
    const id = req.params;

    try {
        await client.query('DELETE FROM services WHERE id = $1',[id]);
        res.status(200).json({message:'Service deleted successfully'});
    } catch (error) {
        console.error('Error deleting service',error.stack);
        res.status(500).json({message:'Error deleting service', error: error.message})
    }
}

module.exports = { manageServices,modifyService,deleteService }