// Binary Search Tree Node
class TreeNode {
    constructor(course) {
      this.course = course;
      this.left = null;
      this.right = null;
    }
  }
  
  // Build BST from a list of courses
  exports.buildBST = (courses) => {
    const insert = (root, course) => {
      if (!root) return new TreeNode(course);
      if (course.name < root.course.name) root.left = insert(root.left, course);
      else root.right = insert(root.right, course);
      return root;
    };
  
    let root = null;
    courses.forEach((course) => {
      root = insert(root, course);
    });
    return root;
  };
  
  // Search for a course in BST
  exports.searchCourse = (root, name) => {
    if (!root) return null;
    if (root.course.name === name) return root.course;
    if (name < root.course.name) return exports.searchCourse(root.left, name);
    return exports.searchCourse(root.right, name);
  };
  