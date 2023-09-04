const sheet=require('../data/dummyBalanceSheet.js');


 async function requestBalanceSheet(req, res) {
	try {
		const { businessName, yearofEstablishment, loanAmount, accountingProvider } = req.body;
		//Sending balance sheet data to the client
		if (businessName && yearofEstablishment && loanAmount && accountingProvider) 
        {
            return res.status(200).json({
                data:sheet
            });
        }
		else
        {
            return res.status(400).json({
                message: "Data Not found"
            });
        }
         
	} catch (error) {
        return res.status(500).json({
            message: "Internal Server Error"
        });
		
	}
}

module.exports = {
    requestBalanceSheet
};