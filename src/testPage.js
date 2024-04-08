import { useEffect } from "react"
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
    handleNext})=>{

        let showButtons = next < 24 ? <article> <button onClick={()=> handlePrevious(next)} id="previous">Previous</button>
        <button onClick={()=> handleNext(next)}>Next</button>
        </article> :  <button onClick={(e)=> handleSubmit(e)}>Submit</button>

        return (

            quiz.map((exam, index)=> {
                if(index === next){
                
                  return (
                    <div key={exam.id} id="test-page">
                      <article >
               
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
            
                {showButtons}
                    </div> 
                )
                }
                })        
            
        ) 
}


export default TestPage