
// import logo from './logo.svg'
import css from './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect, useRef } from "react"
import axios from 'axios'
import quiz from './questions'
import CheckResult from './checkResult'
import TestPage from './testPage'
import ResultSheet from './resultSheet'
import logo from './facing.jpg'
import {format} from 'date-fns'
import Navbar from './navbar'
import GetUsers from './users-list'
import NameComponent from './nameComponent'
import General from './general'
const {v4: uuid} = require('uuid')


function App() {
  const [excercises, setExcercises] = useState([])
  const [next, setNext] = useState(0)
  const [nextOption, setNextOption] = useState(0)
  const [colator, setColator] = useState([])
  const [candidate, setCandidate] = useState('')
  const [error, setError] = useState(null)
  const [final, setFinal] = useState('')
  const [reportCard, setReportCard] = useState('')
      const [results, setResults] = useState('')
  const [date, setDate] = useState(new Date())
  const [starting, setStarting] = useState(true)
  const [started, setStarted] = useState(false)
  const [isDone, setIsDone] = useState(false)
  const [present, setPresent] = useState(false)
  const [attempPop, setAttempPop] = useState(false)
  const [view, setView]= useState(false)
  const [truth, setTruth] = useState(false)
  const [reveal, setReveal] = useState(false)
  const [sendError, setSendError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isAltLoading, setIsAltLoading] = useState(false)
  const [submitButton, setSubmitButton] = useState(false)
  const [clock, setClock]= useState(quiz.length * 10)
  const [revisit, setRevisit]= useState(false)
  const [id, setId] = useState('')
  const [allResults, setAllResults] = useState(false)


 




const inputRef = useRef('')
const inputRef1 = useRef('')
const inputRef2 = useRef('')
const inputRef3 = useRef('')
  const inputArray = [inputRef, inputRef1, inputRef2,  inputRef3]
  let mark = 0

  const year = new Date().getFullYear()
              const handleSubmit = async ()=> {
                console.log(id)
                setStarted(false)
                setIsLoading(true)
                const qnArray = []
                const qsArray = []
                const answersArray  = []
              
               
                for (let key of quiz){
                  qnArray.push(key.id)
                  qsArray.push(key.quiz)
                  answersArray.push(key.answer)

                } 

               for (let i = 0; i < answersArray.length; i++){
                if (answersArray[i] === colator[i])   mark += 100 / quiz.length
               }

               
               const result = {
                 id,
                 candidate: candidate,
                 q_no: qnArray,
                 questions: qsArray,
                 attempt: colator,
                 answer: answersArray, 
                 date: format(date, 'dd/MM/yyyy HH:mm:ss'),
                 mark: mark
                }
                
                console.log(mark)
              
             try {             
                const response = await axios.post('https://mawuhi-back.onrender.com/results', result)
                // const response = await axios.post(`http://localhost:3500/results`, result)  

                // try {
                //   const response = await axios.post('https://mawuhi-back.onrender.com/results',
                //       JSON.stringify({result}),
                //       {
                //           headers: { 'Content-Type': 'application/json' },
                //           // withCredentials: true
                //       }
                //   );
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
             console.log(mark)
             
            }

            const getForeign = async () => {
              const chekered = await axios.get('https://dosal.onrender.com/results')
              console.log(chekered)
              if (chekered){
                console.log(chekered.data.questions)
                const oneChekered = chekered.data.questions.find((item)=> item._id === '66268fe13befb5723ec2a88a')
                console.log(oneChekered)

                console.log(oneChekered.q_no.length)

                for (let i = 0; i < oneChekered.q_no.length; i++){
                  if (oneChekered.attempt[i] === oneChekered.answer[i])   mark += 100 / quiz.length
                 }
  
                 
                 const result = {
                   id: uuid(),
                   candidate: oneChekered.candidate,
                   q_no: oneChekered.q_no,
                   questions: oneChekered.questions,
                   attempt: oneChekered.attempt,
                   answer: oneChekered.answer, 
                   date: oneChekered.date,
                   mark: mark
                  }
                  console.log(result)

                  const response = await axios.post('https://mawuhi-back.onrender.com/results', result)
              }

          
              
            

              
            }
               
            const attemptTracker = (e, index)=> {
              let optionVal = e.target.value
              for (let key of inputArray) {
                if (key.current.checked){
                  colator.splice(index, 1, optionVal)
              }
            }
            
            }

useEffect(()=> {
  for (let i = 0; i < quiz.length; i++){
    if (attempPop === false){
      colator.push('unattempted')
    } 
  }
  setAttempPop(true)
}, [])

const handleNext = (index)=> {
 setRevisit(true)
  if (index < quiz.length -1) {
    setNext(next + 1)
  }else {
     
     setNext(quiz.length -1)
     
    }
    
  }
  // keep the previousy checked button checked
const radioCheck = ()=> {
  for (let key of inputArray){
    if (revisit){ 
      if(key.current.value === colator[next]){
       key.current.checked =true
      }
    }
  }
}



  useEffect(()=> {
    radioCheck()
    // getForeign()
}, [next])

const handlePrevious =(index)=> {
  if (index > 1) {
    setNext(next - 1)
  }else setNext(0)
}


const getResult = async ()=> {
  setIsDone(false)
                  setIsAltLoading(true)
                  const report = await axios.get(`https://mawuhi-back.onrender.com/results`)                  
                  // const report = await axios.get(`http://localhost:3500/results`)                  
                 if (report){
                    setIsAltLoading(false)
                    setPresent(true)
                   const currentResult = report.data.questions.find((assess)=> assess.ade === id)
                   console.log(currentResult)
                    setReportCard(currentResult)
                    
                  }
}        

const showResults = () => {
    
  setReveal(true)
}
         
    
    const verifyName = ()=> {
      try {
          
        if (candidate){
          setId(uuid())
          console.log(uuid())
          console.log(id)
          setStarted(true)
          setStarting(false)
        }else throw new Error('Enter your name for unique ID')
      } 
      catch (error) {
        setError(error.message)
      }
    }

    const showSheet = ()=> {
      setPresent(false)
      setView(true)
      console.log('back from lundry')
     } 
     const arrival = ()=> {
       setPresent(true)
      // setView(true)  
      console.log('on arrival')
     }

  let allComponents = reveal ? <General
  id={id}
  setId={setId}
  verifyName={verifyName}
  setStarted={setStarted}
  setReveal={setReveal}
  started={started}
  present={present}
  setIsLoading={setIsLoading}
  setPresent={setPresent}
setReportCard={setReportCard}
reportCard={reportCard}
results={results}
allResults={allResults}
setAllResults={setAllResults}
setResults={setResults}
  /> : starting ? <NameComponent
  verifyName={verifyName}
  candidate={candidate}
setCandidate={setCandidate}
  error={error}
  clock={clock}
  quiz={quiz}/> :  started ? <TestPage
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
   setReveal={setReveal}
   setSubmitButton={setSubmitButton}
   submitButton={submitButton}
   clock={clock}
   setClock={setClock}
   candidate={candidate}
  setCandidate={setCandidate}
  showResults={showResults}
    /> : isLoading ? <h2 id='submitting' >Submitting Work...</h2> : isDone ?
    <CheckResult getResult={getResult}
  setPresent={setPresent}
  setIsDone={setIsDone} 
  final={final}
  setFinal={setFinal}
id={id}
setId={setId}

  candidate={candidate}
    date={date}
    colator={colator}
    quiz={quiz}
    setView={setView}
    setTruth={setTruth}
    arrival={arrival}
 
  /> : isAltLoading ? <h2 id='getting'>Gettting Result</h2> : present ?
  <ResultSheet 
    showSheet={showSheet}
    final={final}
   candidate={candidate}
   reportCard={reportCard}
    setCandidate={setCandidate}
    setFinal={setFinal}
    showResults={showResults}
    next={next}/>
: ''

              return  (
           <div id='app'>
            <p
            id='header'
            >Auto Tester</p>
            {allComponents}
            {/* <i class="fa fa-caret-left" aria-hidden='true'></i> */}
            <h2
            //  style={{marginLeft: '20rem'}}
            >{sendError}</h2>
            {/* <General/> */}
            <p
          id='copy'
            >&copy; {year} Amalu Productions.</p>
          </div>
                   
  );
  
}


export default App;
