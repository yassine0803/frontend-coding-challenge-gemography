import {useState, useEffect} from 'react';
import axios from 'axios';


const useFetchRepositories = (currentPage) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [repositories, setRepositories] = useState([]);

    const url = `${process.env.REACT_APP_API_URL}/search/repositories`;

    const params = {
        q: 'created:>=2017-10-22', 
        page: currentPage,
        sort: 'stars',
        order: 'desc',
    }

    let cancel;

    //remove duplicates repos
    const removeDuplicate = (data)=>{
        let newData = [...repositories, ...data];
        newData = Array.from(new Set(newData.map(JSON.stringify))).map(JSON.parse);
        setRepositories(newData);
        setLoading(false);
    }

    //fetch repositories
    const fetchData = () =>{
        console.log(currentPage);
        setLoading(true);
        setError(false);
        axios({
            method: 'GET',
            url: url,
            params: params,
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res =>{
            removeDuplicate(res.data.items); 
        }).catch(e =>{
            if(axios.isCancel(e)) return;
            setError(true);
        })
    }
    
    useEffect(() => {
        fetchData();
        return () => cancel()
    }, [currentPage])

    return {loading, error, repositories};
}

export default useFetchRepositories;