import React, { useState, useEffect } from 'react';
import { CiSearch  } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const fetchSearchResults = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/product/search?searchTerm=${searchTerm}`);
            if (response.ok) {
                setIsLoading(false)
                const data = await response.json();
                setSearchResults(data.products);
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
    useEffect(() => {
        if (searchTerm.trim() !== '') {
            fetchSearchResults();
        } else {
            setSearchResults([]);
        }
    }, [searchTerm]);

    return (
        <div className="searchContainer" >
            <div className="navbarSearch">
                <div className="input">
                <input 
                    onKeyDown={handleKeyDown}
                    onClick={() =>{fetchSearchResults()}} 
                    type="text" 
                    value={searchTerm} 
                    onChange={handleChange} 
                    placeholder='Buscar producto'/>
                </div> 
                <CiSearch className='icon' />
            </div>
            <div className='searchResult'>
                {searchResults.map((product) => (
                    <div className="searchItem" key={product._id}  onClick={()=>{navigate(`./store/product/${product._id}`);setSearchTerm("");}}>
                        <p>{product.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
    
}

export default SearchBar;
