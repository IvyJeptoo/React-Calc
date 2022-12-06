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

  // equalsClickHandler- calculates the results when = sign is pressed
  // dependednt on the num, res, and sign value
  // the returned value will be the new res 
  // no repeated calls and no division with 0

  const equalsClickHandler = (e) => {
    if (calc.sign && calc.num) {
      const math = (a, b, sign) => 
        sign === "+" ? a + b : sign === "-" ? a - b : sign === "X" ? a * b : a / b;

      setCalc({
        ...calc,
        res: calc.num === "0" && calc.sign === "/" ? "Can't divide with 0" : math(Number(calc.res), Number(calc.num), calc.sign),
        sign: "",
        num: 0,

      })
      
    }

  }


// invertClickHandler checks if there's any entered value num or calculated res then inverts by multiplying by -1

const invertClickHandler = () => {
  setCalc({
    ...calc,
    num: calc.num ? calc.num * -1 : 0,
    res: calc.res ? calc.res * -1 : 0,
    sign: "",
  })
}

// percentClickhandler- checks is there's any entered value num/res then calculates % using the math.pow  that returns base to the exponent power

const percentClickHandler = () => {
  let num = calc.num ? parseFloat(calc.num) : 0;
  let res = calc.num ? parseFloat(calc.res) : 0;

  setCalc({
    ...calc,
    num: (num /= Math.pow(100, 1)),
    res: (res /= Math.pow(100,1))
  })

}

// reset clickhandler - defaults all the initials of calc returning calc state as it was before being rendeered
const resetClickHandler = () =>{
  setCalc({
    ...calc,
    sign: "",
    num: 0,
    res: 0,
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
