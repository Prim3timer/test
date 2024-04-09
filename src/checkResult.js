import axios from "axios"
const CheckResult = ({setPresent, setIsDone, date, getResult})=> {
    console.log(date)
     
    return (
        <button onClick={getResult}
style={{margin: '10rem 0 0 15rem',
fontSize: '2rem',
width: '20rem',
padding: '1rem'}}
id="check-result"
>Check Result</button>
    )
}
export default CheckResult