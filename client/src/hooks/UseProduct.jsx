
function UseProduct(url,search,page,minPrice,maxPrice,category) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        axios
            .get(`${url}`, {
                params: {
                    searchTerm: search,
                    page: page,
                    costMin: minPrice,
                    costMax: maxPrice,
                    categories: category.join(','), 
                },
                withCredentials: true
            })
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                setError(error);
            });
    }, [url, search, page, minPrice, maxPrice, category]);
    return { data, isLoading, error, setData };
}

export default UseProduct
