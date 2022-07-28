
import { useEffect, useState } from "react";
import "./RestaurantMenu.css";



const RestaurantMenu =(props)=>{

  //save those menus
  const [menu, setMenu] = useState([])
  const [userSelection, setUserSelection] = useState([])
  const [id, setId] = useState("");
  const [amount, setAmount ] = useState(0);
  

  //method to upate the selection based on removal or addition of the dish
  const addToSelection =(id, amo)=>{
    //get the dish from the menu
    const selectedDish = (menu.filter(i=> i._id===id))[0]
      // make the copy the state'
      const copy_userSelection = [...userSelection]
      copy_userSelection.push(selectedDish)
      console.log(copy_userSelection)
      setAmount(amount + amo*100)
      console.log(amount)
      setUserSelection(copy_userSelection)

  }

  // pay now

 

  const recalculate =() =>{
    if(userSelection.length===0){
      //if nothing is bought
      return 0
    }else{
      const totalCost = userSelection.map(i=>i.price)
                                     .reduce((a,b)=>a+b,0)
      console.log(totalCost)
      return totalCost
    }
  }

  const subToSelection =(id, amo)=>{
    //make the copy of state
    const copy_state = [...userSelection]
    const allDishesExceptThisOne = copy_state.filter(i=>i._id!==id)
    setAmount(0)
    console.log(amount)
    setUserSelection(allDishesExceptThisOne)
  }

   const getMenu = async (name)=>{
     const url = `http://localhost:8888/restaurants/orders/${name}`
     const res = await fetch(url)
     const data = await res.json()
     setMenu(data)
   }

    useEffect(()=>{
      if('name' in props.details){
        getMenu(props.details.name)
      }
    },[props])
  
    

 
    useEffect(() => {
      loadScript("https://checkout.razorpay.com/v1/checkout.js")
    },[])


    const loadScript = (src) => {
      return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
          resolve(true);
        };
        script.onerror = () => {
          resolve(false);
        };
        document.body.appendChild(script);
      });
    };
  

    const onClickPay = () => {
      const fdata = { pay: amount };
  
      fetch("http://localhost:8888/pay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fdata),
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result.data.orderdetails.id);
         setId(result.data.orderdetails.id)
        });
  
      var options = {
        key: "rzp_test_ZZsDUkWzGgk7WZ", // Enter the Key ID generated from the Dashboard
        amount: amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Chintala Vani",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        handler: function (response) {
          alert(response.razorpay_payment_id);
          alert(response.razorpay_order_id);
          alert(response.razorpay_signature);
        },
        prefill: {
          name: "User",
          email: "user@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
  
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    };
    
     
    return(
        <div className="container">
    <div className="row">
      <div className="row">
        <div className="col-md-12">
          <ul>
          {menu.map(i=><li>
              <div className="row" key={i._id}>
                <div className="col-10">
                  <div className="text-success fs-6">{i.isveg?'Yes':'No'}</div>
                  <div className="cuisines">{i.dish}</div>
                  <div className="cuisines">&#8377; {i.price}</div>
                </div>
                <div className="col-2">
                  <button className="btn btn-light addButton" onClick={e=> addToSelection(i._id, i.price)}>Add</button>
                  <button className="btn btn-danger addButton" onClick={e=> subToSelection(i._id , i.price)}>Rem</button>
                </div>
              </div>
            </li>)}
          </ul>
        </div>
      </div>

      <div className="row">
        <div col="col-12">
          <hr/>
          <div className="mt-3 restName fs-4">
            Subtotal <span className="m-4">&#8377; {recalculate()}</span>
            <button className="btn btn-danger float-end" onClick={onClickPay}>Pay Now</button>
          </div>
        </div>
      </div>
    </div>
  </div>
    )
}

export default RestaurantMenu;