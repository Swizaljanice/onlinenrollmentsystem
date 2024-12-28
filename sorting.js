// Sort courses by popularity
exports.sortCoursesByPopularity = (courses) => {
    return courses.sort((a, b) => b.popularity - a.popularity);
  };
  