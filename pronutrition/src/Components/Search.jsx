import React from "react";
import "./Search.css";
import food from "./foodData.json"
import FoodBox from './FoodBox'
class Search extends React.Component{

  constructor(){
      super();
      this.state = {
        foodList:[...food],
        searchedFood:""
      };

  }

  updateSearchedFoodHandler = event =>{
      this.setState({ searchedFood: event.target.value });
  }

  searchFood=(foodList)=>{
    
    let dataSearched=[]
    if(!(this.state.searchedFood === "")){
        const fooddata = this.state.foodList;
        console.log(foodList)
        // eslint-disable-next-line array-callback-return
        dataSearched = fooddata.filter(food =>{
            if(food.name.toLowerCase().includes(this.state.searchedFood.toLowerCase()))
                return food;
        })
    }
    else{
        dataSearched = this.state.foodList;
    }
    return (<FoodBox foodListSearched={dataSearched}></FoodBox>);
  }
  

  render(){
     
      return (
        <div className="Searchbar">
          <div className="search-input">
            <label>Search</label>
            <input type="text" value={this.state.searchedFood} onChange={this.updateSearchedFoodHandler}></input>       
          </div>
          <div className="search-output">  
            {this.searchFood(this.state.foodList)}
          </div>
        </div>
      );
  }
}
export default Search;