"use strict";

const extractEndpoints = require("../lib/extract-endpoints");
const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");
const assert = require("assertive");

describe("Extract endpoints", function() {
  let doc, resp;
  before(function() {
    try {
      doc = yaml.safeLoad(
        fs.readFileSync(path.join(__dirname, "/fixtures/petstore.yml"), "utf-8")
      );
    } catch (e) {
      throw e;
    }

    resp = extractEndpoints(doc, ["/pet/findByStatus"]);
  });
  it("matches stored schema", function() {
    const expected = yaml.safeLoad(
      fs.readFileSync(
        path.join(__dirname, "./fixtures/petstore-findByStatus.yml"),
        "utf-8"
      )
    );
    assert.deepEqual(expected.paths, resp.limitPaths);
    assert.deepEqual(expected.definitions, resp.limitDefinitions);
  });
});
