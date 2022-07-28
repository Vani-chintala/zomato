
const FilterPagination = (props) => {


const handleChange = ce => {
  //get the pagenumber
  const pageNumber = ce.target.innerText
  //get the state from the filterpage
  const copy_state = {...props.filterData}
   if(pageNumber==='Next'){
     copy_state.pg = copy_state.pg+1
   }
   else if(pageNumber==='Previous'){
     copy_state.pg = copy_state.pg-1<1?0:copy_state.pg-1// just to make sure that pg doesn't go below 0
   }
   else{
     copy_state.pg = Number(pageNumber)
   }
 // set the final state
 props.setFilterData(copy_state)
}


  return (
    
        <div className="col-md-9 offset-md-6">

          <nav aria-label="Page navigation">
            <ul className="pagination">
              <li className="page-item"><a className="page-link" onClick={handleChange} >Previous</a></li>
              <li className="page-item"><a className="page-link" onClick={handleChange} >1</a></li>
              <li className="page-item"><a className="page-link" onClick={handleChange} >2</a></li>
              <li className="page-item"><a className="page-link" onClick={handleChange} >3</a></li>
              <li className="page-item"><a className="page-link" onClick={handleChange}>Next</a></li>
            </ul>
          </nav>

        </div>
      
    
  )

}

export default FilterPagination;