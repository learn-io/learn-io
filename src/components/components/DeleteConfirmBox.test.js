import React from 'react';
import renderer from 'react-test-renderer';
import {default as DeleteConfirmBox} from "./DeleteConfirmBox";
describe("Delete Confirm Box Component", ()=>{
	it('test name', () => {
		
		const tree = renderer.create(
			<DeleteConfirmBox deletePlatform={{platformName:"test"}}
			/>
		).toJSON();
		expect(tree).toMatchSnapshot();
	});
	it('Empty Name', () => {
		
		const tree = renderer.create(
			<DeleteConfirmBox deletePlatform={{platformName:""}}
			/>
		).toJSON();
		expect(tree).toMatchSnapshot();
	});
});
