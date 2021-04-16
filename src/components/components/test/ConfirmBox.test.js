import React from 'react';
import renderer from 'react-test-renderer';
import {default as ConfirmBox} from "../ConfirmBox";
describe("Confirm Box Component", ()=>{
	it('test name', () => {
		
		const tree = renderer.create(
			<ConfirmBox selectPlatform={{platformName:"test"}}
			/>
		).toJSON();
		expect(tree).toMatchSnapshot();
	});
	it('Empty Name', () => {
		
		const tree = renderer.create(
			<ConfirmBox selectPlatform={{platformName:""}}
			/>
		).toJSON();
		expect(tree).toMatchSnapshot();
	});
	it('Platform belong to this user', () => {
		
		const tree = renderer.create(
			<ConfirmBox selectPlatform={{platformName:"test",owner:"test"}} username={"test"}
			/>
		).toJSON();
		expect(tree).toMatchSnapshot();
	});
	it('Platform is not belong to this user', () => {
		
		const tree = renderer.create(
			<ConfirmBox selectPlatform={{platformName:"test",owner:"test"}} username={"te"}
			/>
		).toJSON();
		expect(tree).toMatchSnapshot();
	});
});
