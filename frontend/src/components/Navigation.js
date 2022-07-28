

import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Banner from './Banner'
import FilterPage from './FilterPage'
import RestaurantPage from './RestaurantPage'



const Navigation = props => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Banner/>} />
                <Route path='/filters' element={<FilterPage/>} />
                <Route path='/restaurants/:id' element={<RestaurantPage/>} />
                
            </Routes>

        </BrowserRouter>
    )
}

export default Navigation



/*
localhost:3000/ => banner
localhost:3000/filters => filterpage
localhost:3000/restaurant => restaurantspage
*/


