

import { useState, useEffect, useRef } from "react"
import Modal from './Modal'
import Login from './Login'
import CreateAccount from './CreateAccount'
import "./Banner.css"
import QuickSearches from './QuickSearches'
import { getLoggedOut } from "./utilities"
import { useNavigate } from "react-router-dom"


const Banner = (props) => {

    const navigate = useNavigate()

    //useState =>locations
    const [locationsData, setLocationsData] = useState([])
    const mySavedRestaurants = useRef([])// way to save value,UI refresh can't happen
    const [suggestions, setSuggestions] = useState([])

    // get the logged in user from localstorage
    const activeUser = localStorage.getItem('loggedInUsername')

    //moved from the css to JS due to css issues
    const bannerStyle = {
        backgroundImage: 'url(/assets/Banner/Banner.png)'
    }

    //fetch the locations
    const getLocations = async () => {
        const res = await fetch(`http://localhost:8888/restaurants/locations`)
        const data = await res.json()
        const formattedLocationsData = data.map(i => `${i.city}-${i.address}`)
        setLocationsData(formattedLocationsData)
    }


    //only on the first nload
    useEffect(() => {
        getLocations()
    }, [])

    // implement : getRestaurantsBasedOnCityAndAddress(city,address)
    const getRestaurantsBasedOnCityAndAddress = async (city, address) => {
        //make a call to the api to find the restaurants with city and address
        const res = await fetch(`http://localhost:8888/restaurants?city=${city}&address=${address}`)
        const localRestaurants = await res.json()
        console.log(localRestaurants)
        // save these res info for suggestions
        mySavedRestaurants.current = localRestaurants
    }


    const updateLocation = ce => {       //ce =change event
        //console.log(ce.target.value)
        const newLocation = ce.target.value
        if (newLocation.indexOf('-') > -1) {
            //separate city and address
            //e.g: Pune - Chandni Chowk ===>[Pune ,Chandni Chowk]
            const city = newLocation.split('-')[0].trim() //trim to remove the white space
            const address = newLocation.split('-')[1].trim()
            //save these values in the local storage
            localStorage.setItem('currentcity', city)
            localStorage.setItem('currentaddress', address)
            // make a query to fetch the restaurants
            getRestaurantsBasedOnCityAndAddress(city, address)
        }
    }


    //  apply suggestions ==> filter some from full set of res(Ref)
    const applySuggestions = ce => {
        if (ce.target.value) {
            //few chars the person is typing
            const fewCharsFromRest = (ce.target.value).toLowerCase()
            //let the person atleast type 3 chars
            if (fewCharsFromRest.length > 2) {
                //this gives you the master set of the restaurants from useRef based on city & address
                const allRestaurants = mySavedRestaurants.current
                // filter the restaurants based on what user has typed
                const filteredResForSuggestion = allRestaurants.filter(i => i.name
                                                               .toLowerCase()
                                                               .indexOf(fewCharsFromRest) > -1)
                console.log(filteredResForSuggestion)
                //set my suggestions
                if (filteredResForSuggestion.length > 0) {
                    setSuggestions(filteredResForSuggestion)
                }
                else {
                    // if  we don,t have anything to found
                    setSuggestions([{
                        name: 'Not found!',
                        address: '',
                        thumbnail: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbrzDV2-qejjYuIc9o2pRL05AbcA4wrVSerg&usqp=CAU`
                    }])
                }
            }
            // if the person types less than three 3 chars
            if (fewCharsFromRest.length < 3) {
                setSuggestions([{
                    name: 'Not found!',
                    address: '',
                    thumbnail: `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbrzDV2-qejjYuIc9o2pRL05AbcA4wrVSerg&usqp=CAU`
                }])
            }
        }
    }




    return (

        <>
            <div className="container-fluid">
                {/* data lists stores the auto suggestion data */}
                <datalist id="locationsData">
                    {locationsData.map((i, index) => <option key={index}>{i}</option>)}
                </datalist>
                <datalist id="restaurantsData"></datalist>

                <div className="row banner" style={bannerStyle}>
                    {/* create acc and login */}
                    <div className="col-md-12"></div>
                    <div className="col-md-12 offset-md-9">
                     { activeUser
                         ? 
                        <>
                        <span className="text-light">Hello {activeUser},</span> &nbsp;
                        <button className="btn btn-outline-light" onClick={getLoggedOut}>Logout</button>
                        </>
                        :
                        <>
                        <button className="btn btn-outline-light"
                            data-bs-toggle="modal"
                            data-bs-target="#mdllogin">Login</button> &nbsp;
                        <button className="btn btn-outline-light"
                            data-bs-toggle="modal"
                            data-bs-target="#mdlcreateacc">
                            Create an account</button>
                        </>
                    }
                    </div>

                    {/* logo */}
                    <div className="col-md-12"></div>
                    <div className="col-md-12 offset-md-5">
                        <div className="circle">
                            <span className="logo">
                                e!
                            </span>
                        </div>
                    </div>



                    <div className="col-md-12 col-sm-12 offset-md-2">
                        <span className="bigtext">
                            Find the best restaurants, cafés, and bars
                        </span>
                    </div>


                    <div className="col-md-3 offset-md-2">
                        <input type="text"
                            id="tbLocations"
                            list="locationsData"
                            autoComplete="off"
                            onChange={updateLocation}
                            placeholder="Please type a location"
                            className="form-control find" />
                    </div>

                    <div className="col-md-4">
                        <input type="text"
                            id="tbRestaurants"
                            autoComplete="off"
                            onChange={applySuggestions}
                            placeholder="Search for restaurants"
                            className="form-control 
                               find"/>
                        <ul className="suggestionsBox">
                            {
                                suggestions.map(s => <li className="suggestionItem">
                                    <div className="suggestionImage">
                                        <img style={{ maxWidth: '40px', maxHeight: '40px', borderRadius: '50%' }}
                                            src={s.thumbnail}  alt="restaurantimage"/>
                                    </div>
                                    <div className="suggestionText">
                                        <div className="suggestionTextName">
                                            {s.name}
                                        </div>
                                        <div className="suggestionTextLocality">
                                            {s.address}
                                        </div>
                                    </div>
                                    <div className="orderButton text-danger" onClick={e => navigate(`/restaurants/${s._id}`)}>
                               {s.name==='Not found!'?'':'Order Now'}
                            </div>
                                </li>)
                            }

                            {/* li's will repeat */}
                        </ul>
                    </div>
                </div>
                

            </div>
            <QuickSearches />
            <Modal modalid="mdllogin" modaltitle="Login">
                    <Login/>
                </Modal>
                <Modal modalid="mdlcreateacc" modaltitle="Create Account">
                    <CreateAccount/>
                </Modal>

        </>
    )
}

export default Banner;