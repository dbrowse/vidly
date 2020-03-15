import React, { Component } from "react";

//Input: liked: boolen
//Output:  when liked / clicked full heart.
//Who will be notifyed about this state?

class Like extends Component {
	render() {
		let classes = "fa fa-heart";
		if (!this.props.liked) classes += "-o";

		return (
			<i
				onClick={this.props.onClick}
				className={classes}
				aria-hidden='true'
			></i>
		);
	}
}

export default Like;
