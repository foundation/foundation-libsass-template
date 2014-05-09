module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    assemble: {
      options: {
        flatten: false,
        assets: 'dist/assets/',
        data: ['src/data/*.json'],
      },
      dist: {
        options: {
          partials: ['src/includes/*.html'],
          helpers: ['src/helpers/*.js'],
          layout: 'src/layouts/default.html'
        },
        expand: true,
        cwd: 'src/pages/',
        src: '**/*.html',
        dest: 'dist/'
      }
    },

    sass: {
      options: {
        includePaths: ['bower_components/foundation/scss']
      },
      dist: {
        options: {
          outputStyle: 'expanded'
        },
        files: {
          'dist/assets/css/app.css': 'src/assets/scss/app.scss'
        }        
      }
    },

    copy: {
      dist: {
        files: [
          {expand:true, cwd: 'src/assets/', src: ['**/*','!{scss,js}/**/*'], dest: 'dist/assets/', filter:'isFile'},
          {expand:true, cwd: 'bower_components/modernizr/', src: 'modernizr.js', dest: 'dist/assets/js', filter:'isFile'}
        ]
      }
    },

    uglify: {
      dist: {
        files: {
          'dist/assets/js/all.js': ['bower_components/jquery/dist/jquery.js', 'bower_components/foundation/js/foundation.js', 'src/assets/js/*']
        }
      }
    },

    clean: ['dist/'],

    watch: {
      grunt: { 
        files: ['Gruntfile.js'],
        tasks: ['build'] 
      },

      sass: {
        files: 'src/assets/scss/**/*.scss',
        tasks: ['sass']
      },

      copy: {
        options: {cwd: 'src/assets/'},
        files: ['**/*','!{scss,js}/**/*'],
        tasks: ['copy']
      },

      uglify: {
        options: {cwd: 'src/assets/js'},
        files: ['**/*.js'],
        tasks: ['uglify']
      },

      assemble_all: {
        files: ['src/{includes,layouts}/**/*.html'],
        tasks: ['assemble'],
        options: {livereload:true}
      },

      assemble_pages: {
        files: ['src/pages/**/*.html'],
        tasks: ['newer:assemble'],
        options: {livereload:true}
      }
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-newer');

  grunt.registerTask('build', ['clean','sass','uglify','assemble','copy']);
  grunt.registerTask('default', ['build','watch']);
}