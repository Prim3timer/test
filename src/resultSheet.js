import { useState } from 'react'
import quiz from './questions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons"
const ResultSheet = ({final, setFinal, candidate,
next})=> {

    let assessmentArray = []
    let mainMan = Object.values(final)
console.log(mainMan[2][0])
for (let i = 0; i < quiz.length; i++){
    const assessmentObject = {
        q_no: mainMan[1][i], qs: mainMan[2][i], attempt: mainMan[3][i],
         correctAnswer: mainMan[4][i]

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
               display: 'flex',
            //    alignItems: 'flexStart',
               columnGap: '1rem',
               marginLeft: '1rem'
                // backgroundColor: 'green'
            }}
            >

            <h2 id='name'
            >Name: {candidate},</h2>
            <h2 id='score'>Score: {score}%</h2>
            </main>
            <table id='tableA'>
                    <tr style={{backgroundColor: 'aqua'}}>
                    <th>Q. no.</th>
                    <th>comment</th>
                    <th>your answer</th>
                    <th>correct answer</th>
                    <th>questions</th>
                </tr>
            
                {/* const {q_no, qs, yourAnswer, correctAnswer, comment} = final */}
 {assessmentArray.map((prop, index)=> {
    return    <tr style={{backgroundColor: index % 2 === 0 ?
                'white' : 'lightskyblue'}}>
        <td
        style={{width: '10%'}}
        >{prop.q_no}.</td>
         {prop.attempt === prop.correctAnswer ? <td style={{color: 'green',
            fontSize: '1.2rem'
        }}>
            <FontAwesomeIcon icon={faCheck}/>
            {/* correct */}
            </td>
         : <td style={{color: 'red',
             fontSize: '1.2rem',
         }}>
                  <FontAwesomeIcon icon={faTimes}/>
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