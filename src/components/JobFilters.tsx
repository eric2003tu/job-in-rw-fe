//filter by job

import React from 'react';
import { Filter, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface JobFiltersProps {
  onFilterChange: (filters: Record<string, string>) => void;
  filters: Record<string, string>;
}

const JobFilters: React.FC<JobFiltersProps> = ({ onFilterChange, filters }) => {
  const employmentTypes = ['Full-time', 'Part-time', 'Contract', 'Internship'];
  const categories = ['Technology', 'Marketing', 'Administration', 'Customer Service', 'Construction', 'Other'];
  
  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters };
    
    if (filters[key] === value) {
      delete newFilters[key];
    } else {
      newFilters[key] = value;
    }
    
    onFilterChange(newFilters);
  };

  const filterCount = Object.keys(filters).length;
  
  return (
    <motion.div 
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Filter className="h-5 w-5 text-blue-500 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        </div>
        
        {filterCount > 0 && (
          <button
            onClick={() => onFilterChange({})}
            className="text-sm text-gray-500 hover:text-gray-700 flex items-center"
          >
            Clear all
            <X className="h-4 w-4 ml-1" />
          </button>
        )}
      </div>
      
      <div className="space-y-6">
        <div>
          <h4 className="font-medium text-gray-700 mb-3">Employment Type</h4>
          <div className="flex flex-wrap gap-2">
            {employmentTypes.map(type => (
              <motion.button
                key={type}
                onClick={() => handleFilterChange('employmentType', type)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  filters.employmentType === type
                    ? 'bg-blue-100 text-blue-800 border-blue-200 shadow-sm'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border-gray-200'
                } border`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {type}
              </motion.button>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="font-medium text-gray-700 mb-3">Category</h4>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <motion.button
                key={category}
                onClick={() => handleFilterChange('category', category)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  filters.category === category
                    ? 'bg-blue-100 text-blue-800 border-blue-200 shadow-sm'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border-gray-200'
                } border`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default JobFilters;