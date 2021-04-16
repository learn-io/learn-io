import React from 'react';
import renderer from 'react-test-renderer';
import {default as PreviousButton} from "../PreviousButton";

describe("Previous Button Component", ()=>{
	it('first page', () => {
		
		const tree = renderer.create(
			<PreviousButton skip={0}
			/>
		).toJSON();
		expect(tree).toMatchSnapshot();
	});
	it('skip some platforms to show next page', () => {
		
		const tree = renderer.create(
			<PreviousButton skip={10}
			/>
		).toJSON();
		expect(tree).toMatchSnapshot();
	});
});