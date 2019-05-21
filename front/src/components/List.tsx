import * as React from 'react'
import {Authorize} from '../core/request'

interface State {
    loading: boolean
}

interface Props {
    artists: Array<string>
}

export default class Test extends React.Component<Props, State> {
    constructor(p: any) {
        super(p)

        this.state = {
            loading: true
        }
    }

    async componentDidMount() {
        const {data} = await Authorize()
        console.log(data)
    }

    render() {
        return (
            <div> Carregando... </div>
        )
    }
}