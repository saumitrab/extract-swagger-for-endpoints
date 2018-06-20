'use strict';

const extractEndpoints = require('../lib/extract-endpoints');

function listEndpoints(sourceDoc) {
  return Object.keys(sourceDoc.paths);
}

function extractSwagger(sourceDoc, endpoints) {
  const destDoc = sourceDoc;
  const { limitPaths, limitDefinitions } = extractEndpoints(
    sourceDoc,
    endpoints
  );
  destDoc.paths = limitPaths;
  destDoc.definitions = limitDefinitions;
  return destDoc;
}

module.exports = { extractSwagger, listEndpoints };
