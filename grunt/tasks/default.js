module.exports = (grunt) => {
    grunt.registerTask('default', [
        'clean',
        'eslint',
        'less',
        'webpack'
    ]);
};
