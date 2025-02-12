const client = require('./index');

const createUser = async(name,email,password,username,phone) => {
    const query = 'INSERT INTO users(name,email,password,username,phone) VALUES($1,$2,$3,$4,$5) RETURNING *';
    const values = [name,email,password,username,phone];
    try{
        const res = await client.query(query, values);
        return res.rows[0]; //Return the created user
    } catch(err) {
        console.error('Error executing query', err.stack);
        throw err;
    }
    
}

const findUserByEmailOrPhone = async(username, email) => {
    const query = 'SELECT * FROM users WHERE username = $1 OR email = $2';
    const values = [username,email];

    try{
        const res = await client.query(query, values);
        return res.rows[0]; //Returning the user if found
    } catch(err){
        console.error('Error: couldnt find anyone by the username or email', err.stack);
        throw err
    }
}

module.exports = {
    createUser,findUserByEmailOrPhone
}