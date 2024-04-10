import axios from "axios"
const CheckResult = ({setPresent, setIsDone, date, getResult})=> {
    console.log(date)
     
    return (
        <button onClick={getResult}
id="check-result"
>Check Result</button>
    )
}
export default CheckResult