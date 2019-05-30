import Gesture, { SWIPE_DIRECTION } from "./Gesture";

jest.useFakeTimers();

describe('Gesture tests', () => {
    it('Swipe left', () => {
        const mockPointerDown = {clientX: 100, clientY: 100, preventDefault: () => {}, stopPropagation: () => {}};
        const mockPointerUp = {clientX: 0, clientY: 100, preventDefault: () => {}, stopPropagation: () => {}};
        const mockOnSwipe = jest.fn();
        const gesture = new Gesture({onSwipe: mockOnSwipe});
        gesture.onPointerDown(mockPointerDown);
        gesture.onPointerUp(mockPointerUp);

        jest.runAllTimers();

        expect(mockOnSwipe.mock.calls.length).toBe(1);
        expect(mockOnSwipe.mock.calls[0][0]).toBe(SWIPE_DIRECTION.LEFT);
    });
});