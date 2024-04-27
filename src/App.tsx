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
  const countries = Object.keys(data);
  const capitals = Object.values(data);
  const [options, setOptions] = useState<Option[]>(
    [...countries, ...capitals]
    .sort(()=> Math.random() - 0.5)
    .map((value)=>({
      value,
      state: 'DEFAULT',
    }))
  );
  
  const [selected, setSelected] = useState<Option>();

  return (
  <>
  {options.map((option)=>(
    <button
    key = {option.value}
    className={option.state === 'SELECTED' ? 'selected' : ''}
    onClick={()=>{
      if (!selected) {
        setSelected(option);
        setOptions(
          options.map((opt)=>{
            return opt === option ? 
            {
              ...opt,
              state: 'SELECTED',
            }
            : opt;
          })
        );
      } else {
        if(selected.value === data[option.value] ||
          data[selected.value] === option.value) {
            setOptions(options.filter(opt=>{
              return !(
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
