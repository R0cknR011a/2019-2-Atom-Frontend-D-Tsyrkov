import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Counter from '../components/Counter';
import ActionTypes from '../constants/ActionTypes';
import { incrementIfOdd } from '../actions/counter';

export class CounterContainer extends React.Component {
	increment = () => {
		const { dispatch } = this.props;
		dispatch({ type: ActionTypes.INCREMENT_COUNTER });
	};

	decrement = () => {
		const { dispatch } = this.props;
		dispatch({ type: ActionTypes.DECREMENT_COUNTER });
	};

	incrementIfOdd = () => {
		incrementIfOdd();
	};

	render() {
		const { counter } = this.props;

		return (
			<Counter
				counter={counter}
				increment={this.increment}
				decrement={this.decrement}
				incrementIfOdd={this.incrementIfOdd}
			/>
		);
	}
}

CounterContainer.propTypes = {
	dispatch: PropTypes.func.isRequired,
	counter: PropTypes.number.isRequired,
};

function mapStateToProps(state) {
	return {
		counter: state.counter,
	};
}

export default connect(mapStateToProps)(CounterContainer);
