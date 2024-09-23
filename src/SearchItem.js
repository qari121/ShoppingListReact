import React from 'react'

const SearchItem = ({setSearch,search}) => {
  return (
    <form className='searchForm' onSubmit={(e) =>e.preventDefault()}>
        <label htmlFor='search'> Search</label> 
        <input
         id="Search"
         type='text'
         role='searchbox'
         placeholder='Search Items'
         value={search}
         onChange={(e) => setSearch(e.target.value)}
         ></input>

    </form>
  )
}

export default SearchItem
