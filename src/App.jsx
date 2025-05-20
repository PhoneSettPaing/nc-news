import { useState } from 'react'
import Header from './components/Header'
import FilterBar from './components/FilterBar'
import ArticleList from './components/ArticleList'

function App() {

  return (
    <>
    <Header />
    <FilterBar />
    <ArticleList />
    </>
  )
}

export default App
