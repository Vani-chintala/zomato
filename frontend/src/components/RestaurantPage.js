

import Carousel from "./Carousel"
import RestaurantInfo from "./RestaurantInfo"
import { useParams} from "react-router-dom"
import { useEffect,useState } from "react"
import RestaurantMenu from "./RestaurantMenu"
import Modal from "./Modal"

const RestaurantPage = () => {
   const {id} = useParams()//o/p= object with id
    const [restaurantDetails,setRestaurantDetails] = useState({})


   //api call
   const getRestaurantdata = async() => {
      const res = await fetch(`http://localhost:8888/restaurants/${id}`)
      const resData = await  res.json()
      //set restaurant details
      //console.log(resData[0])
      setRestaurantDetails(resData[0])
   }

   useEffect(()=>{
      getRestaurantdata()
   },[])


    return (
 <div className="container-fluid">
    <div className="row">
       <div className="col-md-12">
           <Carousel restaurantdet = {restaurantDetails}/>
        </div>
   </div>
    
    <div className="row">
              <div className="col-md-1 offset-md-10">
                  <button
                  data-bs-toggle="modal"
                  data-bs-target="#mdlMenu" className="btn btn-danger">Menu</button>
                  <Modal modalid="mdlMenu" modaltitle="Menu">
                    <RestaurantMenu details= {restaurantDetails}/>
                </Modal>
              </div>
    </div>
    <div>
    <div className="row">
        <div className="col-md-11 offset-md-1">
           <RestaurantInfo details= {restaurantDetails} />
        </div>
    </div>
 </div>
 </div>
    )
}
export default RestaurantPage