'use strict';

const parseDefinition = ref => {
  return ref.split('/')[2];
};

const getSubDefinitions = definition => {
  const subDefinitions = [];
  for (const property in definition.properties) {
    if (definition.properties[property].$ref) {
      subDefinitions.push(
        parseDefinition(definition.properties[property].$ref)
      );
    }
    if (
      definition.properties[property].items &&
      definition.properties[property].items.$ref
    ) {
      subDefinitions.push(
        parseDefinition(definition.properties[property].items.$ref)
      );
    }
    if (
      definition.properties[property].additionalProperties &&
      definition.properties[property].additionalProperties.$ref
    ) {
      subDefinitions.push(
        parseDefinition(
          definition.properties[property].additionalProperties.$ref
        )
      );
    }
  }
  return subDefinitions;
};

const helper = {
  findDefinitions: (yaml, path) => {
    const requiredDefinitions = [];

    for (const method in yaml.paths[path]) {
      const methodVal = yaml.paths[path][method];

      methodVal.parameters.forEach((paramVal, paramIndex, paramArray) => {
        if (paramVal.schema && paramVal.schema.$ref) {
          requiredDefinitions.push(parseDefinition(paramVal.schema.$ref));
        }
      });

      Object.keys(methodVal.responses).forEach(
        (respVal, respIndex, respArray) => {
          const _schema = methodVal.responses[respVal].schema;
          if (_schema && _schema.items && _schema.items.$ref) {
            requiredDefinitions.push(parseDefinition(_schema.items.$ref));
          }
        }
      );

      for (const resp in methodVal.responses) {
        if (
          methodVal.responses[resp].schema &&
          methodVal.responses[resp].schema.$ref
        ) {
          requiredDefinitions.push(
            parseDefinition(methodVal.responses[resp].schema.$ref)
          );
        }
      }
    }

    // Now we have a list of definitions required in paths section.
    // each definition may depend on additional definitions.
    // We will walk through definitions to find if we need any more definitions
    for (let i = 0; i < requiredDefinitions.length; i++) {
      const subDefinitions = getSubDefinitions(
        yaml.definitions[requiredDefinitions[i]]
      );
      // we could use a Set but the sequence matters for this implementation
      subDefinitions.forEach(v => {
        if (false == requiredDefinitions.includes(v)) {
          requiredDefinitions.push(v);
        }
      });
    }

    return requiredDefinitions;
  },
};

module.exports = helper;
