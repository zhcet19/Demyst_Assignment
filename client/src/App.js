import Main from "./components/main.jsx";
import ApplicationForm from "./components/applicationform.jsx"
import BalanceSheet from "./components/balancesheet.jsx";
import { Route, Routes } from "react-router-dom";
import * as React from "react";


const App = () => {
  const [balanceSheet, setbalanceSheet] = React.useState([]);
  const [formData,setformData]=React.useState({
    "businessName":"",
    "yearofEstablishment":2012,
    "accountingProvider":"",
    "loanAmount":0
  });
  const handlechange = (e) => {
    console.log(e);
    setbalanceSheet(e.data);
   };
  return (
    <div className="appContainer" >
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/application-form" element={<ApplicationForm formData={formData} setformData={setformData} balanceSheet={balanceSheet}  handlechange={handlechange} />} />
        <Route path="/balance-sheet" element={<BalanceSheet balanceSheet={balanceSheet} formData={formData} />}/>
      </Routes>
    </div>
  );
}

export default App;