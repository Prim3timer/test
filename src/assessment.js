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
            const response = await axios.get('https://dosal.onrender.com/results')
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
        <div id="result-sheet">
            
               
 <p style={{fontSize: '4rem', width: '40rem',
margin: '10rem 0 0 40rem'}}>Your Result is Ready</p>
<button onClick={arrival} id='view-result'>View Result</button>
<h2>{errorMessage.message}</h2>
 
        </div>
    )
}

export default Assessment
     