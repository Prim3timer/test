import ResultSheet from "./resultSheet"
import React, { useState, useEffect, useRef } from "react"
import quiz from './questions'
import axios from "axios"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons"
import { FaTrashAlt } from "react-icons/fa";


const General = ({
    setFinal,  
    setErrorMessage,
    setStarted, 
    setReveal,
    started,
    verifyName,
    id, setId,
    present,
    setPresent,
    setIsLoading,
    getResult,
    setReportCard
})=> {
    const [results, setResults] = useState('')
    // let [score, setScore] = useState(0)
    const [scoreTracker, setScoreTracker] = useState(0)
    const showOne = async (id) => {
        const report = await axios.get('https://mawuhi-back.onrender.com/results')
        const currentResult = report.data.questions.find((assess)=> assess.ade === id)
        console.log(currentResult)
         setReportCard(currentResult)
        setId(id)
        console.log(id)
        setReveal(false)
        setStarted(false)
        setPresent(true)
        console.log('row your boat')
    }
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
                
                // console.log(results)
                console.log(response.data.questions)
            } else throw new Error('Network Error pleast try again')
            
        } catch (error) {
            setErrorMessage(error)
        }
        
    }
//     let assessmentArray = []
//     // let moon = main[5][index] === main[6][index] ? score += 100 / main[5].length : score
//     let mainMan = Object.values(results)
//     for (let i = 0; i < quiz.length; i++){
    //         const assessmentObject = {
        //             q_no: mainMan[1][i], qs: mainMan[2][i], attempt: mainMan[3][i],
        //              correctAnswer: mainMan[4][i]
    
        //         }
        //         assessmentArray.push(assessmentObject)
        //     }
        
        // for (let i = 0; i < quiz.length; i++){
            //     if (assessmentArray[i].attempt === assessmentArray[i].correctAnswer){
                //         score += 100 / quiz.length
                //     } 
                // }
                
                useEffect(()=> {
                    fetchResult()
                    // setPresent(true)
                }, [])

                const mainPage = () => {
                    setReveal(false)
                    setStarted(true)
                    console.log(started)
                }
                const Result =  ()=> {
                    const remover = async (id) => {
                        // await axios.delete(`/results/delete/${id}`)
                        await axios.delete(`https://mawuhi-back.onrender.com/results/delete/${id}`)
                // await axios.delete(`http://localhost:3500/results/delete/${id}`)
                const getResult = results.filter((item)=> item.ade !== id)
                console.log(getResult)
                setResults(getResult)
            }
                // useEffect(()=> {
                // }, [remover])
            // const assertain = async (id) => {
                //     await axios.delete(`/items/delete/${state.id}`)
                //     const newGraw = state.items && state.items.filter((item)=> item._id !== state.id)
                //     dispatch({type: 'items', payload: newGraw})
                //     dispatch({type: 'cancel', payload: false})
                // }
                
        return (
            <div> 
              
              <table
              id="generalTable"
                    style={{
                        border: '2px solid brown',
                        padding: '5rem'
                    
                    }}
                    
                    >
                        <tbody>
                            <tr>
                                <th>NAME</th>
                                <th>ID</th>
                                <th>SCORE</th>
                                <th>DATE</th>
                                <th>ACTION</th>
                            </tr>
                            {results.map((result, index)=> {
                                return (
                                    <tr
                                    style={{backgroundColor: index % 2 === 0 ?
                                        'white' : 'lightskyblue'}}
                                        onClick={() => showOne(result.ade)}
                                    >
                                        <td>{result.candidate}</td>
                                        <td>{result.ade}</td>
                                        <td>{result.mark}</td>
                                        <td>{result.date.substring(0, 10)}</td>
                                        <td><FaTrashAlt role='button'
           onClick={()=> remover(result.ade)}
           /></td>
                                    </tr>
                                )
                            })}
                    
                        </tbody>
                    </table>
         
 
                </div>
            )
    }

    return (
      <div
      
      >
          <button
                onClick={mainPage}
                style={{
                    margin: '2rem',
                    alignItems: 'left'
                }}
                >Back to Test</button>
          <h2
          >RESULTS ({results.length})</h2>
          { !results  ? <h3>Loading...</h3> : <Result/>}<br/>
       </div>
    )
}
export default General