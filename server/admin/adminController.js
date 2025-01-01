exports.manageServices = (req,res)=> {
    res.status(200).json({message: "Admin logged in successfully"});
}

exports.viewAppointements = (req,res) => {
    res.status(200).json({message: "Welcome to the dashboard, you can view your appointements here"});
}