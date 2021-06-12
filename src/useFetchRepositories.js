import {useState, useEffect} from 'react';
import axios from 'axios';


const useFetchRepositories = ({currentPage}) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [repositories, setRepositories] = useState([]);

    const url = `${process.env.REACT_APP_API_URL}/search/repositories`;
    console.log(url);
    const params = {
        q: 'created:>=2017-10-22', 
        page: currentPage,
        sort: 'stars',
        order: 'desc',
    }

    useEffect(() => {
        setLoading(true);
        setError(false);
        let cancel;
        axios({
            method: 'GET',
            url: url,
            params: params,
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res =>{
            setRepositories(res.data.items); 
        }).catch(e =>{
            if(axios.isCancel(e)) return;
            setError(true);
        })
        return () => cancel()
    },[currentPage]);

    return {loading, error, repositories};
}

export default useFetchRepositories;