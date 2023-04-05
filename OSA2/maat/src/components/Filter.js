const Filter = ( {newSearch, handleSearch}) => {
    return (
        <div>Search for countries<input value={newSearch} onChange={handleSearch}></input></div>
    )
}
export default Filter