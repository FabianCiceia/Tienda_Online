import React, { useState, useEffect } from 'react';
import { CiSearch  } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();
    const fetchSearchResults = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/product/search?searchTerm=${searchTerm}`);
            if (response.ok) {
            const data = await response.json();
            setSearchResults(data.products);
            // console.log(data);
            } else {
            console.error('Error fetching search results:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
        };
        const search = () => {

        }
        const handleChange = (event) => {
            setSearchTerm(event.target.value);
        };
        const handleKeyDown = (event) => {
            if (event.key === 'Enter') {
                navigate(`../store/search/${searchTerm}`);
                setSearchResults([]);
            }
        };
        const handleBlur = () => {
            setSearchResults([]);
        };
        useEffect(() => {
            if (searchTerm.trim() !== '') {
                fetchSearchResults();
            } else {
                setSearchResults([]);
            }
        }, [searchTerm]);

    return (
        <div className="searchContainer">
            <div className="navbarSearch">
                <div className="input">
                <input 
                    onKeyDown={handleKeyDown}
                    onClick={() =>{fetchSearchResults()}} 
                    type="text" 
                    value={searchTerm} 
                    onChange={handleChange} 
                    // onBlur={handleBlur} 
                    placeholder='Buscar producto'/>
                </div> 
                <CiSearch className='icon' />
            </div>
            <div className='searchResult'>
                {searchResults.map((product) => (
                <div className="searchItem" key={product._id}  onClick={()=>{navigate(`./store/product/${product._id}`);setSearchTerm("");}}>
                    {/* <img src={product.imageUrl} alt="" onError={(e) => { e.target.onerror = null; e.target.src = Not_image }} /> */}
                    <p>{product.name}</p>
                    {/* <p>{product.description}</p> */}
                </div>
                ))}
            </div>
        </div>
    );
    
}

export default SearchBar;
