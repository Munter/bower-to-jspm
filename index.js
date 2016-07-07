var bower = require('bower');
var when = require('when');
var semver = require('semver')

var bowerConfig = require(process.cwd() + '/bower.json');
var jspmConfig = require(process.cwd() + '/package.json').jspm;
var chalk = require('chalk');

var npmView;

function findNpmModule(moduleName, version) {
  return npmView([moduleName], true).then(function (result) {

    var meta = result[Object.keys(result)[0]];
    var resolvedVersion = semver.valid(version) || semver.validRange(version);

    if (resolvedVersion) {
      var matchedVersion = semver.maxSatisfying(meta.versions, resolvedVersion);

      if (matchedVersion) {
        return when.resolve('npm:' + moduleName + '@' + matchedVersion);
      } else {
        return when.reject(moduleName);
      }
    } else {
      return when.resolve('npm:' + moduleName);
    }
  });
}

function findGithubModule(moduleName, version) {
  var resolvedVersion = semver.valid(version) || semver.validRange(version);

  var repository;
  var jspmEndpoint;

  if (!resolvedVersion) {
    if (version.indexOf('github') === -1) {
      return when.reject(new Error('Invalid module version: ' + moduleName + '@' + version));
    }

    var endpoint = version.replace(/^.*github\.com[:/]/, 'github:').replace(/\.git/, '').replace('#', '@');
    var label = endpoint.split('/')[1].split('@')[0];

    return when.resolve(label + '=' + endpoint);
  }

  return when.promise(function (resolve, reject) {
    bower.commands.info(moduleName)
      .on('log', function (log) {
        if (log.level === 'action') {
          repository = log.data.resolver.source.replace(/^.*github\.com[:/]/, 'github:').replace(/\.git$/, '');
          jspmEndpoint = log.data.resolver.name + '=' + repository;
        }
      })
      .on('end', function (meta) {
        if (resolvedVersion) {
          var matchedVersion = semver.maxSatisfying(meta.versions, resolvedVersion);

          return resolve(jspmEndpoint + '@' + matchedVersion);
        } else {
          return resolve(jspmEndpoint);
        }
      });
  });
}


require('npm').load(process.cwd() + '/package.json', function (err, npm) {
  npmView = require('when/node').lift(npm.commands.view);

  ['dependencies', 'devDependencies'].forEach(function (key) {

    if (!Array.isArray(bowerConfig[key])) {
        return;
    }

    Object.keys(bowerConfig[key]).filter(function (moduleName) {
      return !(moduleName in jspmConfig[key]);
    }).map(function (moduleName) {
      var version = bowerConfig[key][moduleName];

      return when.settle([findNpmModule(moduleName, version), findGithubModule(moduleName, version)])

        .then(function (results) {
          return results.filter(function (result) {
              return result.state === 'fulfilled';
            })
            .map(function (result) {
              return result.value;
            });
        })
        .then(function (endpoints) {
          console.log(chalk.yellow(moduleName));
          endpoints.forEach(function (endpoint) {
            console.log('  jspm install ' + (key === 'devDependencies' ? '--dev ' : '') + endpoint);
          });
        });
    });
  });
});
