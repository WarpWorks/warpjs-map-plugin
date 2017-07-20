class ClickPosition {
    constructor(position) {
        this.setClickPosition(position);
    }

    setClickPosition(position) {
        try {
            if (Number.isInteger(position)) {
                this._columnClickPosition = position;
            } else {
                throw new Error('Position is not an integer');
            }
        } catch (err) {
            throw err;
        }
    };

    getClickPosition() {
        return this._columnClickPosition;
    };

    updateClickPositionByDirection(direction) {
        const currentColumnClickCount = this.getClickPosition();
        direction === "next" ? this.setClickPosition(currentColumnClickCount + 1) : this.setClickPosition(currentColumnClickCount - 1);
    };
}

module.exports = ClickPosition;
