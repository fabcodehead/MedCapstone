import React,{useState,useEffect} from 'react'
import { allHospitals} from "../CallingApi/patientapi";

function NearestHospital({history}) {
    let near = [];
    let final
    let found;
    const [hospitals,setHospitals] = useState([]);
    const {lat,long} = history.location.state
    useEffect( () => {
        allHospitals().
        then(res => { setHospitals(res)   }).
        catch(err => {console.log(err)});
    },[] )
    console.log("Allhospitals",history)

    function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2-lat1);  // deg2rad below
        var dLon = deg2rad(lon2-lon1); 
        var a = 
          Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
          Math.sin(dLon/2) * Math.sin(dLon/2)
          ; 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c; // Distance in km
        return d;
      }
      
      function deg2rad(deg) {
        return deg * (Math.PI/180)
      }

   

    return (
      
        <div>
          
            <h1>View All Hospitals Here</h1>
            <button onClick = { () => {history.push("/patient/dashboard")}  } >Patient Dashboard </button>
            
             {hospitals.map( (item,id) => {
                 const a = getDistanceFromLatLonInKm(lat,long,item.location.lat,item.location.long)
               near.push(a.toFixed(3)) 
               if(id === hospitals.length - 1){
                final = "" +  Math.min(...near)
               let no = near.indexOf(final)
                document.getElementById("res").innerHTML = ` Your details have been sent to ${hospitals[no].Name} `
               }
             } )    }

             <h1 style = {{color : "black"}}  id = "res" >   </h1>
               {JSON.stringify(found)}
             
              <br></br>
             <br></br>
             <br></br>
         
        </div>
    )
    
}

export default NearestHospital
