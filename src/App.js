import {useState} from 'react';
import Navbar from "./components/Navbar/Navbar";
import useFetchRepositories from './useFetchRepositories';
import Repositories from "./components/Repositories/Repositories";

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
 
