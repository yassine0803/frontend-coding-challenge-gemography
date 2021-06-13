import {useState} from 'react';
import {Navbar, Repositories} from "./components";
import useFetchRepositories from './useFetchRepositories';

const App = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const {repositories, loading, error}=useFetchRepositories(currentPage);
  return (  
    <div>
      <Navbar />
      <Repositories repositories={repositories} loading={loading} error={error} setCurrentPage={setCurrentPage} />
    </div>
  );
}
 
export default App;
 
