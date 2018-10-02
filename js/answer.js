
/**
 * Given an array of Person objects, returns the root PersonTreeNode (the CEO).
 * @param {Person[]} employees - An array of Person objects representing all the employees of the company.
 * @returns {PersonTreeNode} The CEO of the organization.
 */
function generateTree(employees) {

  /**
   * @ignore
   * INSTRUCTIONS:
   * 1. ONLY edit this function and nothing else!.
   *
   * 2. Analyze the Person.js and PersonTreeNode.js files.
   *
   * 3. Parse the `employees` array and create a single PersonTreeNode
   *    object representing the CEO (the Person with no `manager`).
   *    All PersonTreeNode object's `directReports` arrays should contain
   *    PersonTreeNode's for their direct reports...creating a tree.
   *
   * 4. Refresh or click the 'Retry Test' button to rerun the test.
   *
   *  Feel free to create any additional functions in this file as needed.
   */

  var ceo = null; // Should be a PersonTreeNode object at the end;

  // YOUR CODE STARTS HERE

  var treeNodes = employees.map(employee => PersonTreeNode(employee))

  treeNodes.forEach(node => {
 
    for (let i = 0; i < treeNodes.length; i++){

      if (treeNodes[i].person.manager === null){
        ceo = treeNodes[i]
      } else if (treeNodes[i].person.manager === node.person){
        node.directReports.push(treeNodes[i])
      }
      
    }

  });

  // YOUR CODE ENDS HERE

  return ceo;
};