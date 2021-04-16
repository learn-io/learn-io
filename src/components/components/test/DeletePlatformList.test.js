import React from 'react';
import renderer from 'react-test-renderer';
import {default as DeletePlatformList} from "../DeletePlatformList";

describe("Delete Platform List Component", ()=>{
	it('test three platforms', () => {
		
		const tree = renderer.create(
			<DeletePlatformList platforms={[{platformName:"test"},{platformName:"test2"},{platformName:"test3"}]}
			/>
		).toJSON();
		expect(tree).toMatchSnapshot();
	});
	it('test no platform', () => {
		
		const tree = renderer.create(
			<DeletePlatformList platforms={[]}
			/>
		).toJSON();
		expect(tree).toMatchSnapshot();
	});
	it('test four platforms', () => {
		
		const tree = renderer.create(
			<DeletePlatformList platforms={[{platformName:"test"},{platformName:"test2"},{platformName:"test3"},{platformName:"test4"}]}
			/>
		).toJSON();
		expect(tree).toMatchSnapshot();
	});
});