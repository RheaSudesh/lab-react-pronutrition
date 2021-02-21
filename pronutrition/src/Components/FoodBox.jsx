import React, { Component } from 'react'
import ReactDOM from 'react-dom'; 
import dataAboutFood from './foodData.json'
import './FoodBox.css'


export default class FoodBox extends Component {
    constructor(props) {
      super(props);
      this.caloriesCount=parseInt(0);
      this.mainList=[];
    }

    createMainList= (foodName,foodCal,foodQty) => {
      this.mainList.push({
        name:foodName,
        cal:foodCal*foodQty,
        quantity:foodQty
      })
    }

    removeFoodFromTodaysList= (event) =>{
      console.log("delete")
      var tempList=[];
      this.caloriesCount=parseInt(0);
      for(let i=0;i<this.mainList.length;i++)
      {
        if(event.target.value!==this.mainList[i].name)
        {
          tempList.push(this.mainList[i]);
          this.caloriesCount+=this.mainList[i].cal;
        }
      }
      this.mainList=tempList;
      this.renderSideList()
    }


    addToListHandler = (event) =>{
      var foodName=event.target.value;         
      const list=dataAboutFood;
      
      for(let i=0;i<list.length;i++)
      {
          if(list[i].name===foodName)
          {
              this.caloriesCount=this.caloriesCount+list[i].cal; //total calories eaten
              var nameFoundInMainList=0
              for(let i=0;i<this.mainList.length;i++)
              {
                  if(this.mainList[i].name===foodName)
                  {
                    nameFoundInMainList=1;
                    this.mainList[i].quantity+=1;
                    break;
                  }
              }
              if(nameFoundInMainList===0)
              {
                this.createMainList(foodName,list[i].cal,1);
              }
              break;
          }
      }
      this.renderSideList()
    }

    renderSideList = () => {
      const MapOfList =this.mainList.map((item)=>
      {
        return <li key={item.name}>{item.name} x {item.quantity} = {item.cal}
                    <button value={item.name} onClick={this.removeFoodFromTodaysList} className="cancel-food">x</button></li>
      })

      ReactDOM.render(<><ul className="listitem">{MapOfList}</ul><br></br></>,document.getElementById("list"))
      ReactDOM.render(<p className="todayHeader">Today's Food : {this.caloriesCount} Calories</p>,document.getElementById("todayHeader"))
    }

    
    renderfoodList = ()=> { 
      const data = this.props.foodListSearched;
      const mapRow = data.map( food => ( 
        < React.Fragment key={food.name} className="mainFrame">
          <div className='food-list' >
            <div className="food-image">
              <img src={food.image} alt={food.image} />
            </div>
            <div className="food-name">
                <strong>{food.name} </strong>
                <small>{food.cal}  </small>
            </div>
            <div className="add-food">
                <input className="input" type="number" value="1"/>
                <button className="plus-food" value={food.name} onClick={this.addToListHandler}>
                  +
                </button>
            </div>
         </div>
        </React.Fragment> 
      ));
      return mapRow;
    }

    render(){
      return(
      <>
      <div className="list-and-todaysFood">
        <div className="left-container">
          <div className="box">
              {this.renderfoodList()}
          </div>
        </div>
        <div className="right-container">
            <p id="todayHeader">Today's Food : {this.caloriesCount} Calories</p>
            <div id="list"></div>
        </div>
      </div>

      </>
      );
    }
}



