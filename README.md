# js-interview-exercise
:bicyclist: JavaScript exercise for Sleep Number interviewees

## Instructions
Convert an array of `Person` objects into a tree of `PersonTreeNode` objects.

### Set-up

1. Clone the repository
2. Open `index.html` in your browser
3. Open `js/Person.js`, `js/PersonTreeNode.js`, and `js/answer.js` in your favorite editor
4. Add your code to the `generateTree` function in `answer.js`

### Solving the Problem

* The exercise uses two JavaScript classes: `Pesron` and `PersonTreeNode`
* The `generateTree` function receives an array of `Person` objects and should return the root `PersonTreeNode` (CEO)
* Each `PersonTreeNode`'s `directReports` array should contain a `PersonTreeNode` for each direct report of that person
* The app will use your `generateTree` function to evaluate the test
* Refresh the page or click the button to re-run the test
