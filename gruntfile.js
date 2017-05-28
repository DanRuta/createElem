module.exports = function(grunt){
    grunt.initConfig({
        babel: {
            options: {
                presets: ["es2015", "stage-3"]
            },
            dist: {
                files: {
                    "dist/createElem.js": "dev/createElem.js"
                }
            }
        },

        uglify: {
            my_target: {
                files: {
                    "dist/createElem.min.js" : ["dist/createElem.js"]
                }
            }
        },

        watch: {
            scripts: {
                files: ["dev/createElem.js"],
                tasks: ["babel", "minify"]
            }
        }
    });

    grunt.loadNpmTasks("grunt-babel");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask("default", ["watch"]);
    grunt.registerTask("build", ["babel"]);
    grunt.registerTask("minify", ["uglify"]);
}