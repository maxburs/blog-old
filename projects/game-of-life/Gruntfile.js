module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),

        sass: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    "game-of-life.css": "src/game-of-life.scss"
                }
            }
        },
        watch: {
            files: ['src/*.js', 'src/*.scss'],
            tasks: ['babel', 'sass']
        },
        babel: {
            options: {
                sourceMap: true
            },
            dist: {
                files: {
                    "game-of-life.js": "src/game-of-life.js"
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-babel');

    grunt.registerTask('default', ['babel', 'sass']);
};