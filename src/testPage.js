import { useEffect, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons"
const TestPage = ({ next,
    quiz,
    inputRef,
    inputRef1,
    inputRef2,
    inputRef3,
    attemptTracker,
    handleSubmit,
    handlePrevious,
    radioCheck,
    handleNext,
    started,
    setReveal,
    setSubmitButton,
    submitButton,
    clock,
    setClock,
    candidate
  })=>{

    const showResults = () => {
    
      setReveal(true)
    }
    let showSubmit = clock === 0 ? <section
    ><button 
    id="submit"
 
    onClick={(e)=> handleSubmit(e)}>Submit</button></section> : submitButton ? <section
    style={{
      display: 'flex',
      flexDirection: 'row',
      columnGap: '2rem',
     justifyContent: 'center',
    }}
    >
        <button 
        id= 'previous'
        onClick={()=> handlePrevious(next)}
        style={{width: '6rem'}}
        >
       <FontAwesomeIcon icon={faArrowLeft}/>
        </button>
        <button 
        id='next'
      onClick={()=> handleNext(next)}
      style={{width: '6rem'}}
      >
          <FontAwesomeIcon icon={faArrowRight}/>
      </button>
        <button onClick={(e)=> handleSubmit(e)}
        id="submit"
        >Submit</button></section> : <section
        style={{
          display: 'flex',
          flexDirection: 'row',
         justifyContent: 'center'
        }}
        >
          <button 
        id= 'previous'
        onClick={()=> handlePrevious(next)}
   
        >
       <FontAwesomeIcon icon={faArrowLeft}/>
        </button>
       
      <button 
        id='next'
      onClick={()=> handleNext(next)}

      >
          <FontAwesomeIcon icon={faArrowRight} />
      </button>
    
      </section>


useEffect(()=> {
  const interval = setInterval(()=>{
      if (started === true) {
        setClock(clock - 1)
      }
    }, 1000)
    if (clock < 1) {
      setClock(0)
    }
    return ()=> clearInterval(interval)
}, [clock])
useEffect(()=>{
  if (next === quiz.length - 1) setSubmitButton(true)
}, [next])
        return (

            quiz.map((exam, index)=> {
                if(index === next){
              
                
                  return (
                    <div key={exam.id} id="test-page">
                      <article
                    style={{
                      margin: '1rem  0 .5rem 0',
                    justifyContent: 'center',
                      display: 'flex'
                }}
                      >
                         <button
                         style={{
                          display: candidate === 'Dike' ? 'block' : 'none'
                         }}
                    onClick={showResults}
                    >View Results</button>
                      <h5 id="clock"
                      style={
                        {
                          margin: '0 1rem',
                        color: '#008B8B'
                      }}
                  >{clock < 10 ? `:0${clock % 60}` : clock < 60 ? `:${clock % 60}`  : clock % 60 >= 10 ? `${Math.floor(clock / 60)}:${clock % 60}` : clock < 10 ? 0`${clock % 60}`:   `${Math.floor(clock / 60)}:0${clock % 60}`
                  }</h5>

                  <h3 id="time-up"
                      >{clock === 0 ? `Time's Up` : ''}
                      </h3>
                      </article>
                      <article id='test-canvas'>
               
                      <h5 id="qno">{exam.id}.</h5>
                      <h5 className='interview'>{exam.quiz}</h5>
                      </article>
                      <div id="ul-container">

                      <ul>
                          <li>
                            <input
                            ref={inputRef}
                            type='radio'
                            name='answers'
                            value={exam.options[0]}
                            onClick={(e) => attemptTracker(e, next)}
                            />
                            {exam.options[0]}
                          </li>
                          <li>
                            <input
                            ref={inputRef1}
                            type='radio'
                            name='answers'
                            value={exam.options[1]}
                            onClick={(e) => attemptTracker(e, next)}
                            />
                            {exam.options[1]}
                          </li>
                          <li>
                            <input
                            ref={inputRef2}
                            type='radio'
                            name='answers'
                            value={exam.options[2]}
                            onClick={(e) => attemptTracker(e, next)}
                            />
                            {exam.options[2]}
                          </li>
                          <li>
                        
                            <input
                               ref={inputRef3}
                               type='radio'
                               name='answers'
                               value={exam.options[3]}
                               onClick={(e) => attemptTracker(e, next)}
                               />
                            {exam.options[3]}
                          </li>
                        </ul>
                        </div>
                        {/* <section><button onClick={()=> handlePrevious(next)} id="previous">Previous</button>
                        <button onClick={()=> handleNext(next)} id="next">Next</button><button onClick={(e)=> handleSubmit(e)}>Submit</button></section> */}
                     
                {showSubmit}
                
    
                {/* <button onClick={(e)=> handleSubmit(e)}>Submit</button> */}
                {/* {navButtons} */}
                {/* <sub>Amalu productions &copy;{date}</sub> */}
                    </div> 
                )
                }
                })        
            
        ) 
}


export default TestPage