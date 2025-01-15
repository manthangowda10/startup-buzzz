const client = require('/home/manthan/Desktop/Buzzz/startup/server/db/index.js')


exports.viewAppointements = async(req,res) => {
    try {
        const result = await client.query('SELECT * FROM appointements');
        res.status(200).json({
            message:"Appointements retreived successfully",
            appointements: result.rows
        })
    } catch (error) {
        console.error('Error retreiving appointements',error.stack);
        res.status(500).json({message:"Error retreiving appointements",error:error.message})
    }
}