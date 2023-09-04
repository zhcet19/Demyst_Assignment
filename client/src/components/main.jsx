import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';
import { Button, CircularProgress, Container, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";

const Main = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isClicked,setIsClicked]=useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    setIsLoading(true);
    setError(false);
    setIsClicked(true);

    try {
      const response = await axios.post('http://localhost:3001/app/start-application',{
          "applicationstatus":true
      });

      if(response.data.data==="Application Started")
      {
        navigate(`/application-form`)
      }
     
      
    } catch (err) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };
 
  return (
   <div id="body">
    <Container style={{ display: 'flex',flexDirection: 'column',alignItems: 'center'}}>
        <h1>
            Demyst
        </h1>
      <Button variant="contained" color="primary" onClick={fetchData} disabled={isLoading}>
        {isLoading ? <CircularProgress size={24} /> : 'Start Application'}
      </Button>
      {error&& (
        <Typography variant="body1" color="error">
          Error: Something went wrong
        </Typography>
      )}
      {isClicked&& (
      <Typography variant="body1" color="seagreen">Application Initiated</Typography>
      )}
    </Container>
    </div>
  );
};

export default Main;
