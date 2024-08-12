import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const useAxios = (url) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios
            .get(url, { withCredentials: true })
            .then((response) => {
                // console.log(response.data)
                setData(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                setError(error);
                setIsLoading(false);
                console.log(error);
            });
    }, [url]);
    return { data, isLoading, error, setData };

}

export default useAxios


// import axios from "axios";
// import { useState, useEffect } from "react";

// const useAxios = (url, search = null, page = null, minPrice = 0, maxPrice = null, category = []) => {
//     const [data, setData] = useState(null);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchData = () => {
//             axios
//                 .get(url, { 
//                     params: {
//                         searchTerm: search,
//                         page: page,
//                         costMin: minPrice,
//                         costMax: maxPrice,
//                         categories: category.join(','), 
//                         pageSize: 20,
//                     },
//                     withCredentials: true
//                 })
//                 .then((response) => {
//                     setData(response.data);
//                     setIsLoading(false);
//                 })
//                 .catch((error) => {
//                     setError(error);
//                     setIsLoading(false);
//                     console.log(error);
//                 });
//         };

//         fetchData();
//     }, [url, search, page, minPrice, maxPrice, category]);

//     return { data, isLoading, error, setData };
// }

// export default useAxios;
