const testHelpers = require('@quoin/node-test-helpers');
const expect = testHelpers.expect;

describe('client/map/lib/click-position', () => {
    let click;
    let ClickPosition;
    beforeEach(() => {
        ClickPosition = require('./click-position');

        click = new ClickPosition(0);
    });

    it('should be a function', () => {
        expect(ClickPosition).to.be.a('function');
    });

    it('should get the click position of the instance', () => {
        expect(click.getClickPosition()).to.equal(0);
    });

    it('should set the click position for the instance', () => {
        click.setClickPosition(4);

        expect(click.getClickPosition()).to.equal(4);
    });

    it('should imcrement the click position of the instance', () => {
        click.updateClickPositionByDirection('next');

        expect(click.getClickPosition()).to.equal(1);
    });

    it('should decrement the click position of the instance', () => {
        click.setClickPosition(3);
        click.updateClickPositionByDirection('previous');

        expect(click.getClickPosition()).to.equal(2);
    });

    it('should throw error because a non interger passed into constructor', () => {
        /*eslint-disable*/
        expect(() => {
            new ClickPosition();
        }).to.throw(Error);
        expect(() => {
            new ClickPosition(undefined);
        }).to.throw(Error);
        expect(() => {
            new ClickPosition(null);
        }).to.throw(Error);
        expect(() => {
            new ClickPosition('');
        }).to.throw(Error);
        expect(() => {
            new ClickPosition(false);
        }).to.throw(Error);
        expect(() => {
            new ClickPosition(true);
        }).to.throw(Error);
        expect(() => {
            new ClickPosition([]);
        }).to.throw(Error);
        expect(() => {
            new ClickPosition({});
        }).to.throw(Error);
        expect(() => {
            new ClickPosition(0.5);
        }).to.throw(Error);
        /*eslint-enable*/
    });

    it('should throw error because a non interger passed into the set click position', () => {
        expect(() => {
            click.setClickPosition();
        }).to.throw(Error);
        expect(() => {
            click.setClickPosition(undefined);
        }).to.throw(Error);
        expect(() => {
            click.setClickPosition(null);
        }).to.throw(Error);
        expect(() => {
            click.setClickPosition('');
        }).to.throw(Error);
        expect(() => {
            click.setClickPosition(false);
        }).to.throw(Error);
        expect(() => {
            click.setClickPosition(true);
        }).to.throw(Error);
        expect(() => {
            click.setClickPosition([]);
        }).to.throw(Error);
        expect(() => {
            click.setClickPosition({});
        }).to.throw(Error);
        expect(() => {
            click.setClickPosition(0.5);
        }).to.throw(Error);
    });
});
