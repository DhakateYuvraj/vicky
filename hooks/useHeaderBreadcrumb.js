'use client';
import { createContext, useContext, useState } from 'react';

const HeaderBreadcrumbContext = createContext(null);

export const HeaderBreadcrumbProvider = ({ children }) => {
  const [header, setHeader] = useState('');
  const [breadcrumb, setBreadcrumb] = useState([]);

  return (
    <HeaderBreadcrumbContext.Provider value={{ 
      header, 
      setHeader, 
      breadcrumb, 
      setBreadcrumb 
    }}>
      {children}
    </HeaderBreadcrumbContext.Provider>
  );
};

export const useHeaderBreadcrumb = () => {
  const context = useContext(HeaderBreadcrumbContext);
  if (!context) {
    throw new Error('useHeaderBreadcrumb must be used within a HeaderBreadcrumbProvider');
  }
  return context;
};