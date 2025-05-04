import ResultSheet from "./resultSheet"

const AllResults = ({
    results,
}) => {
    return results.map((result)=> {
        console.log(result)
        return <ResultSheet key={result.ade} reportCard={result}
        />
    })
}

export default AllResults