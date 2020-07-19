import React from 'react';
import axios from 'axios';

class Fib extends React.Component {
    state = {
        oldIndexed: [],
        values: {},
        index: '',
    };

    componentDidMount() {
        this.fetchValues();
        this.fetchIndexed();
    }

    async fetchValues() {
        const values = await axios.get('/api/values/current');
        this.setState({ values: values.data });
    }

    async fetchIndexed() {
        const savedindex = await axios.get('/api/values/all');
        this.setState({ oldIndexed: savedindex.data });
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('/api/values', {
            index: this.state.index,
        });
        this.setState({ index: '' });
    };

    renderSeenIndexes() {
        return this.state.oldIndexed.map(({ number }) => number).join(', ');
    }

    renderCaculatedValues() {
        const result = [];
        for (let key in this.state.values) {
            result.push(
                <div key={key}>
                    Index {key} : its value is {this.state.values[key]}
                </div>
            );
        }
        return result;
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Enter your index:</label>
                    <input
                        value={this.state.index}
                        onChange={(e) =>
                            this.setState({ index: e.target.value })
                        }
                    />
                    <button>Submit</button>
                </form>
                <h3>Indexes have been submitted: </h3>
                {this.renderSeenIndexes()}
                <h3>Caculated Values: </h3>
                {this.renderCaculatedValues()}
            </div>
        );
    }
}

export default Fib;
