const EVENT_INTERVAL = 250;
const TIME_GAP = {
    MIN: 250,
    MAX: 300,
};
const DISTANCE_GAP = {
    MIN: 10,
    MAX: 10,
};
const SWIPE_ANGLE = 15;
const SWIPE_ANGLE_TAN = Math.tan(SWIPE_ANGLE * Math.PI / 180);

function createSsEvent(type, startX, startY, startTime, endX, endY, endTime) {
    return {
        type,
        startX,
        startY,
        startTime,
        endX,
        endY,
        endTime
    };
}

// single finger with one pointerDown/pointerUp
// Single finger Simple gesture
const SS = {
    TAP: 'tap',
    PRESS: 'press',
    SWIPE: 'swipe',
    DRAG: 'drag',
};

const SWIPE_DIRECTION = {
    UNKNOWN: 'unknown',
    LEFT: 'swipeleft',
    RIGHT: 'swiperight',
};

function getDirectionFromSsEvent(ssEvent) {
    const deltaX = ssEvent.endX - ssEvent.startX;
    const deltaY = ssEvent.endY - ssEvent.startY;

    if (Math.abs(deltaY/deltaX) <= SWIPE_ANGLE_TAN) {
        if (deltaX > 0) {
            return SWIPE_DIRECTION.RIGHT;
        } else if (deltaX < 0) {
            return SWIPE_DIRECTION.LEFT;
        } else {
            return SWIPE_DIRECTION.UNKNOWN;
        }
    } else {
        return SWIPE_DIRECTION.UNKNOWN;
    }
}

/**
 * First phase:
 * Only handle following single finger events:
 * - tap
 * - press
 * - drag
 */
class Gesture {
    constructor(handlers) {
        this.ssQueue = [];
        this.inProgress = null;
        this.startTime = null;
        this.startX = null;
        this.startY = null;

        this.onPress = handlers.onPress;
        this.onTap = handlers.onTap;
        this.onDoubleTap = handlers.onDoubleTap;
        this.onSwipe = handlers.onSwipe;
    }

    onEndOfssSequence() {
        if (this.ssQueue.length === 0) {
            console.log('Gesture#onEndOfssSequence nothing happens');
            return;
        }

        const ssQueue = this.ssQueue;
        this.inProgress = null;
        this.ssQueue = [];
        if (ssQueue.length === 1) {
            const ss = ssQueue[0];
            switch(ss.type) {
                case SS.PRESS:
                if (this.onPress) {
                    this.onPress(ss);
                }
                break;
                case SS.TAP:
                if (this.onTap) {
                    this.onTap(ss);
                }
                break;
                case SS.SWIPE:
                if (this.onSwipe) {
                    const direction = getDirectionFromSsEvent(ss);
                    this.onSwipe(direction);
                }
                break;
                default:
                console.log('Gesture#onEndOfssSequence do not know how to handle %o', ss);
            }
        } else if (ssQueue.length === 2) {
            if (this.onDoubleTap && ssQueue[0].type === SS.TAP && ssQueue[1].type === SS.TAP) {
                this.onDoubleTap(ssQueue[1]);
            }
        }
    }

    onPointerDown(e) {
        this.startTime = Date.now();
        this.startX = e.clientX;
        this.startY = e.clientY;
        if (this.inProgress) {
            window.clearTimeout(this.inProgress);
        }
        e.preventDefault();
        e.stopPropagation();
    }

    onPointerMove(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    onPointerUp(e) {
        e.preventDefault();
        e.stopPropagation();

        this.inProgress = window.setTimeout(this.onEndOfssSequence.bind(this), EVENT_INTERVAL);
        const endX = e.clientX;
        const endY = e.clientY;
        const endTime = Date.now();
        const distance = Math.pow(e.clientX - this.startX, 2) + Math.pow(e.clientY - this.startY, 2);
        const time = endTime - this.startTime;
        
        if (time <= TIME_GAP.MIN && distance <= DISTANCE_GAP.MIN) {
            this.ssQueue.push(createSsEvent(
                SS.TAP,
                this.startX,
                this.startY,
                this.startTime,
                endX,
                endY,
                endTime
            ));
        } else if (time <= TIME_GAP.MIN && distance > DISTANCE_GAP.MAX) {
            this.ssQueue.push(createSsEvent(
                SS.SWIPE,
                this.startX,
                this.startY,
                this.startTime,
                endX,
                endY,
                endTime
            ));
        } else if (time > TIME_GAP.MAX && distance <= DISTANCE_GAP.MIN) {
            this.ssQueue.push(createSsEvent(
                SS.PRESS,
                this.startX,
                this.startY,
                this.startTime,
                endX,
                endY,
                endTime
            ));
        } else if (time > TIME_GAP.MAX && distance > DISTANCE_GAP.MIN) {
            this.ssQueue.push(createSsEvent(
                SS.DRAG,
                this.startX,
                this.startY,
                this.startTime,
                endX,
                endY,
                endTime
            ));
        }
    }
}

export {SWIPE_DIRECTION};
export default Gesture;
