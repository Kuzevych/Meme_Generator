import React, {Component} from 'react';

export default class MemeGenerator extends Component {
    constructor(){
        super()
        this.state = {
            topText: '',
            bottomText: '',
            randomImg: 'http://i.imgflip.com/1bij.jpg',
            allMemeImg : []
        }
    }
    componentDidMount() {
        fetch('https://api.imgflip.com/get_memes')
            .then(resolve => resolve.json())
            .then(response => {
                const { memes } = response.data;
                this.setState({allMemeImg: memes})
            })
    }

    handleChange = (event) => {
        const {value, name} = event.target;
        this.setState({
            [name]: value
        })
    }
    handleSubmit = () => {
        event.preventDefault();
        const imageIndex = Math.floor(Math.random()*100);
        this.setState({
            randomImg: this.state.allMemeImg[imageIndex].url
        })
    }

    render() {
        return (
            <div>
                <form className="meme-form" onSubmit={this.handleSubmit}>
                    <input
                        type='text'
                        name='topText'
                        value={this.state.topText}
                        placeholder='Top Text'
                        onChange={this.handleChange}
                    />
                    <input
                        type='text'
                        name='bottomText'
                        value={this.state.bottomText}
                        placeholder='Bottom Text'
                        onChange={this.handleChange}
                    />
                    <button>Gen</button>
                </form>
                    <div className="meme">
                        <img align="center" src={this.state.randomImg} alt="" />
                        <h2 className="top">{this.state.topText}</h2>
                        <h2 className="bottom">{this.state.bottomText}</h2>
                    </div>
            </div>
        );
    }
}
