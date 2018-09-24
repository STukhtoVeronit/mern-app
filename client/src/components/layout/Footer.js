import React from 'react';

const Footer = () => {
	return (
		<footer className="page-footer bg-dark text-white mt-5 p-4 text-center">
			{new Date().getFullYear()} DevConnect
		</footer>
	);
};

export default Footer;