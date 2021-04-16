import React from 'react';
import renderer from 'react-test-renderer';
import {default as YourPagesController} from "../YourPage";
describe("Your page controller", ()=>{
	it('test without login', () => {
		
		const tree = renderer.create(
			<YourPagesController isSignedIn={false}
			/>
		).toJSON();
		expect(tree).toMatchSnapshot();
	});
});
