'use strict';

const definitionHelper = require('./definition-helper');

function extractEndpoints(doc, endpoints) {
  const limitPaths = {};
  const limitDefinitions = {};
  endpoints.forEach((val, index, array) => {
    console.log(`extracting path ${val} ...`);
    limitPaths[val] = doc.paths[val];
    console.log(`extracting definitions for ${val} ...`);
    const requiredPaths = definitionHelper.findDefinitions(doc, val);
    requiredPaths.forEach(v => {
      console.log(`adding definition ${v} ...`);
      limitDefinitions[v] = doc.definitions[v];
    });
  });
  return { limitPaths, limitDefinitions };
}

module.exports = extractEndpoints;
