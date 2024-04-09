const NameComponent = ({verifyName,
candidate,
setCandidate,
quiz,
error})=> {
    let time = quiz.length * 10
    return (
        <section>
        
            <h4 id="instructions"
           >You have {Math.floor(time/60)}:{time % 60} to complete a 
            general knowledge test. Enter you name and click the the continue button to begin.</h4>
        <input id="name-taker"
        
        type='text'
        value={candidate}
        onChange={(e) => setCandidate(e.target.value)}
        placeholder='Please Enter Your Name'
        /> 
        <h2 id="error">{error}</h2><br/>
        <button id="continuity" style={{fontSize: '2rem', margin: '0 0 0 18rem'}}
        onClick={verifyName}>Continue</button> 
</section>
    )
}

export default NameComponent