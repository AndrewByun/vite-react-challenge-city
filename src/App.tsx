import { useState } from 'react'
import './App.css'
//create a type for ButtonState
type ButtonState = "DEFAULT" | "SELECTED" | "WRONG";
//create a type for the Option in our options array
type Option = {
  value: string;
  state: ButtonState;
}
function CountryCapitalGame({ data }: {data: Record<string, string>}) {
  //store the keys as countries and values as capitals in variables
  const countries = Object.keys(data);
  const capitals = Object.values(data);
  //add an options array to state which we will use to monitor the state of each button
  const [options, setOptions] = useState<Option[]>(
    //we initialize the options array by randomly sorting the countries and capitals and creating an option object for each one using the map method, setting their default states
    [...countries, ...capitals]
    .sort(()=> Math.random() - 0.5)
    .map((value)=>({
      value,
      state: 'DEFAULT',
    }))
    );

    console.log('this is options ', options)
  //control the state of the selected button using useState, initialized to undefined
  const [selected, setSelected] = useState<Option>();

  console.log('this is selected ', selected);

  return (
    <>
    //here we iterate through the randomized options array using the map method
  {options.map((option)=>(
    //for each option in the options array we create and return a button
    <button
    key = {option.value}
    //the className of each button will determined by it's state, if its state is SELECTED, we update its className to 'selected', otherwise leave it as an empty string ''
    className={option.state === 'SELECTED' ? 'selected' : ''}
    //anytime we click on one of these buttons
    onClick={()=>{
      //we check if a button was already selected 
      if (!selected) {
        //if a button has NOT been selected yet, we set the selected button in state using setSelected and pass in the current option we are iterating over in the options array
        setSelected(option);
        //now we have to update the state of the button we selected, so we use setOptions() and iterate over the options array to update each button
        setOptions(
          options.map((opt)=>{
            //if the current option we are iterating over matches the option of the button we clicked on, 
            return opt === option ? 
            //update the state of that button to SELECTED
            {
              ...opt,
              state: 'SELECTED',
            }
            //otherwise just leave that option alone because we haven't clicked on it 
            : opt;
          })
        );
        //IF we did select a button before the button we just clicked on, 
      } else {
        console.log('this is selected.value ', selected.value);
        console.log('this is data[option.value] ', data[option.value] )
        console.log('this is data[selected.value] ', data[selected.value])
        console.log('this is clicked option ', option)
        console.log('this is option.value ', option.value)
        //here we check if the country or capital we just clicked on matches the corresponding value of the previously selected button's value in our given data
        if(selected.value === data[option.value] ||
          data[selected.value] === option.value) {
            //we filter out any buttons that satisfy this condition, eliminating from the page and advancing the game
            setOptions(options.filter(opt=>{
              return !(
                //this checks if the current buttons value is equal to the selected buttons value or the clicked options value, if it is we return true
                opt.value === selected.value || opt.value === option.value
                )
            }))
          }
      }
    }}
    >
      {option.value}
    </button>
  ))}
</>
  )
}

function App() {


  return (
    <>
    <CountryCapitalGame data={{ Germany: "Berlin", Azerbaijan: "Baku" }}/>
    </>
  )
}

export default App


