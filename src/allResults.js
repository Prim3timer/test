import ResultSheet from "./resultSheet"

const AllResults = ({
    results,
}) => {
           
    return results && results.map((result)=> {
        console.log(result)
        return <ResultSheet reportCard={result}
        />
    })
}

export default AllResults