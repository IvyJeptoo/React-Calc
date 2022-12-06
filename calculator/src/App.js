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
  // no whole numbers start with zero
  // there are no multiple zeros before the comma
  // the format will be “0.” if “.” is pressed first
// numbers are entered up to 16 integers long

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

  // commaClickHandler- when the (.) is pressed adds a decimal point to the current num value making it a decimal number
  // ensures no multiple decimals are possible

  const commaClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalc({
      ...calc,
      num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
    })

  }

  // signClickHandler- when the user press +, -, *, /.
  // the particular value is then set as a current sign in the calc object
  // ensures no effect on repeated calls

  const signClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalc({
      ...calc,
      sign: value,
      num: 0,
      res: !calc.res && calc.num ? calc.num : calc.res

    })
  }



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
