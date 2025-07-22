import React from "react";

import { Grid } from '@mui/material';
import TopEmploeey from '../components/topEmploeey';
import { DeliverCancelOrders } from '../components/DeliverCancelOrders';
import { TopSoldProduct } from '../components/topSoldProduct';
import styled from '@emotion/styled';
import LandingPage from "./landingPage";

const Item = styled('div')({
padding: 5,
borderRadius: 15,
backgroundColor:"lightGray",
borderColor: "white",
borderWidth: "0.2",

});

const Dashboard: React.FC = () => {

    return (<div>
<LandingPage></LandingPage>
        <Grid container rowSpacing={1.5} columnSpacing={1.5}>
     
     
         <Grid item xs={6}> <Item>
          <TopSoldProduct></TopSoldProduct></Item>
     
     
     
            </Grid>

            <Grid item xs={6} > <Item>
      <DeliverCancelOrders></DeliverCancelOrders></Item>
      
           
            </Grid>
                <Grid item xs={6}><Item>
                <TopEmploeey></TopEmploeey></Item>
               
            </Grid>
     
            <Grid item xs={6} >
            <Item>
     
             <h5>+ add new dashboard</h5></Item>
                
            </Grid>
          </Grid>
          </div>
       );
};
 export default Dashboard;

// import React from "react";

// const Dashboard: React.FC = () => {

//     return (
// <div>
//         <p>dashboard here</p>
//         <h1>gtttttttttttttttt</h1>
// </div>
//     );
// };
// export default Dashboard;
