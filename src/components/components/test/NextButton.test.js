import React from 'react';
import renderer from 'react-test-renderer';
import {default as NextButton} from "../NextButton";

describe("Next Button Component", ()=>{
	it('not platforms for next page', () => {
		
		const tree = renderer.create(
			<NextButton nextPlatforms={false}
			/>
		).toJSON();
		expect(tree).toMatchSnapshot();
	});
	it('some platforms for next page', () => {
		
		const tree = renderer.create(
			<NextButton nextPlatforms={true}
			/>
		).toJSON();
		expect(tree).toMatchSnapshot();
	});
});