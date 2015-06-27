/// <reference path="../../typings/tsd.d.ts" />
import fs = require("fs");
import cli = require("commander");
import JSONiq = require("../JSONiq");

var pkg = require("../../../package.json");

cli
.command("run <file>")
.description("Run JSONiq query")
.action(file => {
    var query = new JSONiq(fs.readFileSync(file, "utf-8"));
    query.setFileName(file);
    var it = query.compile();
    it.forEach(item => {
        console.log(item.get());
    }).catch(e => {
        console.error(e.stack);
    });
});

cli
.command("plan <file>")
.description("Print query plan")
.action(file => {
    var query = new JSONiq(fs.readFileSync(file, "utf-8"));
    query.setFileName(file);
    var it = query.compile();
    console.log(JSONiq.serialize(it));
});

cli
.command("ast <file>")
.description("Print query plan")
.action(file => {
    var query = new JSONiq(fs.readFileSync(file, "utf-8"));
    query.setFileName(file);
    console.log(query.parse().toXML());
});

cli.version(pkg.version);

cli.parse(process.argv);
if (!cli.args.length) {
    cli.help();
}
