 function startApplication(req, res) {
	const { applicationstatus } = req.body;

	if (applicationstatus==true)
    {
      return res.status(200).json({
            data:"Application Started"
        });
    } 
	else{
        return res.status(400).json({
            data:"Application Not started"
        });

    }
    
}

module.exports = {
    startApplication
};