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
    id
})=> {
    const [results, setResults] = useState('')
    // let [score, setScore] = useState(0)
    const [scoreTracker, setScoreTracker] = useState(0)
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
              
        {
            
            results && results.map((result, index)=> {
                let score = 0
                console.log(result)
                const main = Object.values(result)
                
                
                return (
                    <div
                    
                    >
                         <main
                          id='cred' 
            style={{
                marginTop: '2rem',
               display: 'flex',
            //    alignItems: 'flexStart',
               columnGap: '1rem',
           
                // backgroundColor: 'green'
            }}
            >
                        
                    </main>
                    <table
                    style={{
                        border: '2px solid brown',
                        padding: '5rem'
                    
                    }}
                    
                    >
                        <tbody>
                            <tr>
                                <th>id</th>
                                <th>NAME</th>
                                <th>SCORE</th>
                                <th>DATE</th>
                            </tr>
                            <tr>
                            <td>{main[1]}</td>
                            <td>{main[2]}</td>
                            <td>{main[8]}</td>
                            <td>{main[7]}</td>
                            <td><FaTrashAlt role='button'
           onClick={()=> remover(main[1])}
           /></td>
                            </tr>
                            {main[3].map((item, index)=> {
                    return (
                        <tbody
                      >
                        <tr
                        style={{backgroundColor: index % 2 === 0 ?
                            'white' : 'lightskyblue'}}
                        >
                      
                        <td>{main[3][index]}.</td> 
                        {  main[5][index] === main[6][index] ? <td style={{color: 'green',
            fontSize: '1.2rem'
        }}>
            <FontAwesomeIcon icon={faCheck} style={{fontWeight: 'bold'}}/>
            {/* correct */}
            </td>
         : <td style={{color: 'red',
            fontSize: '1.2rem',
        }}>
                  <FontAwesomeIcon icon={faTimes} />
            </td>}
                        <td>{main[5][index]}</td>
                        <td>{main[6][index]}</td>
                        { <td>{main[4][index]}</td>}
                    { <td>{score}</td> }
                    </tr>
                </tbody>
                 )
                })}

                        </tbody>
                    </table>
             
            {/* </button> */}
             <br/>
             <br/>
              
                </div>
        )
    
        
        })}
 
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