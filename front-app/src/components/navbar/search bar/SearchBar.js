import React, { Component } from "react";

//CSS
import './SearchBar.css';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.items = [
            'David',
            'Miau miau',
            'Sara',
            'Justinian Augustinian',
            'Justinian Augustinian2',
            'Justinian Augustinian3',
            'Justinian Augustinian4',
            'Justinian Augustinian5'
        ];

        this.state = {
            suggestions: [],
            text: '',
        };
    }

    onTextChanged = (e) => {
        const value = e.target.value;

        let suggestions = [];

        if (value.length > 0) {
            const regex = new RegExp(`^${value}`, 'i');
            suggestions = this.items.sort().filter(v => regex.test(v));
        }

        this.setState(() => ({ suggestions, text: value }));
    }

    suggestionSelected(value){
        this.setState(() => ({
            text: value,
            suggestions: []
        }))
    }

    renderSuggestions() {
        const { suggestions } = this.state;

        if (suggestions.length === 0) {
            return null;
        }

        return (
            <ul className="suggestion-list">
                {suggestions.map((item) => <li onClick={() => this.suggestionSelected(item)}>{item}</li>)}
            </ul>
        );
    }

    render() {
        const { text } = this.state;

        return (
            <div className="search-bar">
                <input className="search-bar-input" value={text} onChange={this.onTextChanged} type="text"></input>
                {this.renderSuggestions()}
            </div>
        )
    }

}

export default SearchBar;