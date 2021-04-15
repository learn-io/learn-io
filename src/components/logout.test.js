import React from 'react';
import renderer from 'react-test-renderer';
import {default as LogoutController} from "./Menus";

const BrowserRouter = require("react-router-dom").BrowserRouter;

it('Log Out', () => {
	
	const tree = renderer.create(
	<BrowserRouter>
		<LogoutController
		/>
	</BrowserRouter>
	).toJSON();
	expect(tree).toMatchSnapshot();
});
