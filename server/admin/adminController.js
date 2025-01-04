const client = require('../db/index');


exports.manageServices = async(req,res)=> {
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

exports.viewAppointements = async(req,res) => {
    try {
        const result = await client.query('SELECT * FROM APPOINTEMENTS');
        res.status(200).json({
            message:"Appointements retreived successfully",
            appointements: result.rows
        })
    } catch (error) {
        console.error('Error retreiving appointements',err.stack);
        res.status(500).json({message:"Error retreiving appointements",error:err.message})
    }
}