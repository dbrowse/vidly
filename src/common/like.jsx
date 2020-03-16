import React, { Component } from "react";

//Input: liked: boolen
//Output:  when liked / clicked full heart.
//Who will be notifyed about  state?

const Like = props => {
	let classes = "fa fa-heart";
	if (!props.liked) classes += "-o";

	return <i onClick={props.onClick} className={classes} aria-hidden='true'></i>;
};

export default Like;
