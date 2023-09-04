

function preAssessmentCalculation (balanceSheetDetail, loanAmount){
	//Calculating Total Profit and Total Assets
	const totalProfit = balanceSheetDetail.reduce((sum, val) => sum + val.profitOrLoss, 0);
	const totalAssets = balanceSheetDetail.reduce((sum, val) => sum + val.assetsValue, 0);

	//Calculating averageProfit and averageAssets
	const averageProfit = totalProfit / balanceSheetDetail.length;
	const averageAssets = totalAssets / balanceSheetDetail.length;

	
	let preAssessment = 0;

	if (averageProfit > 0 && loanAmount > 0)
    {
	     //If there is profile then pre-assessment value will be 60
        preAssessment = 60;
    }
    else if (averageAssets > loanAmount && loanAmount > 0)
    {
        // if averageAssets exceeds loanAmount pre-assessment value would be 100
        preAssessment = 100;
    }
    else
    {
        //Default value to be used 20
        preAssessment = 20;
    }
    
	return preAssessment;
}

function profitLossSummary(balanceSheetDetail) {
	return balanceSheetDetail.map((val) => ({ year: val.year, profitOrLoss: val.profitOrLoss }));
}

 async function submitApplication(req, res) {
	try {
		const { businessDetails, balanceSheetDetail } = req.body;

		if (businessDetails && balanceSheetDetail) {
			//Calculating value of Pre-assessment
		
			const preAssessmentValue = preAssessmentCalculation(balanceSheetDetail,parseInt(businessDetails.loanAmount));

			//Calculating profitLoss summary
			const summary = profitLossSummary(balanceSheetDetail);

			
			//Sending business details and pre-assessment value to the decision engine
	
			const decisionEngineResponse = {
				preAssessmentValue,
				summary,
			};
            return res.status(200).json({
                data:decisionEngineResponse
            });
		} 
        else
        {
            return res.status(400).json({
                message:"Request Data is incomplete"
            });
        }

	} catch (error) {
		console.log(error);
        return res.status(500).json({
            message: error
        });
	
	}
}


module.exports = {
    submitApplication
};