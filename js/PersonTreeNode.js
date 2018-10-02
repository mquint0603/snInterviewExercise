/**
 * Object representing a tree node of Person.
 * Contains the Person and an Array of PersonTreeNodes
 * representing all PersonTreeNode's with Person as their respective manager.
 * @constructor
 * @param {Person} person - The person object for this tree node.
 */
function PersonTreeNode (person) {

  // Just incase they forgot the 'new' keyword.
  var self = this instanceof PersonTreeNode ? this : Object.create(PersonTreeNode.prototype);

  /** @type {Person} - The person object for this tree node. */
  self.person = person;

  /**
   * @type {PersonTreeNode[]} - Array of PersonTreeNode objects of people who report to this person.
   * Note: a 'direct report' is someone who reports directly for you, i.e. you are their manager.
   */
  self.directReports = [];

  return self;
};

/**
 * The string representation of this PersonTreeNode.
 * @returns {String}
 */
PersonTreeNode.prototype.toString = function () {
  return 'PersonTreeNode [person=' + this.person + ', directReports=' + this.directReports + ']';
};
