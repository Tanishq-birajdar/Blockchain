import Register from './components/Register';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import './App.css'
import SearchForm from './components/SearchForm';
import User from './components/User';
import Mutation from './components/Mutation';
import Records from './components/Records';
import VendorList1 from './components/VendorList1';

function App() {
  return (
    <div className='gofor'>
      <Sidebar/>
      <Routes>
        <Route path='/register' element={<User/>}/>
        <Route path='/search' element={<SearchForm/>}/>
        <Route path='/mutation' element={<Mutation/>}/>
        <Route path='/records' element={<Records/>}/>
        <Route path='/vendorlist' element={<VendorList1/>}/>
      </Routes>
    </div>
  );
}

export default App;
