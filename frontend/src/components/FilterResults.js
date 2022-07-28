

import { useEffect,useState } from 'react';
import './FilterResults.css';
const FilterResults = (props) => {
  
  // save the restaurants in state
  const [restaurants,setRestaurants] = useState([])


  //getRestaurantsbasedOnQuery
  const getRestaurantsbasedOnQuery = async fo => {
    //console.log(fo) ==filterObj
    // tune the object
    const myFilterObj = {...fo}
    //delete the pg num  and order
    delete myFilterObj.pg
    delete myFilterObj.order
    //check if cuisines property is present in fo or not
   if('cuisines' in myFilterObj){
     myFilterObj.cuisines = {"$in": myFilterObj.cuisines}
   }
    console.log(myFilterObj)
    const res = await fetch(`http://localhost:8888/restaurants/filters/${fo.order}/${fo.pg}`, {
      method: 'POST',
      headers: {
        'Context-Type': 'application/json'
      },
      body: JSON.stringify(myFilterObj)
    })
    const restaurants =  await res.json()
    console.log(restaurants)
    //save the restaurants to state
    setRestaurants(restaurants)
  }

  // need to create a query based on the filter object
  useEffect(() => {
    getRestaurantsbasedOnQuery(props.filterData)
  }, [props.filterData])



  return (

    <div className="col-md-9">

      {restaurants.map(i =><div key = {i._id} className="card mb-3">
        <div className="row g-0">
          <div className="col-md-4">
            <img src={i.thumbnail} className="img-fluid rounded-start" alt="..." />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title heading">{i.name}</h5>
              <p className="card-text subheading"> {i.address}, {i.city} </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <hr />
            <p className="res-info">
              <span className="text-muted">Cuisine : {i.cuisines.join(',')}</span><br />
              <span className="text-muted"> Cost for two : INR {i.costfortwo.min} - {i.costfortwo.max}</span>
            </p>
          </div>
        </div>
      </div>)}

    </div>

  )
}

export default FilterResults;