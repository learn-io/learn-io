import React from 'react';
import renderer from 'react-test-renderer';
import {default as HomeController} from "../home";
describe("Home Controller", ()=>{
	it('home test', () => {
		
		const tree = renderer.create(
			<HomeController isSignedIn={false}
			/>
		).toJSON();
		expect(tree).toMatchSnapshot();
	});

});