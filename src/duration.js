class Duration {
    static zero = new Duration(0, 0, 0);

    h;
    m;
    s;

    constructor(h, m, s) {
        this.h = h;
        this.m = m;
        this.s = s;
    }

    static fromString(str) {
        let [s, m, h] = str.split(':').reverse().map((unit) => Number.parseInt(unit));
        return new Duration(h || 0, m, s);
    }

    add(other) {
        return new Duration(
            (this.h + other.h) + Math.floor((this.m + other.m) / 60),
            (this.m + other.m) % 60,
            (this.s + other.s) % 60,
        );
    }

    toString() {
        let str = '';

        if (this.h != 0) {
            str += `${this.h}:${padLeftWithZeroes(this.m, 2)}:`;
        } else {
            str += `${this.m}:`;
        }

        return str + `${padLeftWithZeroes(this.s, 2)}`;
    }
}

function padLeftWithZeroes(n, width) {
    return n.toString().padStart(width, '0');
}
