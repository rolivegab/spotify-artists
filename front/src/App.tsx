import React from 'react'
import { withStyles, WithStyles, createStyles } from '@material-ui/core'
import ListComponent from './components/List'

const artists = [
  'Gabriel',
  'Anne'
]

const styles = createStyles({
  root: {
    width: '100%',
    maxWidth: 360,
    // backgroundColor: 'red'
  },
  inline: {
    display: 'inline'
  }
})

const App = (props: WithStyles<typeof styles>) => {
  return (
    <ListComponent artists={artists} />
  )
}

export default withStyles(styles)(App)
