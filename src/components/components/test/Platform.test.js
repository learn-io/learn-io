import React from 'react';
import renderer from 'react-test-renderer';
import {default as Platform} from "../Platform";

describe("Single Platform Component", ()=>{
	it('no name', () => {
		
		const tree = renderer.create(
			<Platform name={''}
			/>
		).toJSON();
		expect(tree).toMatchSnapshot();
	});
	it('test name', () => {
		
		const tree = renderer.create(
			<Platform name={'test'}
			/>
		).toJSON();
		expect(tree).toMatchSnapshot();
	});
});