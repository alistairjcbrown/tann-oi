/*
 * Tann-Oi!
 *
 * Provides an interface into a pub/sub engine
 *
 * @author Alistair Brown <github@alistairjcbrown.com>
 */

(function() {
    "use strict";

    var getTannoi, tannoi, noConflict;

    // ---

    getTannoi = function(_) {

        var Tannoi;

        // -----

        Tannoi = function(){
            this._engine = {};
            this.parameter_style = "separate";
        },

        /*
         * tannoi.init
         *
         * @param {object} pub_subs_ource Source pub/sub implementation
         * @return {Object} this
         */
        Tannoi.prototype.init = function(pub_sub_source) {
            var functions_object, functions_list, once_function;

            if (_.isUndefined(pub_sub_source)) {
                throw new Error("No pub-sub source provided");
            }

            functions_list = _.functions(pub_sub_source);

            // Pull all functions from the source
            functions_object = _.reduce(functions_list, function (result, item) {
                result[item] = pub_sub_source[item];
                return result;
            }, {});

            // Create a bare bones pub/sub engine
            this._engine.on      = this._getOnFunction(functions_object);
            this._engine.off     = this._getOffFunction(functions_object);
            this._engine.trigger = this._getTriggerFunction(functions_object);

            // Bail if dont have the bare bones for a pub/sub engine
            if ( ! _.isFunction(this._engine.on) ||
                 ! _.isFunction(this._engine.off) ||
                 ! _.isFunction(this._engine.trigger)) {
                throw new Error("Incompatible pub-sub source provided");
            }

            // -- Feature detection --

            // Check for existing "once" functionality
            once_function = this._getOnceFunction(functions_object);
            if ( ! _.isFunction(once_function)) {
                once_function =  this._createOnceFunction();
            }
            this._engine.once = once_function;

            // Check if engine supports wildcard listeners
            this._detectWildcardEventBinding();

            // Check if engine trigger takes array of parameters
            this._detectEventParameterStyle();

            return this;
        };

        /*
         * tannoi.clear
         *
         * @return {Object} this
         */
        Tannoi.prototype.clear = function() {
            this._engine = {};
            this.parameter_style = "separate";

            return this;
        };

        /*
         * tannoi.on
         *
         * @return {Object} this
         */
        Tannoi.prototype.on = function() {

            // Do your thing

            return this;
        };

        /*
         * tannoi.off
         *
         * @return {Object} this
         */
        Tannoi.prototype.off = function() {

            // Do your thing

            return this;
        };

        /*
         * tannoi.trigger
         *
         * @return {Object} this
         */
        Tannoi.prototype.trigger = function() {

            // Do your thing

            return this;
        };


        // ----------------------------------
        //  Private functions
        // ----------------------------------

        Tannoi.prototype._getFunctionFromList = function(function_list, functions_object) {
            var candidates = _.pick.apply(_, [functions_object].concat(function_list)),
                candidate_functions = _.values(candidates);

            if (candidate_functions.length === 0) {
                return null;
            }

            return candidate_functions[0];
        };

        Tannoi.prototype._getOnFunction = function(functions_object) {
            var needles = [ "on", "bind", "subscribe" ];

            return this._getFunctionFromList(needles, functions_object);
        };

        Tannoi.prototype._getOffFunction = function(functions_object) {
            var needles = [ "off", "unbind", "unsubscribe" ];

            return this._getFunctionFromList(needles, functions_object);
        };

        Tannoi.prototype._getTriggerFunction = function(functions_object) {
            var needles = [ "trigger", "fire", "publish" ];

            return this._getFunctionFromList(needles, functions_object);
        };

        Tannoi.prototype._getOnceFunction = function(functions_object) {
            var needles = [ "once", "one" ];

            return this._getFunctionFromList(needles, functions_object);
        };

        Tannoi.prototype._createOnceFunction = function() {

            // #################
            return function(){};

        };

        Tannoi.prototype._detectWildcardEventBinding = function() {
            var wildcard_stub = function() {
                this.called = true;
            };

            this._engine.on("fd-1:*", wildcard_stub);
            this._engine.trigger("fd-1:123");

            _.defer(_.bind(function() {
                if (wildcard_stub.called !== true) {
                    // Need to build in wildcard support
                    wildcard_stub;
                    // #################################
                }
            }, this));
        };

        Tannoi.prototype._detectEventParameterStyle = function() {
            var parameters_stub = _.bind(function(first, second) {
                if (first === "one" && second === "two") {
                    this.parameter_style = "combined";

                } else if (_.isEqual(first, [ "one", "two" ]) && second === "three") {
                    this.parameter_style = "separate";
                }
            }, this);

            this._engine.on("fd-2:123", parameters_stub);
            this._engine.trigger("fd-2:123", [ "one", "two" ], "three", "four");
        };

        return new Tannoi();
    };


    // --------------------------------------
    //  Expose tann-oi function
    //   according to environment / libs available
    // --------------------------------------

    // NodeJS
    if (typeof module !== "undefined") {
        module.exports = getTannoi( require("underscore") );
    }

    // Browser
    //  - RequireJS
    if (typeof define !== "undefined") {
        define([ "underscore" ], function(_) {
            return getTannoi( _ );
        });
    // - window
    } else if (typeof window !== "undefined") {
        tannoi = getTannoi( window._ );

        // Create noConflict function
        noConflict = (function() {
            var previous_tannoi = window.tannoi;
            return function() {
                if (tannoi === window.tannoi) {
                    window.tannoi = previous_tannoi;
                }

                return tannoi;
            };
        })();

        tannoi.noConflict = noConflict;
        window.tannoi = tannoi;
    }

})();

// End of file