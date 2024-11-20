import quiz from './questions'
import axios from "axios"

import { useEffect, useState } from "react"
import ResultSheet from "./resultSheet"

const Assessment = ({candidate, date, colator,
showSheet,
arrival,
setPresent,
final,
setFinal})=> {
    const answers = quiz.map((nug)=> nug.answer)
   
   
    const [answersArray, setAnswersArray]= useState(answers)
    const [attempt, setAttemp] = useState(colator)
    const [whole, setWhole] = useState({})
    const [errorMessage, setErrorMessage] = useState('')
     
  
    const fetchResult = async() => {
        try {
            // const response = await axios.get('https://mawuhi-back.onrender.com/results')
            const response = await axios.get('http://localhost:3500/results')
            if (response){
                const currentResult =  response.data.questions.find((mula)=> mula.candidate === candidate)
                const allProps = {
                    candidate:  currentResult.candidate,
                    q_no: currentResult.q_no,
                    qs: currentResult.questions,
                    attempt: currentResult.attempt,
                    // yourAnswer: answersArray,
                    correctAnswer: currentResult.answer,
                    // comment: ''
                }
                setFinal(allProps)
                
            } else throw new Error('Network Error pleast try again')
            
        } catch (error) {
            setErrorMessage(error)
        }
        
        // setAttemp(colator)
       
        // console.log(final)
    }
    useEffect(()=> {
        fetchResult()
        // setPresent(true)
    }, [])


    return (
        <div id="result-sheet"
        // style={{justifyContent: 'center'}}
        >
            
               
 <h5
 id='ready'
 
>Your Result is Ready</h5>
<button
id='see-ready'
 onClick={arrival} 

>View Result</button>
<h2>{errorMessage.message}</h2>
 
        </div>
    )
}

export default Assessment
     