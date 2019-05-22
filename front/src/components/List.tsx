import * as React from 'react'
import Request from '../core/request'
import createStyles from '@material-ui/core/styles/createStyles'
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import slugify from 'slugify'
import AccountCircle from '@material-ui/icons/AccountCircle'

interface Artist { 
    external_urls: {
        spotify: string
    }
    followers: {
        href: null,
        total: number
    }
    genres: string[],
    href: string
    id: string
    images: Array<{
        height: number
        url: string
        width: number
    }>
    name: string
    popularity: number
    type: 'artist'
    uri: string
}

interface State {
    loading: boolean
    artists: Artist[]
}

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

interface Props extends WithStyles<typeof styles> {
    artists: string[]
}

class ListComponent extends React.Component<Props, State> {

    names = []

    constructor(p: any) {
        super(p)

        this.state = {
            loading: true,
            artists: [],
        }
    }

    async componentDidMount() {
        const {data: {artists}} = await Request('get-artists-info', {
            artists: this.props.artists
        })
        console.log('artists', artists)
        this.setState({ artists, loading: false })
    }

    slugify(name: string) {
        const slug = slugify(name)
        if (this.names.every(i => i !== slug)) {
            return slug
        }

        if (name.match(/-\d*$/)) {
            name = name.replace(/-\d*$/, (p, a, w) => '-' + (~~p.slice(1) + 1))
        } else {
            name = name + '-1'
        }

        this.slugify(name)
    }

    render() {
        return this.state.loading ? (
            <div> Carregando... </div>
        ) : (
            <List className={this.props.classes.root}>
                {this.state.artists.map((i, indexI) => (
                    <ListItem key={indexI} alignItems="flex-start">
                        <ListItemAvatar>
                            {i.images.length > 0 ? (
                                <Avatar alt={`${this.slugify(i.name)}-avatar`} src={i.images[0].url} />
                            ) : (
                                <AccountCircle />
                            )}
                        </ListItemAvatar>
                        <ListItemText
                            primary={i.name}
                            // secondary={<>
                            //     <Typography component="span" className={this.props.classes.inline} color="textPrimary">
                            //         Ali Connors
                            //     </Typography>
                            //     {" — I'll be in your neighborhood doing errands this…"}
                            // </>}
                            secondary={i.uri}
                        />
                    </ListItem>
                ))}
            </List>
        )
    }
}

export default withStyles(styles)(ListComponent)