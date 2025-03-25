
import React from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SearchBar: React.FC = () => {
  const navigate = useNavigate();

  const handleSearchClick = () => {
    navigate('/select-service');
  };

  return (
    <div className="my-6 transition-all duration-300 animate-fade-in">
      <div 
        className="glass rounded-full flex items-center px-4 py-3 search-box-focus cursor-pointer"
        onClick={handleSearchClick}
      >
        <input
          type="text"
          placeholder="Search any service"
          className="bg-transparent border-none focus:outline-none flex-1 text-gray-700 placeholder-gray-400 cursor-pointer"
          readOnly
          onClick={handleSearchClick}
        />
        <Search size={20} className="text-gray-400" />
      </div>
    </div>
  );
};

export default SearchBar;
