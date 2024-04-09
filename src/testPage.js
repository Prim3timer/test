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
    submitButton
  })=>{
    const [clock, setClock]= useState(quiz.length * 10)

        let showSubmit = submitButton ? <button onClick={(e)=> handleSubmit(e)}>Submit</button> :  ''
            
            
useEffect(()=> {
  const interval = setInterval(()=>{
      if (started === true) {
        setClock(clock - 1)
      }
    }, 1000)
    if (clock < 1) setClock(0)
    return ()=> clearInterval(interval)
}, [clock])
useEffect(()=>{
  if (next === 24) setSubmitButton(true)
  console.log(next)
}, [next])
        return (

            quiz.map((exam, index)=> {
                if(index === next){
              
                
                  return (
                    <div key={exam.id} id="test-page">
                      <h4 id="clock">{clock < 60 ? `:${clock % 60}` : clock % 60 >= 10 ? `${Math.floor(clock / 60)} : ${clock % 60}` :   `${Math.floor(clock / 60)} : 0${clock % 60}`}</h4>
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
                        <button onClick={()=> handlePrevious(next)} id="previous">Previous</button>
                        <button onClick={()=> handleNext(next)}>Next</button>
                {showSubmit}
                    </div> 
                )
                }
                })        
            
        ) 
}


export default TestPage