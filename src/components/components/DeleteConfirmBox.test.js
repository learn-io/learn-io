import React from 'react';
import renderer from 'react-test-renderer';
import {default as DeleteConfirmBox} from "./DeleteConfirmBox";

it('Delete Confirm Box', () => {
	
	const tree = renderer.create(
		<DeleteConfirmBox deletePlatform={{platformName:"test"}}
		/>
	).toJSON();
	expect(tree).toMatchSnapshot();
});
