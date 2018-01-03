// ./src/__tests__/KeyboardTextInputPrompt-test.js
import React from 'react';
import KeyboardTextInputPrompt from '../KeyboardTextInputPrompt';

import renderer from 'react-test-renderer';

describe('>>> KeyboardTextInputPrompt --- Test rendering component', () => {
    it('should render correctly', () => {
        const tree = renderer.create(
            <KeyboardTextInputPrompt
            />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});