'use strict';

var ObjectField = require('../../src/fields/object');
var should = require('should');

//
// TODO:
// Add tests for inline type fields
//

describe('ObjectField', function() {
    var field;
    var test;
    var arr = ['a','b','c'],
        obj = {'a':1, 'b':2};

    it('should construct', function(done) {
        field = new ObjectField();

        field.should.have.property('get');
        field.should.have.property('set');
        field.should.have.property('options');
        field.should.have.property('_value');

        done();
    });

    describe('#_', function() {
        beforeEach(function() {
            field = new ObjectField();
            field.set(obj);
        })

        it('should exist', function(done) {
            field.should.have.property('_');
            done();
        });

        it('should give access to value', function(done) {
            field._.should.match(obj);
            done();
        });

        it('should be settable', function(done) {
            field._ = arr;
            field._.should.match(arr);
            done();
        });
    });

    describe('#set', function() {
        beforeEach(function() {
            field = new ObjectField();
        })

        it('should throw when not an object or an array', function(done) {
            field.set.bind(field, null).should.throw();
            field.set.bind(field, undefined).should.throw();
            field.set.bind(field, 'string').should.throw();
            field.set.bind(field, 1234).should.throw();
            done();
        });

        it('should set from arrays', function(done) {
            field.set.bind(field, arr).should.not.throw();
            field._value.should.match(arr);
            done();
        });

        it('should set from objects', function(done) {
            field.set.bind(field, obj).should.not.throw();
            field._value.should.match(obj);
            done();
        });

        it('should set `isArray` value', function(done) {
            field.set(obj);
            field.options.isArray.should.be.false;

            field.set(arr);
            field.options.isArray.should.be.true;

            done();
        });

    });

    describe('#getValue', function() {
        beforeEach(function() {
            field = new ObjectField();
        })

        it('should return an empty object by default', function(done) {
            field.getValue().should.match({});
            done();
        });

        it ('should return a representation of the given object', function(done) {
            var value;

            field.set(obj);
            value = field.getValue();
            value.should.match(obj);
            value.should.be.an.Object;

            field.set(arr);
            value = field.getValue();
            value.should.match(arr);
            value.should.be.an.Array;

            done();
        });
    });

});
