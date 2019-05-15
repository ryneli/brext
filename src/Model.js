function Size(json) {
    this.width = json.width;
    this.height = json.height;
}

/**
 * [ x']   [  scale_x  shear_x  shift_x  ] [ x ]
 * [ y'] = [  shear_y  scale_y  shift_y  ] [ y ]
 * [ 1 ]   [      0       0         1    ] [ 1 ]
 * @param {*} json 
 */
function Transform(json) {
    this.scaleX = json.scaleX;
    this.scaleY = json.scaleY;
    this.shiftX = json.shiftX;
    this.shiftY = json.shiftY;
}

function Point(json) {
    this.x = json.x;
    this.y = json.y;
    if (json.t) {
        this.t = json.t;
    } else {
        this.t = Date.now();
    }
    this.pressure = json.pressure;
    this.altitude = json.altitude;
    this.azimuth = json.azimuth;
}

function Stroke(json) {
    if (json.id) {
        this.id = json.id;
    } else {
        this.id = `stroke-${Date.now()}`;
    }
    this.points = [];
    for (let i = 0; i < json.points.length; i++) {
        this.points.push(new Point(json.points[i]));
    }
}

function Writing(json) {
    if (json.id) {
        this.id = json.id;
    } else {
        this.id = `writing-${Date.now()}`;
    }
    this.strokes = [];
    for (let i = 0; i < json.strokes.length; i++) {
        this.strokes.push(new Stroke(this.strokes[i]));
    }
}

function Page(json) {
    if (json.id) {
        this.id = json.id;
    } else {
        this.id = `page-${Date.now()}`;
    }
    this.size = new Size(json.size);
    this.transform = new Transform(json.transform);
    this.type = json.type;
    this.contentUrl = json.contentUrl;
    this.pageNumber = json.pageNumber;
    if (json.writing) {
        this.writing = new Writing(json.writing);
    }
    this.cachedImg = json.cachedImg;
}

function Viewport(json) {
    this.transform = new Transform(json.transform);
    this.size = new Size(json.size);
}

function Board(json) {
    if (json.id) {
        this.id = json.id;
    } else {
        this.id = `board-${Date.now()}`;
    }
    this.viewport = new Viewport(json.viewport);
    if (json.writing) {
        this.writing = new Writing(json.writing);
    }
    if (json.pages) {
        this.pages = [];
        for (let i = 0; i < json.pages.length; i++) {
            this.pages.push(json.pages[i]);
        }
    }
}

export {Point, Stroke, Writing, Page, Board};
