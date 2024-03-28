// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { axisClasses } from '@mui/x-charts/ChartsAxis';
// import { BarChart } from '@mui/x-charts/BarChart';

// // export default function CoronaDet(){
// //     const [cnt,setCnt]=useState(0)
// //     const[arr,setArr]=useState([])
// //     const s=','
// //     useEffect(()=>{
// //         axios.get('http://localhost:8585/api/coronaDetails/unvaccinated-count')
// //         .then((response)=>{
// //             setCnt(response.data)
// //         })
// // .catch((error)=>{
// //     console.log(error)
// // })
   
// //     axios.get('http://localhost:8585/api/coronaDetails/active-patients-last-month')
// //     .then((response)=>{
// //      setArr(response.data)
// //     })
// //     .catch((error)=>{
// //         console.log(error)
// //     })
// // },[])
// //     return(
// //         <>
// //     <h2>amount of unvaccinated members:  {cnt}</h2>
// //     {arr.map((x,index)=>(
// //         <p>{index+1} : {x}</p>
// //     ))}
// //         </>
// //     )
// // }

// const otherSetting = {
//     height: 300,
//     yAxis: [{ label: 'Number of Sick People' }], // Adjust the yAxis label
//     grid: { horizontal: true },
//     sx: {
//       [`& .${axisClasses.left} .${axisClasses.label}`]: {
//         transform: 'translateX(-10px)',
//       },
//     },
//   };
  
//   // Example array of sick people data
// //   const sickPeopleData = [10, 20, 15, 30, 25, 35, 40]; // Example array of sick people data
  
//   // Prepare the dataset array using the sick people data
  
  
 
  
//   export default function SickPeopleBarChart() {
//     const [array,setArray]=useState([])
//     const [cnt,setCnt]=useState(0)
    
//         useEffect(()=>{
//         axios.get('http://localhost:8585/api/coronaDetails/unvaccinated-count')
//         .then((response)=>{
//             setCnt(response.data)
//         })
// .catch((error)=>{
//     console.log(error)
// })
   
//     axios.get('http://localhost:8585/api/coronaDetails/active-patients-last-month')
//     .then((response)=>{
//      setArray(response.data)
//      {const dataset = array.map((numSick, index) => ({
//         sickPeople: numSick,
//         day: `Day ${index + 1}`, // Assuming day numbering starts from 1
//       }));
//       const valueFormatter = (value) => `${value}`;}
//     })
//     .catch((error)=>{
//         console.log(error)
//     })
// },[])
//     return (
//       <BarChart
//         dataset={dataset}
//         xAxis={[
//           {
//             scaleType: 'band',
//             dataKey: 'day', // Use 'day' as the dataKey for x-axis
//           },
//         ]}
//         series={[{ dataKey: 'sickPeople', label: 'Number of Sick People', valueFormatter }]}
//         {...otherSetting}
//       />
//     );
//   }



import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import axios from 'axios';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { BarChart } from '@mui/x-charts/BarChart';

const otherSetting = {
  height: 300,
  yAxis: [{ label: 'Number of Sick People' }], // Adjust the yAxis label
  grid: { horizontal: true },
  sx: {
    [`& .${axisClasses.left} .${axisClasses.label}`]: {
      transform: 'translateX(-10px)',
    },
  },
};

const valueFormatter = (value) => `${value}`;

const CoronaDet = () => {
  const [sickPeopleData, setSickPeopleData] = useState([]);
  const [num,setNum]=useState(0)
  useEffect(() => {
    axios.get('http://localhost:8585/api/coronaDetails/unvaccinated-count').then((response)=>{
        setNum(response.data)
    }).catch((error)=>{
        console.log(error)
    })
    async function fetchData() {
      try {
        const response = await Axios.get('http://localhost:8585/api/coronaDetails/active-patients-last-month');
        // Assuming the response data is an array of numbers representing sick people for each day
        setSickPeopleData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);

  // Render the BarChart component only when data is available
  return (
    <>
    <br></br><br></br><br></br>
      {sickPeopleData.length > 0 && (
        <BarChart
          dataset={sickPeopleData.map((numSick, index) => ({
            sickPeople: numSick,
            day: `Day ${index + 1}`, // Assuming day numbering starts from 1
          }))}
          xAxis={[
            {
              scaleType: 'band',
              dataKey: 'day', // Use 'day' as the dataKey for x-axis
            },
          ]}
          series={[{ dataKey: 'sickPeople', label: 'Number of Sick People', valueFormatter }]}
          {...otherSetting}
        />
      )}
      <h3>number of unvaccinated people in our HMO:{num}</h3>
    </>
  );
};

export default CoronaDet;

