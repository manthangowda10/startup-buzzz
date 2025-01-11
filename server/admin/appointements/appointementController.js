
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