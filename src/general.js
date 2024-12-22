import ResultSheet from "./resultSheet"
import React, { useState, useEffect, useRef } from "react"
import quiz from './questions'
import axios from "axios"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons"

const General = ({
    setFinal,
    
    setErrorMessage
})=> {
    const [results, setResults] = useState(null)
    const fetchResult = async() => {
       
        try {
            const response = await axios.get('https://mawuhi-back.onrender.com/results')
            // const response = await axios.get('http://localhost:3500/results')
            if (response){
                console.log(response.data.questions)
                // const currentResult =  response.data.questions.find((mula)=> mula.candidate === candidate)
                // const allProps = {
                //     candidate:  currentResult.candidate,
                //     q_no: currentResult.q_no,
                //     qs: currentResult.questions,
                //     attempt: currentResult.attempt,
                //     // yourAnswer: answersArray,
                //     correctAnswer: currentResult.answer,
                //     // comment: ''
                // }
                
                // setFinal(allProps)   
                setResults(response.data.questions)
                console.log(results)
                
            } else throw new Error('Network Error pleast try again')
            
        } catch (error) {
            setErrorMessage(error)
        }
        
    }
    useEffect(()=> {
        fetchResult()
        // setPresent(true)
    }, [])
    const Result = ()=> {
        return (
            <div> 
                 <table>
            <tr style={{backgroundColor: 'aqua'}}>
        <th>Q. no.</th>
        <th>remark</th>
        <th>your answer</th>
        <th>correct answer</th>
        <th>questions</th>
            </tr>
            {results && results.map((result)=> {
             Object.values(result)
            })}
                </table>
                </div>
            )
    }

    return (
    //   results.map(()=> {
    //    return (
      
    //     )
    //   })
      <div
      >
           <Result/><br/>
       </div>
    )
}
export default General