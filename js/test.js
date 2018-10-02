/**
 * The TEST module.
 * @namespace TEST
 */
TEST = (function () {

  'use strict';

  // The object representing the public API of this module.
  var module = {};

  // PRIVATE API

  /**
   * Creates a uuid and returns an auto-generated 32 character UUID.
   * @private
   * @returns {String} The auto-generated 32 character UUID.
   */
  var _uuid = function () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
    });
  };

  /** @private @type {Person[]} - Array of Persons in this organization. */
  var _employees = [];

  var _kirk = new Person(_uuid(), 'Kirk', null);
  _employees.push(_kirk);

  var _mark = new Person(_uuid(), 'Mark', _kirk);
  _employees.push(_mark);

  var _tom1 = new Person(_uuid(), 'Tom', _mark);
  _employees.push(_tom1);

  var _nick = new Person(_uuid(), 'Nick', _tom1);
  _employees.push(_nick);

  var _ben = new Person(_uuid(), 'Ben', _tom1);
  _employees.push(_ben);

  var _david = new Person(_uuid(), 'David', _ben);
  _employees.push(_david);

  var _stacey = new Person(_uuid(), 'Stacey', _nick);
  _employees.push(_stacey);

  var _corey = new Person(_uuid(), 'Corey', _nick);
  _employees.push(_corey);

  var _tom2 = new Person(_uuid(), 'Tom', _stacey);
  _employees.push(_tom2);

  var _julie = new Person(_uuid(), 'Julie', _stacey);
  _employees.push(_julie);

  /**
   * Converts a PersonTreeNode into a string representing a tree
   * with the node as the root, branching out to all direct reports recursively.
   * @private
   * @param {PersonTreeNode} treeRoot - The node to use as the tree root, should be the CEO.
   * @returns {String} The string representation of the node.
   */
  var _stringifyTree = function (treeRoot) {

    var result = treeRoot.person.name;
    var first = true;

    if (treeRoot.visited) throw 'Person ' + treeRoot.person +  ' reports to more than one person.';
    treeRoot.visited = true;

    if (treeRoot.directReports.length) {

      result += '{';
      treeRoot.directReports
        .slice(0) // Copy it
        .sort(function (o1, o2) { // Sort it
          return o1.person.name.toUpperCase().localeCompare(o2.person.name.toUpperCase());
        })
        .forEach(function (childNode) { // Add each direct report to result
          if (!first) {
            result += ',';
          }
          result += _stringifyTree(childNode);
          first = false;
        });

      result += '}';
    }

    return result;
  };

  /** @private Shuffle an array. */
  var _shuffle = function (array) {

    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  /**
   * Verify that generateTree will produce the root person tree node (the CEO)
   * and that each persons list of direct reports is correct all the way down the tree.
   * @private
   * @param {boolean} [shuffle] - if true, the test will used a shuffled array.
   * @returns {boolean} `true` if the test passed, `false` otherwise.
   */
  var _testGenerateTree = function (shuffle) {

    var employees = _employees.slice(0);
    if (shuffle) _shuffle(employees);

    var expected = 'Kirk{Mark{Tom{Ben{David},Nick{Corey,Stacey{Julie,Tom}}}}}';
    var result = { success: true };

    try {

      var rootNode = generateTree(employees);

      if (typeof rootNode === 'undefined') {
        result.success = false;
        result.message = 'The returned node was `undefined`';

        return result;
      }

      if (rootNode === null) {
        result.success = false;
        result.message = 'The returned node was `null`';

        return result;
      }

      if (rootNode.person.name !== 'Kirk') {
        result.success = false;
        result.message = 'Incorrect ceo, expected: Kirk, actual: '
          + rootNode.person.name;

        return result;
      }

      var actual = _stringifyTree(rootNode);

      if (actual !== expected) {
        result.success = false;
        result.message = 'Incorrect tree, <br>expected: ' + expected + '<br>'
          + 'actual: ' + actual;
      }

    } catch (error) {
      result.success = false;
      result.message = 'Exception occurred generating tree:'
        + '<pre>' + error.stack + '</pre>'
        + 'Check the console for errors. (F12) in most browsers.';
      result.error = error;
    }

    return result;
  };

  // PUBLIC API

  /**
   * Run the test, excuting the 'generateTree' function and
   * showing the pass/fail results on the page.
   * @memberof TEST
   */
  module.run = function () {

    var result = _testGenerateTree();

    if (result.success) {

      for (var i = 0; i < 10; i++) {
        result = _testGenerateTree(true);
        if (!result.success) break;
      }

      if (result.success) {
        $('#test-results').html('Test Passed!').css({ color: 'green' });
        return;
      }
    }

    $('#test-results').html('Test Failed:<br>' + result.message).css({ color: 'red' });
    if (result.error) throw result.error;
  };

  return module;

})();

// Run test on page load.
$(function () { TEST.run(); });
