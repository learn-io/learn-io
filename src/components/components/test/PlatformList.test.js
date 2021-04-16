import React from 'react';
import renderer from 'react-test-renderer';
import {default as PlatformList} from "../PlatformList";

describe("Platform List Component", ()=>{
	it('test three platforms', () => {
		
		const tree = renderer.create(
			<PlatformList platforms={[{platformName:"test"},{platformName:"test2"},{platformName:"test3"}]}
			/>
		).toJSON();
		expect(tree).toMatchSnapshot();
	});
	it('test no platform', () => {
		
		const tree = renderer.create(
			<PlatformList platforms={[]}
			/>
		).toJSON();
		expect(tree).toMatchSnapshot();
	});
	it('test four platforms', () => {
		
		const tree = renderer.create(
			<PlatformList platforms={[{platformName:"test"},{platformName:"test2"},{platformName:"test3"},{platformName:"test4"}]}
			/>
		).toJSON();
		expect(tree).toMatchSnapshot();
	});
});