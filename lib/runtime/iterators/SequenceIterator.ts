/// <reference path="../../../typings/tsd.d.ts" />
//import * as _ from "lodash";
import Iterator from "./Iterator";
import Position from "../../compiler/parsers/Position";
import * as SourceMap from "source-map";

export default class SequenceIterator extends Iterator {

    private its: Iterator[];

    constructor(position: Position, its: Iterator[]) {
        super(position);
        this.its = its;
    }

    //
    serialize(): SourceMap.SourceNode {
        var node = new SourceMap.SourceNode(this.position.getStartLine() + 1, this.position.getStartColumn() + 1, this.position.getFileName());
        this.its.reverse().forEach(it => {
            node.add(it.serialize());
        });
        node.add("stack.push(r.SequenceIterator([ " + this.its.map(it => { return "stack.pop()"; }).join(", ") + " ]));\n");
        return node;
    }
}
