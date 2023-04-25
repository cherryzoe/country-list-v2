import * as React from 'react';
import CountriesList from './CountriesList';
import './style.css';

export default function App() {
  return (
    <div>
      <div className="container">
        <h1>Countries List Debounce </h1>
        <span>Algochurn</span>
        <p>Read the description to start solving the question</p>
        <CountriesList />
      </div>
    </div>
  );
}
