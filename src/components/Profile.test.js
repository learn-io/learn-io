import React from 'react';
import renderer from 'react-test-renderer';
import {default as ProfileController, Badges, Stats, Progress} from "./Profile";

describe("Profile Controller", ()=>{
    it('Logged Out', () => {
        const tree = renderer.create(
            <ProfileController isSignedIn={false}
            />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

});
describe("Badges", ()=>{
    it('Empty', () => {
        const tree = renderer.create(
            <Badges userPlatformInfo={[]}
            />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    }); 
    /*it('One Platform', () => {
        const tree = renderer.create(
            <Badges
            />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    }); 
    it('Five Platforms', () => {
        const tree = renderer.create(
            <Badges
            />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    }); */
});
describe("Stats", ()=>{
    it('Empty', () => {
        const tree = renderer.create(
            <Stats userPlatformInfo={[]}
            />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    }); 
    /*it('One Platform', () => {
        const tree = renderer.create(
            <Stats
            />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    }); 
    it('Five Platforms', () => {
        const tree = renderer.create(
            <Stats
            />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    }); */
});
describe("Progress", ()=>{
    it('Empty', () => {
        const tree = renderer.create(
            <Progress userPlatformInfo={[]}
            />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    }); 
    /*it('One Platform', () => {
        const tree = renderer.create(
            <Progress
            />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    }); 
    it('Five Platforms', () => {
        const tree = renderer.create(
            <Progress
            />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    }); */
});