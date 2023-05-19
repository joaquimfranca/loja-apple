import"../styles/header.css"
import React from 'react';
import { BsApple } from 'react-icons/bs';

export default function PageHeader(){
  return (
    <header>
      <div className="container-header">
      <h1>
       <BsApple/> Store
      </h1>
      </div>
    </header>
  );
};


