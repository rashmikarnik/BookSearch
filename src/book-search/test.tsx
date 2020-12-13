import { setMaxListeners } from "process";
import React, { useEffect, useState, useContext } from "react";
import { setCommentRange } from "typescript";

const mainList = [
  {
    title: "a",
    name: "Robin",
  },
  {
    title: "b",
    name: "Dennis",
  },
];

const ParentModal = () => {
  const [list, setList] = useState([]);
  const [count, setcount] = useState(0);
  const [disabled, setDisabled]= useState(-1);


  const handleAdd = (el: any) => {
    //let result = checkDuplicate(el)
    //alert ("result is " + result);
    
    // check for duplicate if the cart is non-empty
    if (list.length > 0){
        list.forEach(ele => {
        if (ele === el){
            alert("The element \"" + el + "\" you are trying to add already exists in cart");
        }
        else{
            const newList = list.concat(el);
            setList(newList);
            setcount(count + 1);
        }

    });
    }  // end if
    else{
        // cart is empty. Add to cart
        const newList = list.concat(el);
        setList(newList);
        setcount(count + 1);
    }
   // setDisabled(true);
  };

  const checkDuplicate =(a:any)=>{
    const testarray = [...list] ;
    testarray.forEach(element => {
        //alert(a);
        if(element === a){
            testarray.pop();
            //testarray.filter((t:any)=> t !== a);
            //alert("inside checkDuplicate");
            return a;
        }
        else{
            //return false;
        }
    });     

  }

  const handleRemove =(el:any)=>{
   const dataRemove = [...list];
   let  item = dataRemove.filter((t:any)=>t !== el)
    setList(item);
    setcount(count-1);
    alert("handleRemove");     
      }
  

  return (
    <div>
      <p>Parent Component...</p>
      {mainList.map((item,index) => {
        return (
          <ul>
            <li key={index}>{item.title}</li>
            <button type="button"  onClick={() => handleAdd(item.title)}>
              Add
            </button>
          </ul>
        );
      })}
       

       {/* {list.map((a)=>
       <ChildModal count={count} data={list} newRemove={handleRemove}/>
       )} */}
        <ChildModal count={count} data={list} newRemove={handleRemove}/>  
      
    </div>
  );
};


const ChildModal = (props: any,newRemove:any) => {
    
   console.log(props.data);
  return (
    <div>
      <p>child component.....</p>
      <label>My List {props.count}</label>
      {props.data.map((a:any) =>{
          return(
              <ul>
                  <li>{a}</li>
                  <button type="button" onClick={() => props.newRemove(a)}>X</button>
              </ul>
          )
      })}
      
    </div>
  );
};

export default ParentModal;
