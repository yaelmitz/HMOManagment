import axios from "axios";
import { getMembers,addMember} from "../reducers/memberReducer";

export const getMembersMidd=({dispatch,getState})=>next=>action=>{
    if(action.type==='GET_MEMBERS'){
        console.log("wwwww")
        axios.get(`http://localhost:8585/api/hmoMember/getById/${action.payload}`).then((response)=>{
            console.log("response data is: "+response.data);
            dispatch(getMembers(response.data));
        })
        .catch((error)=>{
            console.log("the error is: "+error)
        });
    }
    // if(action.type==="GET_TRIPS_BYID"){
    //     axios.get(`http://localhost:8585/api/trips/getByDestination/${action.payload}`).then((response)=>{
    //         console.log("response data is: "+response.data);
    //         dispatch(getTripsById(response.data));
    //     })
    //     .catch((error)=>{
    //         console.log(error)
    //     });
    // }
    // if(action.type==='GET_TRIP_BYID'){
    //     axios.get(`http://localhost:8585/api/trips/getTripdto/${action.payload}`).then((response)=>{
    //         console.log("response data is: "+response.data);
    //         dispatch(getTripById(response.data));
    //     })
    //     .catch((error)=>{
    //         console.log("the error is: "+error)
    //     });
    // }
    // if(action.type==='ADD_BLOG'){
    //     console.log("i came to middleware")
    //     const {image,trip} = action.payload;
    //     const formData = new FormData();
    //     formData.append('image', image[0]);
    //     formData.append('image', image[1]);
    //     formData.append('trip', new Blob([JSON.stringify(trip)], { type: 'application/json' }));
    //     axios.post('http://localhost:8585/api/trips/uploadTrip2',formData).then((response)=>{
    //            console.log("trip is:"+response.data);
    //            dispatch(addTrip(response.data));
    //            dispatch(uploadTrip(true));
    //            dispatch(uploadTrip(false));
    //        })
    //        .catch((error)=>{
    //            console.log("the error is:"+ error)
    //        });
    //    }
  
    //  if(action.type==='UPDATE_LIKES'){
    //     const {id,trip}=action.payload;
    //     axios.put(`http://localhost:8585/api/trips/updateLike/${id}`,trip).then((response)=>{
    //         console.log("updated trip is",response.data)
    //         dispatch(updateLikes(response.data));
    //     })
    //     .catch((error)=>{
    //         console.log(error)
    //     })
    //  }
    //  if(action.type=='GET_BY_USER'){
    //     axios.get(`http://localhost:8585/api/trips/getByUser/${action.payload}`).then((response)=>{
    //         console.log(response.data)
    //         dispatch(getByUser(response.data))
    //     })
    //     .catch((error)=>{
    //         console.log(error)
    //     })
    // }
    return next(action);
}