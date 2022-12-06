import logo from "./logo.svg";
import "./App.css";
import Wrapper from "./components/Wrapper";
import ButtonBox from "./components/ButtonBox";
import Button from "./components/Button";
import Screen from "./components/Screen";
import React, { useState } from "react";


const btnValues = [
  [ "C", "+-", "%","/"],
  [ 7, 8, 9, "X" ],
  [ 4, 5, 6, "-" ],
  [ 1, 2, 3, "+" ],  
  [ 0, ".", "="]

]


const  App = () => {
  let [calc, setCalc] = useState({
    sign:"",
    num:0,
    res:0,
  })

  // numClickHandler - for numbers between 0-9
  const numClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    if (calc.num.length < 16){
      setCalc({
        ...calc, 
        num: calc.num === 0 && value === "0" ? "0" : calc.num % 1 === 0 ? Number(calc.num + value) : calc.num + value, 
        res: !calc.sign ? 0 : calc.res

      })
    }
  }

  // commaClickHandler
  

  return (
    <Wrapper>
      <Screen value={calc.num ? calc.num : calc.res}/>
      <ButtonBox>
        {
          btnValues.flat().map((btn, i ) => {
            return(
              <Button
              key={i}
          className={btn === "=" ? "equals" : ""}
          value={btn}
          onClick={
            btn === "C" 
            ? resetClickHandler 
            : btn === "+-" 
            ? invertClickHandler 
            : btn === "%" 
            ? percentClickHandler 
            : btn === "=" 
            ? equalsClickHandler 
            : btn === "/" || btn ==="X" || btn === "-" || btn === "+" 
            ? signClickHandler 
            : btn === "." 
            ? commaClickHandler 
            : numClickHandler
          }
          
          />

            )
          })
          

        }
        
      </ButtonBox>
    </Wrapper>
  );
}

export default App;
