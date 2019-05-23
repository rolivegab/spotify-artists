import * as React from 'react'
import Request from '../core/request'
import createStyles from '@material-ui/core/styles/createStyles'
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles'
import slugify from 'slugify'
import AccountCircle from '@material-ui/icons/AccountCircle'
import { Grid } from '@material-ui/core';

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
    wrapper: {
        width: '100%',
        margin: '0 auto',
        maxWidth: 800,
        fontFamily: 'Arial',
        fontWeight: 'bold',
        backgroundColor: 'white',
        boxShadow: '1px 1px 1px 1px gainsboro',
        height: 'calc(100vh - 60px)',
        marginTop: '30px'
    },
    picSquare: {
        backgroundColor: 'white',
        width: '100%',
        textAlign: 'center',
        padding: 32,
        boxSizing: 'border-box'
    },
    topSquare: {
        // backgroundColor: '#EA3645',
        width: '100%',
        textAlign: 'center',
        padding: 32,
        boxSizing: 'border-box'
    },
    img: {
        maxWidth: 200,
        width: '100%'
    },
    t1: {
        fontSize: 35,
    },
    t2: {
        fontSize: 24,
    },
    boxT: {
        marginBottom: 30
    },
    midBox: {
        backgroundColor: '#EA3645',
        textAlign: 'center',
        boxSizing: 'initial'
    },
    midBoxText: {
        maxWidth: 450,
        margin: '0 auto',
    },
    avatar: {
        maxWidth: '100%',
        maxHeight: 200
    },
    avatarEmpty: {
        fontSize: 150,
        color: 'lightgray'
    },
    textAlignCenter: {
        textAlign: 'center'
    },
    artistId: {
        fontWeight: 'normal',
        color: 'gray'
    },
    infoWrapper: {
        padding: 16
    },
    botSquare: {
        backgroundColor: '#EA3645'
    },
    noDecoration: {
        color: 'inherit',
        textDecoration: 'none'
    },
    itemWrapper: {
        backgroundColor: 'white',
        height: '100%',
        width: 'min-content',
        margin: '0 auto'
    },
    mt32: {
        marginTop: 32
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
        const {data: {artists}} = await Request<{artists: Artist[]}>('get-artists-info', {
            artists: this.props.artists
        })
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
        const {classes} = this.props
        return this.state.loading ? (
            <div> Carregando... </div>
        ) : (
            <Grid container className={classes.wrapper} spacing={32}>
                <Grid item xs={12} className={classes.topSquare + ' ' + classes.mt32}>
                    <div>
                        <span className={classes.t1}>Tá querendo música boa?</span>
                        <br/><br/>
                        <span className={classes.t2}>Aqui tem todos os estilos</span>
                    </div>
                </Grid>
                <Grid item xs={12} className={classes.picSquare}>
                    <img className={classes.img} src="/img/pic.png" />
                </Grid>
                <Grid item className={classes.midBox} xs={12}>
                    <p className={classes.t2 + ' ' + classes.midBoxText + ' ' + classes.mt32}>Entre no perfil dos seus artistas favoritos e seja feliz!</p>
                </Grid>
                <Grid className={classes.botSquare} item xs={12}>
                    <Grid container spacing={32}>
                        {this.state.artists.map((i, indexI) => (
                            <Grid key={indexI} item className={classes.textAlignCenter} xs={12} sm={6} md={4} lg={3}>
                                <Grid container className={classes.itemWrapper}>
                                    <Grid item>
                                        {i.images && i.images.length > 0 ? (
                                            <a href={i.external_urls.spotify}><img className={classes.avatar} src={i.images[0].url} alt=""/></a>
                                        ) : (
                                            <a href={i.external_urls.spotify}><AccountCircle className={classes.avatarEmpty} /></a>
                                        )}
                                    </Grid>
                                    <Grid item className={classes.infoWrapper}>
                                        <a className={classes.noDecoration} href={i.external_urls.spotify}>
                                            <div>{i.name}</div>
                                        </a>
                                        <div className={classes.artistId}><small>{i.id}</small></div>
                                    </Grid>
                                </Grid>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styles)(ListComponent)