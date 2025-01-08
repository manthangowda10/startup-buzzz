const db = require('./db');

const bookAppointement = async(req, res) => {
    const { user_id, service_id, appointement_date } = req.body;

    const serviceCheck = await db.query('SELECT * FROM services WHERE id = $1',[service_id]);
    if(serviceCheck.rowCount === 0){
        return res.status(400).json({message:'Service not found'});
    }

    const timeCheck = await db.query('SELECT * FROM appointements WHERE appointement_date = $1');
    if( timeCheck.rowCount > 0 ){
        return res.status(400).json({message:'Appointement time is already booked'});
    }

    const result = await db.query(
    'INSERT INTO appointements (user_id,service_id, appointement_date) VALUES ($1,$2,$3) RETURNING *',
    [user_id,service_id,appointement_date]
    );

    return res.status(200).json({
    message:'Appointement booked successfully',
    appointement: result.rows[0]
    })

};

const modifyAppointement = async (req,res) => {
    const {appointementId} = req.params;
    const { service_id, appointement_date } = req.body;

    const appointement = await db.query('SELECT * FROM appointement WHERE id = $1',[appointementId])

    if(appointement.rowCount === 0){
        return res.status(400).json({message:'Appointement not found'})
    }

    const serviceCheck = await db.query('SELECT * FROM services WHERE id = $1',[service_id]);
    if (serviceCheck.rowCount === 0)
        {
            return res.status(400).json({message:'Service not found'});
        }

        const updatedAppointement = await db.query(
            'UPDATE appointements SET service_id = $1, appointement_date = $2 WHERE id = $3 RETURNING *',
            [service_id,appointement_date,appointementId ]
        )
        return res.status(200).json({
            message:'Appointement modified successfully',
            appointement: updatedAppointement.rows[0]
        })
}

const cancelAppointement = async(req, res) => {
    const { appointement_id } = req.params;

    const appointement = await db.query('SELECT * FROM appointements where id = $1',[appointement_id]);
    if(appointement.rowCount === 0){
        return res.status(404).json({message:'Appointement not found'});
    }
    await db.query('DELETE FROM appointements WHERE id = $1',[appointement_id]);
    return res.status(200).json({message:'Appointement cancelled successfully'})
}

module.exports = {bookAppointement,modifyAppointement,cancelAppointement}



