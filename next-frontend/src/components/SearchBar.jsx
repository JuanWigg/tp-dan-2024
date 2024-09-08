'use client'

function SearchBar( props ) {
  return (
    <div className='relative flex flex-1 flex-shrink-0'>
        <label htmlFor="search" className='sr-only'>
            Buscar
        </label>
        <input className='peer p-1 block w-80 md:w-96 rounded-md border border-gray-200 text-sm placeholder:text-gray-500 focus:outline-none'
            placeholder={ props.placeholderText } onChange={props.onChange}/>
    </div>
  )
}

export default SearchBar