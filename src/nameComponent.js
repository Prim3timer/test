const NameComponent = ({verifyName,
candidate,
setCandidate,
error})=> {
    return (
        <section>
        <input
        style={{fontSize: '4rem', margin: '0 10rem'}}
        type='text'
        value={candidate}
        onChange={(e) => setCandidate(e.target.value)}
        placeholder='Please Enter Your Name'
        /> 
        <h2>{error}</h2><br/>
        <button style={{fontSize: '4rem', margin: '2rem 0 0 20rem'}}
        onClick={verifyName}>Continue</button> 
</section>
    )
}

export default NameComponent