import { useState } from 'react';

import { AddCategory, GifGrid } from './components';
import './styles.css';
import './../public/vite.svg';

function App() {
  const [categories, setCategories] = useState(['One Punch']);

  const onAddCategory = newCategory => {
    if (categories.includes(newCategory)) return;
    setCategories([newCategory, ...categories]);
  };

  return (
    <>
      <h1>GifExpertApp</h1>

      <AddCategory onNewCategory={onAddCategory} />

      {categories.map(category => (
        <GifGrid category={category} key={Math.random()} />
      ))}
    </>
  );
}

export default App;
