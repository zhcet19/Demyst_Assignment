import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
export default function ApplicationForm({formData,setformData,balancesheet,handlechange}) {
  const [accountingProvider, setAccountingProvider] = React.useState("");
  
  const navigate = useNavigate();
  const handleFormChange = (event) => {
    const name = event.target.name;
    const value = event.target.value
    setformData({...formData, [name]: value})
  };

  const handleChange = (event) => {
    setformData({...formData, "accountingProvider": event.target.value})
    setAccountingProvider(event.target.value);
  };

  const fetchBalanceSheet = async () => {
   

    try {
      const response = await axios.post('http://localhost:3001/app/request-balancesheet',{
          ...formData
      });
  
      handlechange(response.data);
     
      navigate("/balance-sheet")
    
      
    } catch (err) {
      console.log(err);
    } finally {
      
    }
  };
 

  const categories = [
    "Xero", "MYOB"
  ];
  return (
    <React.Fragment>
      <Paper elevation={3} sx={{ marginRight: "15%", marginLeft: "15%" }}>
        <Box sx={{ padding: 5 }}>
          <Typography variant="h6" gutterBottom sx={{ paddingBottom: 5 }}>
            Demyst
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={3}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  fontWeight: 700
                }}
              >
                Business Name
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={9}>
              <TextField
                onChange={handleFormChange}
                required
                id="businessName"
                name="businessName"
                label="Business Name"
                fullWidth
                size="small"
                autoComplete="off"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  fontWeight: 700
                }}
              >
                Establishment's Year
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={9}>
              <TextField
                onChange={handleFormChange}
                required
                id="yearofEstablishment"
                name="yearofEstablishment"
                label="Year of Establishment"
                fullWidth
                size="small"
                autoComplete="off"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  fontWeight: 700
                }}
              >
                Accouting
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth size="small">
                <InputLabel required id="demo-simple-select-label">Accounting Provider</InputLabel>
                <Select
                 
                  labelId="demo-simple-select-label"
                  id="accountingProvider"
                  value={accountingProvider}
                  label="Accounting Provider"
                  onChange={handleChange}
                >
                  {categories.map((item) => (
                    <MenuItem value={item}>{item}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={2}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  fontWeight: 700
                }}
              >
                LoanAmount
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
               onChange={handleFormChange}
                required
                id="loanAmount"
                name="loanAmount"
                label="Loan Amount"
                fullWidth
                size="small"
                autoComplete="off"
                variant="outlined"
              />
            </Grid>
           
            <Grid item xs={12} sm={6} />
            <Grid item xs={12} sm={5} />
            <Grid item xs={12} sm={4} sx={{ marginLeft:"40%" }}>
              <Button variant="contained" onClick={fetchBalanceSheet} >
                Get Balance Sheet
              </Button>
            </Grid>
            <Grid item xs={12} sm={5} />
          </Grid>
        </Box>
      </Paper>

    </React.Fragment>
  );
}
