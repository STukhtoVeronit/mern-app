import React from 'react';

const wikiHOC = (props) => {
	class HOC extends React.PureComponent {
		constructor(props){
			super(props);
			this.onTermClick = this.onTermClick.bind(this);
		}
		onTermClick(){
			console.log('Hi wiki');

		}
		render() {
			return(<div className="wiki_block" onClick={this.onTermClick}>props.children</div>);
		}
	}

	return HOC;
};

export default wikiHOC;