
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
import logo from './Screenshot_20241005-174442_YouTube.jpg'

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
  const [isAltLoading, setIsAltLoading] = useState(false)
  const [submitButton, setSubmitButton] = useState(false)
  const [clock, setClock]= useState(quiz.length * 10)
  const [revisit, setRevisit]= useState(false)


 




const inputRef = useRef('')
const inputRef1 = useRef('')
const inputRef2 = useRef('')
const inputRef3 = useRef('')
  const inputArray = [inputRef, inputRef1, inputRef2,  inputRef3]
  

  const year = new Date().getFullYear()
              const handleSubmit = async (e)=> {
                e.preventDefault()
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
             
                const result = {
                // id: 
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
              let optionVal = e.target.value
              for (let key of inputArray) {
                if (key.current.checked){
                  colator.splice(index, 1, optionVal)
              }
            }
            console.log(colator)
            }

useEffect(()=> {
  for (let i = 0; i < quiz.length; i++){
    if (attempPop === false){
      colator.push('unattempted')
    } 
  }
  console.log(colator)
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
}, [next])

const handlePrevious =(index)=> {
  if (index > 1) {
    setNext(next - 1)
  }else setNext(0)
}


const getResult = async ()=> {
  setIsDone(false)
                  setIsAltLoading(true)
                  const report = await axios.get(`https://dosal.onrender.com/results`)                  
                 if (report){
                    setIsAltLoading(false)
                    setPresent(true)
                   const currentResult = report.data.questions.find((assess)=> assess.date === date)
                   console.log(currentResult)
                    
                  }
}             
         
    const removeExcercise = async (id)=>{
      await axios.delete(`https://dosal.onrender.com/excercises/remove/${id}`)
      let newList = excercises.filter((excercise)=> excercise._id !== id )
      console.log(id)
  }
    
    const verifyName = ()=> {
      try {
          
        if (candidate){
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
       setPresent(false)
      setView(true)
      console.log('on arrival')
     }

  let allComponents = starting ? <NameComponent
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
   setSubmitButton={setSubmitButton}
   submitButton={submitButton}
   clock={clock}
   setClock={setClock}
  setCandidate
    /> : isLoading ? <h2 id='submitting' >Submitting Work...</h2> : isDone ?
    <CheckResult getResult={getResult}
  setPresent={setPresent}
  setIsDone={setIsDone} 
 
  /> : isAltLoading ? <h2 id='getting'>Gettting Result</h2> : present ?
  <Assessment
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
  /> : <ResultSheet 
    showSheet={showSheet}
    final={final}
   candidate={candidate}
    setCandidate={setCandidate}
    setFinal={setFinal}
    next={next}/>


              return  (
          //  <div id='app'>
          //   {allComponents}
          //   {/* <i class="fa fa-caret-left" aria-hidden='true'></i> */}
          //   <h2 style={{marginLeft: '20rem'}}>{sendError}</h2>
          //   <sub
          //   // style={{height: '100vh'}} 
          //   >&copy; {year} Amalu Productions.</sub>
          // </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
                padding: '2rem',
              
          }}
         >
          <article
          style={{width: '80%',
        
          }}>
              <h2
              
              >Donald Trump gave a 24-minute Interview with Sharoll Attkisson. Here is 
                  an excerpt on the question of inflation.
              </h2>
              <br/>
              <img src={logo}  style={{width: '300px',
              height: '200px',
              float: 'left',
                 paddingRight: '1rem'
             }}/>
              <br/>
              <br/>
              <p >
                  
      <span style={{fontWeight: 'bold'}}>ATTKISSON:</span> ON THE ECONOMY, AS YOU
      
      MENTIONED, FOR OUR VIEWERS A
      
      DOZEN EGGS UNDER TRUMP COST NO
      
      MORE THAN AS $2.08 AND AS LOW AS 
      
      $1.46. UNDER BIDEN HARRIS LAST MONTH $3.20.
      
      A GALLON OF UNLEADED REGULAR
      
      GAS UNDER TRUMP: AS LOW AS
      
      $1.88, NEVER HITTING $3.
      
       BIDEN HARRIS
      
      IS AS HIGH AS $5.06
      
      AND  LAST MONTH STILL $3.52.
      
       KAMALA HARRISHAS BEEN 
       
       SHORT ON SPECIFICS
      
      WHEN IT COMES TO ECONOMY OTHER
      
      THAN SAYING SHE WANTS AN
      
      OPPORTUNITY ECONOMY. WHAT ARE
      
      THE SPECIFIC MECHANICS OF HOW
      
      PRICES COME DOWN. YOU KNOW, THE
      
      STEPS THAT WOULD BE TAKEN IN A
      
      SECOND TERM FOR YOU?
              <br/>
              <br/>
      
      
      
      
      
      
      <span style={{fontWeight: 'bold'}}>TRUMP:</span> FIRST OF ALL, SHE CAN'T
      
      DO AN INTERVIEW.
      
      SHE COULD NEVER DO THIS INTERVIEW
      
      BECAUSE
      
      YOU ASK QUESTIONS, LIKE GIVE ME
      
      A SPECIFIC ANSWER AND SHE TALKS
      
      ABOUT HER LAWN WHEN SHE WAS
      
      GROWING UP. THIS WOMAN IS NOT
      
      EQUIPPED TO BE PRESIDENT.
      
      SHE IS NOT EQUIPPED TO DEAL
      
      WITH PRESIDENT XI WHO I WAS  VERY I TOOK IN
      
      HUNDREDS OF BILLIONS OF WITH HIM AND
      
        AND PUTIN: WE
      
      HAD NO WAR WITH PUTIN. AND I'M JUST 
      
      GOING TO GO OFF JUST FOR THIS, WITH
      
      BUSH THEY TOOK A LOT. 
      
      RUSSIA. WITH BIDEN THEY'RE
      
      TRYING TO TAKE EVERYTHING. WITH
      
      OBAMA THEY TOOK A LOT. WITH
      
      TRUMP RUSSIA TOOK NOTHING. JUST
      
      REMEMBER THAT. IT IS A LITTLE
      
      CHART, BUT WHAT HAPPENED , AND
      
      WHEN YOU LOOK AT WHAT TOOK PLACE
      
      WAS SO SAD, WHEN THEY TOOK OVER.
      
      THEY CUT THE OIL WAY DOWN AND
      
      OIL STARTED GOING THROUGH
      
      THE ROOF IT WAS GOING TO GO TO
      
      $10 PER GALLON AND IT WAS GOING TO GO TO
      NUMBERS THAT
      
      NOBODY HAS EVER SEEN. AND SO
      
      THEY WENT BACK TO THE TRUMP
      
      DRILLING. THEY SAID LET IT GO
      
      BACK AND THAT WAS ONLY GOOD
      
      THING, BUT THEY STOPPED BECAUSE
      
      I WOULD BE THERE, BUT FOUR
      
      YEARS LATER I WOULD BE TRIPLE
      
      WHAT THE NUMBER WAS. RIGHT NOW
      
      
      THEY'RE JUST ABOUT EVEN WHERE I
      
      WAS, BUT THEY ONLY DID THAT
      
      BECAUSE OF THE FACT THAT THEY
      
      EVENTUALLY HAVE AN ELECTION
      
      COMING UP AND YOU REMEMBER AT
      
      THE BEGINNING WHAT HAPPENED,
      
      THAT IS ONE OF THE REASONS THAT
      
      PUTIN WENT IN BECAUSE IT WENT
      
      TO $100 PER BARREL INSTEAD OF
      
      $40 PER BARREL AND HE COULD
      
      FIGHT ALL THE WARS HE WANTS
      
      WITH THOSE KIND OF NUMBERS
      
      BECAUSE HE IS A BIG SELLER OF
      
      OIL AND GAS, SO WHAT HAPPENS
      
      IS, THEY WENT BACK TO WHAT I
      
      WAS DOING AND JUST SAID REOPEN,
      
      REOPEN, IT WAS NOT HARD . IT IS
      
      SO CRAZY WHAT THEY WANT TO DO.
      
      THEY'RE GOING TO DESTROY LIVES
      
      AND THEY'RE GOING TO DESTROY
      
       WHAT THEY HAVE DONE TO THIS
      
      COUNTRY, AND ESPECIALLY IN THE
      
      SENSE OF ALLOWING MILLIONS AND
      
      MILLIONS OF PEOPLE COME IN
      
      BECAUSE THAT IS SOMETHING
      
      YOU KNOW, WE CAN FIX THE
      
      GASOLINE SITUATION AND WE CAN
      
      AND WE CAN FIX THE... ANYTHING...<br/>
              <br/>
      
      
      
      <span style={{fontWeight: 'bold'}}>ATTKISSON:</span> DO PRICES COME DOWN
      
      MAGICALLY BECAUSE IT IS NOT
      
      THEM?
      
          <br/>
      <br/>
      
      <span style={{fontWeight: 'bold'}}>TRUMP:</span> THEY COME DOWN WITH ENERGY
      
      AND INTEREST RATES. WE ARE GONNA GET,
      
      AS I TOLD YOU, 
      
      WE ARE GOING TO GET ENERGY
      
      DOWN BY 15% IN 12 MONTHS AND WE
      
      WILL HAVE IT -- IT'S GONNA BE
      
      MAJOR SMASH ON ENERGY. IF YOU
      
      LOOK AT THE ENERGY FOR AND I'M
      
      NOT JUST TALKING ABOUT CARS,
      
      I'M TALKING ABOUT AIR
      
      CONDITIONING, HEATING, YOUR
      
      BASIC ENERGY, OPERATING A
      
      BAKERY, OPERATING ANY KIND OF A
      
      BUSINESS, IT IS ALL HAVING TO
      
      DO WITH ENERGY AND THAT IS
      
      WHERE THEY STARTED WRONG 
      
      WHEN THEY CUT WAY
      
      BACK ON WHAT I DID, AND AGAIN
      
      JUST SO YOU UNDERSTAND, THEY THEN
      
      LET IT GO BACK TO WHERE IT WAS,
      
      WHICH WAS A VERY SMART THING,
      
      OTHERWISE YOU WOULD HAVE HAD...
      
      I THINK YOU WOULD HAVE HAD A
      
      DEPRESSION, IF YOU WANT TO KNOW
      
      THE TRUTH, BUT ENERGY WAS
      
      RISING AT A LEVEL NOBODY HAD
      
      SEEN AND THEN THEY SAID GO BACK, 
      
      GO BACK
      
      AND THEY WERE TELLING PEOPLE TO
      
      GO BACK TO YOUR WELLS, GOT BACK TO DRILLING. GO
      
      BACK TO FRACKING, DO WHATEVER
      
      YOU HAVE TO DO. BUT IF THEY WIN
      
      , THE DAY AFTER THEY ARE GOING
      
      ALL THE WAY. THERE WERE ONLY
      
      DOING THAT BECAUSE OF AN
      
      ELECTION COMING UP AND THEY'RE
      
      GOING ALL THE WAY. IT IS
      
      MADNESS, AND WHAT THEY HAVE
      
      DONE TO OUR COUNTRY IS MAD.
      
      
              </p>
          </article>
          </div>
               
  );
  
}


export default App;
