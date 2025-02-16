import React from "react";
import ReactDOM from "react-dom";

interface ReactPortalProps {
	children: React.ReactNode;
}

const ReactPortal: React.FC<ReactPortalProps> = ({ children }) => {
	const modalRoot = document.getElementById("modal-root");
	if (!modalRoot) {
		console.error("Modal root element not found. Please add a div with id='modal-root' to your HTML.");
		return null;
	}

	return ReactDOM.createPortal(children, modalRoot);
};

export default ReactPortal;