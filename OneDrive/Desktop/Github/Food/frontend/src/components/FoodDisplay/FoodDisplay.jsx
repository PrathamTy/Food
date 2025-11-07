import React,{useContext} from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../Context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'


const FoodDisplay = ({Category}) => {
    const {food_list} = useContext(StoreContext)
   return (
    <div>
      <div className="food-display" id="food-display">
        <h2>Top Dishes Near You</h2>
        <div className="food-display-list">
            { food_list.map((item,index)=>{
                {console.log("HERE" + item.name + " " + item.desc + " " + item.price)}
                if(Category === "All" || Category === item.category)
                return <FoodItem key={index} id={item._id} name={item.name} desc={item.desc} price={item.price} image={item.image}/>
            }) }
        </div>
      </div>
    </div> 
  )
}

export default FoodDisplay
