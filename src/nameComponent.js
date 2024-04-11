const NameComponent = ({verifyName,
candidate,
setCandidate,
quiz,
clock,
error})=> {
    let time = quiz.length * 10
    return (
        <section id="name-component">
        
            <h4 id="instructions"
           >You have {Math.floor(time/60)} munites {time % 60}{clock % 60 === 0 ? '' : ', seconds'} to complete a 
            general knowledge test. Enter your name and click the 'Continue' button to start.</h4>
        <input id="name-taker"
        
        type='text'
        value={candidate}
        onChange={(e) => setCandidate(e.target.value)}
        placeholder='Please Enter Your Name'
        /> 
        <h2 id="error" style={{color:'red'}}>{error}</h2><br/>
        <button id="continuity" 
        onClick={verifyName}>Continue</button> 
</section>
    )
}

export default NameComponent