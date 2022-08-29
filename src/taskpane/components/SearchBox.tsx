import React, { useEffect, useState } from 'react'

const SearchBox = () => {

    const [searchText, setSearchText] = useState('');
    const [searchData, setSearchData] = useState()

    useEffect(() => {
        
        getData()
    }, [])

    const handleSearch = (e) => {
       
        setSearchText(e.target.value)
    }

    const getData = async () => {
        const response = await fetch("https://reqres.in/api/users/")
        const jsonData = await response.json()

        setSearchData(jsonData.data)
    }

  



    return (
        <div>
            <div className="searchbar-container">
                <input className='search-input' placeholder='Enter Name to Search' value={searchText}
                    onChange={(e) => handleSearch(e)}
                />
            </div>
        </div>
    )
}

export default SearchBox