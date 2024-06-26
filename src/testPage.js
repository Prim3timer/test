import { useEffect, useState } from "react"
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
    setSubmitButton,
    submitButton,
    clock,
    setClock
  })=>{
    let showSubmit = clock === 0 ? <section><button 
    id="submit"
    style={{marginLeft: '10rem'}}
    onClick={(e)=> handleSubmit(e)}>Submit</button></section> : submitButton ? <section><button 
    onClick={()=> handlePrevious(next)} 
    id={next < 1 ? 'nbu' : 'previous'}
    >Previous</button>
        <button onClick={()=> handleNext(next)}
         id={next > quiz.length - 2 ? 'ozo' : 'next'}
        >Next</button><button onClick={(e)=> handleSubmit(e)}
        id="submit"
        >Submit</button></section> : <section><button 
        id={next < 1 ? 'nbu' : 'previous'}
        onClick={()=> handlePrevious(next)}
        >Previous</button>
      <button 
        id={next > quiz.length - 2 ? 'ozo' : 'next'}
      onClick={()=> handleNext(next)}
      >Next</button></section>

  

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
  console.log(next)
}, [next])
        return (

            quiz.map((exam, index)=> {
                if(index === next){
              
                
                  return (
                    <div key={exam.id} id="test-page">
                      <article
                      style={{display: 'grid',
                    gridTemplateColumns: 'repeat(4, 200px'}}
                      >

                      <h4 id="clock"
                      >{clock < 10 ? `:0${clock % 60}` : clock < 60 ? `:${clock % 60}`  : clock % 60 >= 10 ? `${Math.floor(clock / 60)}:${clock % 60}` : clock < 10 ? 0`${clock % 60}`:   `${Math.floor(clock / 60)}:0${clock % 60}`
                      }</h4><span id="time-up"
                      style={{fontWeight:'bold'}}
                      >{clock === 0 ? `Time's Up` : ''}
                      </span>
                      </article>
                      <article id='test-canvas'>
               
                      <span>{exam.id}.</span>
                      <h4 className='interview'>{exam.quiz}</h4>
                      </article>
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
                        {/* <section><button onClick={()=> handlePrevious(next)} id="previous">Previous</button>
                        <button onClick={()=> handleNext(next)} id="next">Next</button><button onClick={(e)=> handleSubmit(e)}>Submit</button></section> */}
                     
                {showSubmit}
                
    
                {/* <button onClick={(e)=> handleSubmit(e)}>Submit</button> */}
                {/* {navButtons} */}
                    </div> 
                )
                }
                })        
            
        ) 
}


export default TestPage