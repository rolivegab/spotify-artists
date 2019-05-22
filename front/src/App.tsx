import React from 'react'
import ListComponent from './components/List'

const artists = ['0TcVnvKse98awlZxtUKIOk', '11irmEzISytQwB3G8uhC5E', '2UhA8yc1DpFfkutXq5lMah']

const App = () => {
  return (
    <ListComponent artists={artists} />
  )
}

export default App
