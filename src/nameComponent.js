const NameComponent = ({verifyName,
candidate,
setCandidate,
error})=> {
    return (
        <section>
            <h2
            style={{margin: '0 0 0 2rem'}}>Enter your name to take a general knowledge test</h2>
        <input
        style={{fontSize: '2rem', margin: '2rem  0 0 10rem',
    borderWidth: '3px'}}
        type='text'
        value={candidate}
        onChange={(e) => setCandidate(e.target.value)}
        placeholder='Please Enter Your Name'
        /> 
        <h2 id="error">{error}</h2><br/>
        <button style={{fontSize: '2rem', margin: '1rem 0 0 20rem',
        padding: '1rem'}}
        onClick={verifyName}>Continue</button> 
</section>
    )
}

export default NameComponent