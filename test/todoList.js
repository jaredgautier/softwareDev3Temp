"use strict";

const chai = require('chai').assert;
const script = require('../todoList');

describe("TodoList", function ()
{


    it("edit edits the right value", function () {
        script.edit("edited",1);
        chai.equal(script.get(1), "edited");
    });


});