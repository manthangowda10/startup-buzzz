const client = require('/home/manthan/Desktop/Buzzz/startup/server/db/index.js')


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
