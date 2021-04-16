import React from 'react';
import renderer from 'react-test-renderer';
import {default as SearchBox} from "../SearchBox";

describe("Search Box Component", ()=>{
	it('no text', () => {
		
		const tree = renderer.create(
			<SearchBox text={''}
			/>
		).toJSON();
		expect(tree).toMatchSnapshot();
	});
	it('test text', () => {
		
		const tree = renderer.create(
			<SearchBox text={'test'}
			/>
		).toJSON();
		expect(tree).toMatchSnapshot();
	});
});