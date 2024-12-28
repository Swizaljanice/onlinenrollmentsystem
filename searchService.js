// Searching courses using Binary Search Tree (BST)
class SearchService {
    static searchCourse(courses, courseName) {
      let left = 0;
      let right = courses.length - 1;
  
      while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (courses[mid].name === courseName) {
          return courses[mid];
        } else if (courses[mid].name < courseName) {
          left = mid + 1;
        } else {
          right = mid - 1;
        }
      }
      return null;
    }
  }
  
  module.exports = SearchService;
  