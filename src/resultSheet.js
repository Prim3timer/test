import { useState } from 'react'
import quiz from './questions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes, faArrowRight } from "@fortawesome/free-solid-svg-icons"
const ResultSheet = ({final, setFinal, candidate,
    reportCard,
showResults})=> {
console.log(reportCard)
    let assessmentArray = []
    let mainMan = Object.values(reportCard)

console.log(final)
console.log(mainMan[2][0])   
for (let i = 0; i < quiz.length; i++){
    const assessmentObject = {
        q_no: mainMan[3][i], qs: mainMan[4][i], attempt: mainMan[5][i],
         correctAnswer: mainMan[6][i]
    }
    assessmentArray.push(assessmentObject)
}
console.log(assessmentArray)
let score = 0
for (let i = 0; i < quiz.length; i++){
    if (assessmentArray[i].attempt === assessmentArray[i].correctAnswer){
        score += 100 / quiz.length
    } 
}


console.log(score)

    return (
        <article id='result-table'>
            <main id='cred' 
            style={{
                marginTop: '2rem',
                marginBottom: '1rem',
            //    display: 'flex',
            //    alignItems: 'flexStart',
            flexDirection: 'row',
            // flexGrow: 1,
            // flexBasis: '5%',
            //    columnGap: '1rem',
            // rowGap: '3rem',
               marginLeft: '1rem'
                // backgroundColor: 'green'
            }}
            >
 <button
                         style={{
                          display: candidate === 'Dike' ? 'block' : 'none',
                        //   marginBottom: '2rem'
                         }}
                    onClick={showResults}
                    >View Results</button>
                    <article
                  id='strictCred'
                    >
                        
            <h4 id='name'
            >Name: {reportCard.candidate},</h4>
            <h4 id='score'>Score: {score}%</h4>
            </article>
            </main>
            <table id='tableA'>
                    <tr style={{backgroundColor: 'cadetblue'}}>
                    <th>Q. no.</th>
                    <th>remark</th>
                    <th>your answer</th>
                    <th>correct answer</th>
                    <th>questions</th>
                </tr>
            
                {/* const {q_no, qs, yourAnswer, correctAnswer, comment} = final */}
 {assessmentArray && assessmentArray.map((prop, index)=> {
    return    <tr style={{backgroundColor: index % 2 === 0 ?
                'white' : 'lightskyblue'}}>
        <td
        style={{width: '10%'}}
        >{prop.q_no}.</td>
         {prop.attempt === prop.correctAnswer ? <td style={{color: 'green',
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
        <td style={{width: '20%'}}>{prop.attempt}</td>
        <td style={{width: '20%'}}>{prop.correctAnswer}</td>
        <td className='questions'>{prop.qs}</td>      
    </tr>
 })}
        
            </table>
        </article>
    )
}


export default ResultSheet