module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        
        sass: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    "index.css": "src/index.scss"
                }
            }
        },
        uglify: {
            build: {
                src: 'src/game-of-life.js',
                dest: 'game-of-life.js'
            }
        },
        watch: {
            files: ['src/*.js', 'src/*.scss'],
            tasks: ['uglify', 'sass']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['uglify', 'sass']);
};