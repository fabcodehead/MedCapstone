import React,{useState,useEffect} from 'react'
import { nearHospitals} from "../CallingApi/patientapi";

function NearestHospitals({history}) {

    const [hospitals,setHospitals] = useState([]);

    const {lat,long} = history.location.state;

    useEffect( () => {

        nearHospitals(lat,long,2000).
        then(res => {setHospitals(res.resFound)}).
        catch(err  => {console.log(err)} )

    } , [] )

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
            <h1>Find Nearest Hospitals Here</h1>
            <button onClick = { () => {history.push("/patient/dashboard")}  } >Patient Dashboard </button>
            <br></br>
            <br></br>
            <h1>Hospitals in 2km Radius</h1>
            <br></br>
            <br></br>
            <br></br>
            <ol>
            {  hospitals.map( (item,id) => {
                 const a = getDistanceFromLatLonInKm(lat,long,item.location.lat,item.location.long)
                 return <> 
               <li> <span>{id +  1.}</span>  {item.Name} </li> 
               <li>{item.Specialisation}</li>
               <li>   {a.toFixed(3)}  { a > 1 ? "Km" : "meters" } away </li>
               <br></br>
               </>
            } )  }
            </ol>
      
         

        </div>
    )
}

export default NearestHospitals
