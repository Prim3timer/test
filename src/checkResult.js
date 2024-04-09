import axios from "axios"
const CheckResult = ({setPresent, setIsDone, date, getResult})=> {
    console.log(date)
     
    return (
        <button onClick={getResult}
style={{margin: '10rem 0 0 10rem',
fontSize: '2rem',
width: '20rem',
padding: '1rem'}}
>Check Result</button>
    )
}
export default CheckResult