import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import axios from 'axios';
import { useNavigate } from "react-router-dom";


export default function BalanceSheet({balanceSheet,formData}) {

  const [finaloutput, setfinaloutput] = React.useState(null);
  const navigate = useNavigate();
  const NavigateToHome=()=>{
    navigate("/")
    
  }
    const fetchResult= async () => {
   

        try {
          const response = await axios.post('http://localhost:3001/app/submit-application',{
            "balanceSheetDetail":balanceSheet,
            "businessDetails":formData

          });
       
          setfinaloutput(response.data.data.preAssessmentValue)
          
      
        } catch (err) {
          console.log(err);
        } finally {
          
        }
      };
  return (
    <React.Fragment>
    <Paper elevation={3} sx={{ marginRight: "15%", marginLeft: "15%" }}>
    <TableContainer component={Paper}>
      <Table sx={{ Width: 400 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right" >Year</TableCell>
            <TableCell align="right">Month</TableCell>
            <TableCell align="right">profit Or Loss&nbsp;(Rs)</TableCell>
            <TableCell align="right">AssetsValue</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {balanceSheet.map((row) => (
            <TableRow
              key={row.assetsValue}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="right">{row.year}</TableCell>
              <TableCell align="right">{row.month}</TableCell>
              <TableCell align="right">{row.profitOrLoss}</TableCell>
              <TableCell align="right">{row.assetsValue}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  <Grid item xs={12} sm={4} sx={{ marginLeft:"30%" ,marginBottom:"20px",marginTop:"20px" }}>
              <Button variant="contained"  onClick={fetchResult}>
                Submit Application
    </Button>
    
    <Button variant="contained"  onClick={NavigateToHome} style={{marginLeft:"20px"}}>
                Recalculate Preassessement
    </Button>
   </Grid>
</Paper>

{ finaloutput!=null?
<React.Fragment>
<Paper elevation={3} sx={{ marginRight: "15%", marginLeft: "15%" , paddingTop:"5px" , paddingBottom:"5px", paddingLeft:"20px" }}>

  <p>Your Preassessement score comes out to be ${finaloutput}</p> 

</Paper>

</React.Fragment>:null}

    </React.Fragment>


  );
}
