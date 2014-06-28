
// Pull in dependencies when testing on NodeJS
// Dependencies for testing in browser should be added to check-type.test.html
if (typeof module !== "undefined") {
    var chai = require("chai"),
        sinon = require("sinon"),
        sinon_chai = require("sinon-chai"),
        Backbone = require("backbone"),
        tannoi = require("../../tann-oi.min");

    chai.use(sinon_chai);
}

// ---

(function(
    chai,
    sinon,
    Backbone,
    tannoi
) {

    "use strict";

    var expect = chai.expect;

    suite("Tann-Oi!", function() {

        setup(function() {
            this.env = {};
            this.env.sb = sinon.sandbox.create();

            this.env.pub_sub = {
                on: sinon.stub(),
                off: sinon.stub(),
                trigger: sinon.stub()
            };
        });

        teardown(function() {
            this.env.sb.restore();
        });

        test("should exist", function() {
            expect(tannoi).to.be.an("object");
        });

        suite("noConflict()", function() {
            // Browser only tests
            if (typeof window !== "undefined") {

                test("should exist", function() {
                    expect(tannoi.noConflict).to.be.a("function");
                });

                test("should restore previous noConflict value and return tannoi function", function() {
                    var no_conflict_tannoi = tannoi.noConflict();

                    expect(no_conflict_tannoi).to.equal(tannoi);
                    expect(window.tannoi.previous_value).to.be.true;
                });

                test("should only return reference to tannoi function on subsequent calls", function() {
                    var no_conflict_tannoi;
                    window.tannoi = { new_value: true };
                    no_conflict_tannoi = tannoi.noConflict();

                    expect(no_conflict_tannoi).to.equal(tannoi);
                    expect(window.tannoi.new_value).to.be.true;
                });

            } else {

                test("should not exist", function() {
                    expect(tannoi.noConflict).to.be.undefined;
                });

            }
        });

        suite("init()", function() {

            setup(function() {
                // Clear existing functions
                tannoi.clear();
            });


            test("should exist", function() {
                expect(tannoi.init).to.be.a("function");
            });

            test("should throw exception if no pub/sub source provided", function() {
                expect(function() {
                    tannoi.init();
                }).to.throw(Error);
            });

            suite("if pub/sub source is incompatable", function() {

                test("should throw exception if missing on function (or known alias of)", function() {
                    delete this.env.pub_sub.on;
                    expect(function() {
                        tannoi.init(this.env.pub_sub);
                    }).to.throw(Error);
                });

                test("should throw exception if missing off function (or known alias of)", function() {
                    delete this.env.pub_sub.off;
                    expect(function() {
                        tannoi.init(this.env.pub_sub);
                    }).to.throw(Error);
                });

                test("should throw exception if missing trigger function (or known alias of)", function() {
                    delete this.env.pub_sub.trigger;
                    expect(function() {
                        tannoi.init(this.env.pub_sub);
                    }).to.throw(Error);
                });

            });

            suite("if alias function names are used", function() {

                suite("for binding to an event", function() {

                    setup(function() {
                        delete this.env.pub_sub.on;
                    });

                    test("should use the `on` function", function() {
                        this.env.pub_sub.on = sinon.stub();
                        tannoi.init(this.env.pub_sub);

                        expect(tannoi._engine.on).to.equal(this.env.pub_sub.on);
                    });

                    test("should use the `bind` function", function() {
                        this.env.pub_sub.bind = sinon.stub();
                        tannoi.init(this.env.pub_sub);

                        expect(tannoi._engine.on).to.equal(this.env.pub_sub.bind);
                    });

                    test("should use the `subscribe` function", function() {
                        this.env.pub_sub.subscribe = sinon.stub();
                        tannoi.init(this.env.pub_sub);

                        expect(tannoi._engine.on).to.equal(this.env.pub_sub.subscribe);
                    });


                });

                suite("for unbinding from an event", function() {

                    setup(function() {
                        delete this.env.pub_sub.off;
                    });

                    test("should use the `off` function", function() {
                        this.env.pub_sub.off = sinon.stub();
                        tannoi.init(this.env.pub_sub);

                        expect(tannoi._engine.off).to.equal(this.env.pub_sub.off);
                    });

                    test("should use the `unbind` function", function() {
                        this.env.pub_sub.unbind = sinon.stub();
                        tannoi.init(this.env.pub_sub);

                        expect(tannoi._engine.off).to.equal(this.env.pub_sub.unbind);
                    });

                    test("should use the `unsubscribe` function", function() {
                        this.env.pub_sub.unsubscribe = sinon.stub();
                        tannoi.init(this.env.pub_sub);

                        expect(tannoi._engine.off).to.equal(this.env.pub_sub.unsubscribe);
                    });

                });

                suite("for triggering an event", function() {

                    setup(function() {
                        delete this.env.pub_sub.trigger;
                    });

                    test("should use the `trigger` function", function() {
                        this.env.pub_sub.trigger = sinon.stub();
                        tannoi.init(this.env.pub_sub);

                        expect(tannoi._engine.trigger).to.equal(this.env.pub_sub.trigger);
                    });

                    test("should use the `fire` function", function() {
                        this.env.pub_sub.fire = sinon.stub();
                        tannoi.init(this.env.pub_sub);

                        expect(tannoi._engine.trigger).to.equal(this.env.pub_sub.fire);
                    });

                    test("should use the `publish` function", function() {
                        this.env.pub_sub.publish = sinon.stub();
                        tannoi.init(this.env.pub_sub);

                        expect(tannoi._engine.trigger).to.equal(this.env.pub_sub.publish);
                    });

                });

            });

            suite("feature detection for", function() {

                suite("wildcard event listening support", function() {

                    setup(function() {
                        tannoi.init(this.env.pub_sub);
                    });

                    test("should bind on wildcard test event", function () {
                        expect(this.env.pub_sub.on).to.be.called;
                        expect(this.env.pub_sub.on.getCall(0).args[0]).to.equal("fd-1:*");
                    });

                    test("should trigger test event", function () {
                        expect(this.env.pub_sub.trigger).to.be.called;
                        expect(this.env.pub_sub.trigger.getCall(0).args[0]).to.equal("fd-1:123");
                    });

                    test("should use existing wildcard functionality if supported");

                    test("should implement basic wildcard functionality if not supported");

                });

                suite("once firing listener support", function() {

                    test("should use the `one` function", function() {
                        this.env.pub_sub.one = sinon.stub();
                        tannoi.init(this.env.pub_sub);

                        expect(tannoi._engine.once).to.equal(this.env.pub_sub.one);
                    });

                    test("should use the `once` function", function() {
                        this.env.pub_sub.once = sinon.stub();
                        tannoi.init(this.env.pub_sub);

                        expect(tannoi._engine.once).to.equal(this.env.pub_sub.once);
                    });

                    test("should implement basic once functionality if not supported");

                });

            });

        });

        suite("clear()", function() {

            test("should exist", function() {
                expect(tannoi.clear).to.be.a("function");
            });

        });

    });

})(
    chai,
    sinon,
    Backbone,
    tannoi
);

// End of file