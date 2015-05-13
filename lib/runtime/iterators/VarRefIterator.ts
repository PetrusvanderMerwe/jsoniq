/// <reference path="../../../typings/tsd.d.ts" />
import Iterator = require("./Iterator");
import DynamicContext = require("../DynamicContext");
import Position = require("../../compiler/parsers/Position");

import Item = require("../items/Item");

class VarRefIterator extends Iterator {

    private dctx: DynamicContext;
    private varName: string;
    private variable: Iterator;

    constructor(position: Position, dctx: DynamicContext, varName: string) {
        super(position);
        this.dctx = dctx;
        this.varName = varName;
    }

    next(): Promise<Item> {
        if(!this.variable) {
            this.variable = this.dctx.getVariable("", this.varName);
            this.variable.reset();
        }
        return this.variable.next();
    }

    reset(): Iterator {
        this.variable = null;
        return this;
    }
};

export = VarRefIterator;
