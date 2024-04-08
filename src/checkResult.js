import axios from "axios"
const CheckResult = ({setPresent, setIsDone, date, getResult})=> {
    console.log(date)
     
    return (
        <button onClick={getResult}
style={{margin: '20rem 0 0 40rem',
fontSize: '3rem',
width: '30rem',
padding: '1rem 2rem'}}
>Check Result</button>
    )
}
export default CheckResult