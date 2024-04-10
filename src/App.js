
// import logo from './logo.svg'
import css from './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect, useRef } from "react"
import axios, { all } from 'axios'
import quiz from './questions'
import Assessment from './assessment'
import CheckResult from './checkResult'
import TestPage from './testPage'
import ResultSheet from './resultSheet'
import ResultWindow from './resultWindow'

import Navbar from './navbar'
import GetUsers from './users-list'
import NameComponent from './nameComponent'


function App() {
  const [excercises, setExcercises] = useState([])
  const [next, setNext] = useState(0)
  const [nextOption, setNextOption] = useState(0)
  const [colator, setColator] = useState([])
  const [candidate, setCandidate] = useState('')
  const [error, setError] = useState(null)
  const [final, setFinal] = useState('')

  const [date, setDate] = useState(new Date())
  const [starting, setStarting] = useState(true)
  const [started, setStarted] = useState(false)
  const [isDone, setIsDone] = useState(false)
  const [present, setPresent] = useState(false)
  const [attempPop, setAttempPop] = useState(false)
  const [view, setView]= useState(false)
  const [truth, setTruth] = useState(false)
  const [sendError, setSendError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isAltLoadding, setIsAltLoading] = useState(false)
  const [submitButton, setSubmitButton] = useState(false)
  const [clock, setClock]= useState(quiz.length * 10)


 




const inputRef = useRef('')
const inputRef1 = useRef('')
const inputRef2 = useRef('')
const inputRef3 = useRef('')
  const inputArray = [inputRef, inputRef1, inputRef2,  inputRef3]
        
            
              const handleSubmit = async (e)=> {
                setStarted(false)
                setIsLoading(true)
                const qnArray = []
                const qsArray = []
                const answersArray  = []
              
               
                e.preventDefault()
                for (let key of quiz){
                  qnArray.push(key.id)
                  qsArray.push(key.quiz)
                  answersArray.push(key.answer)

                } 
             
                const result = {
                  candidate: candidate,
                  q_no: qnArray,
                  questions: qsArray,
                  attempt: colator,
                  answer: answersArray, 
                  date: date
              }
        
              
             try {             
                const response = await axios.post('https://dosal.onrender.com/results', result)
                let errorCheck = response ? '' : error.message
                setSendError(errorCheck)
              if (response){

                // setIsDone(true)   
                setIsLoading(false)
                setIsDone(true)
              } else throw new Error('Network error please try again')
        
             } catch (error) {
              return sendError
             }     
            
             
            }
               
const attemptTracker = (e, index)=> {
  for (let key of inputArray) {
    if (key.current.checked){

      colator.splice(index, 1, e.target.value)

  }
  

  
}
}

const handleNext = (index)=> {
  for (let i = 0; i < quiz.length; i++){
    if (attempPop === false){
      
      colator.push('unattempted')
    }
    
  }
  setAttempPop(true)

  if (index < 24) {
    setNext(next + 1)
  }else {
     
     setNext(24)
     
    }
    
  }
const radioCheck = ()=> {
  for (let key of inputArray){
    if (next > 0){ 

      if(key.current.value === colator[next]){
         console.log('we have a match!')
       key.current.checked =true
       console.log(colator[next], key.current.value)
      }
    }
  }
}
  useEffect(()=> {
    radioCheck()
}, [next])

const handlePrevious =(index)=> {
 
  console.log('index is:',index)
  if (index > 1) {
    setNext(next - 1)
  }else setNext(0)
 
}


const getResult = async ()=> {
                  setIsAltLoading(true)
                  const report = await axios.get(`https://dosal.onrender.com/results`)
                  
                  if (report){
                    setIsAltLoading(false)
                    setIsDone(false)
                    setPresent(true)
                   const currentResult = report.data.questions.find((assess)=> assess.date === date)
                   console.log(currentResult)
                    
                  }
                  setTimeout(()=> {
                
                  }, 2000)
               

}             
         
    const removeExcercise = async (id)=>{
      await axios.delete(`https://dosal.onrender.com/excercises/remove/${id}`)
      let newList = excercises.filter((excercise)=> excercise._id !== id )
      console.log(id)
  }
    
    const verifyName = ()=> {
      try {
        
        if (candidate){
          // setIsOn(true)
          setStarted(true)
          setStarting(false)
        }else throw new Error('Enter your name for unique ID')
      } catch (error) {
        setError(error.message)
      }

    }

    const showSheet = ()=> {
      setPresent(false)
      setView(true)
      console.log('back from lundry')
     } 
     const arrival = ()=> {
       setPresent(false)
      setView(true)
      console.log('on arrival')
     }
    let isStarting  = starting ?  <NameComponent
    verifyName={verifyName}
    candidate={candidate}
    setCandidate={setCandidate}
    error={error}
    clock={clock}
    quiz={quiz}/> : ''

    const hasStarted = started ? <TestPage
    next={next}
    quiz={quiz}
    inputRef={inputRef}
    inputRef1={inputRef1} 
    inputRef2={inputRef2}
    inputRef3={inputRef3}
    attemptTracker={attemptTracker}
    handleSubmit={handleSubmit}
    handlePrevious={handlePrevious}
    handleNext={handleNext}
    radioCheck={radioCheck}
   started={started}
   setSubmitButton={setSubmitButton}
   submitButton={submitButton}
   clock={clock}
   setClock={setClock}

    /> : ''

    let done = isDone ? <CheckResult getResult={getResult}
    setPresent={setPresent}
    setIsDone={setIsDone}
    /> : ''

    // let loader = isLoading === true && starting === false  ? <h2>Submiting Work...</h2> : ''
    let loader = isLoading === true  ? <h2 style={{margin: '10rem  0 0 15rem'}}>Submiting Work...</h2> : ''
    let loader2 = isAltLoadding === true ? <h2 style={{fontSize: '4rem'}}>Gettting Result</h2> : ''

      let drumRoll = present ?   <Assessment
    candidate={candidate}
    date={date}
    setPresent={setPresent}
    setIsDone={setIsDone}
    colator={colator}
    quiz={quiz}
    getResult={getResult}
    setView={setView}
    setTruth={setTruth}
    arrival={arrival}
    final={final}
    setFinal={setFinal}
    /> : ''

    let impact = view ? <ResultSheet 
    showSheet={showSheet}
    final={final}
    candidate={candidate}
    setFinal={setFinal}
    next={next}/> : '' 

    let insideLoad = loader || done
    let insideLoad2 = loader2 || drumRoll

  
    let allOptions = isStarting || hasStarted || insideLoad|| insideLoad2 || impact

              return  (
           <div>
            {allOptions}
            <h2 style={{marginLeft: '20rem'}}>{sendError}</h2>
          </div>
               
  );
  
}


export default App;
