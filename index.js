/* jshint node: true */

var moment = require("moment");
var fs = require('fs');
var walk = require('walk');
var dircompare = require('dir-compare');
var utils = require('util');
var fsExtra = require('fs-extra');

function endsWith(source, search) {
  return source.indexOf(search, source.length - search.length) !== -1;
}

/*jshint node:true*/
module.exports = {
  name: 'dir-sync',

  isDevelopingAddon: function() {
    return true;
  },
  config: function(env, baseConfig) {
    this.configurations = baseConfig;
  },
  preBuild: function(result) {

    if (this.configurations.syncPath['source-path'] && this.configurations.syncPath['destination-path']) {
      var source = this.configurations.syncPath['source-path'];
      var dest = this.configurations.syncPath['destination-path'];


      var destStats = fs.statSync(this.configurations.syncPath['destination-path']);

      var timeDiff = moment(destStats.mtime).diff(moment(), 'seconds');

      if (timeDiff > 0) {
        var files = [];

        var walker = walk.walk(source, {
          followLinks: false
        });

        walker.on('file', function(root, stat, next) {
          if (endsWith(stat.name, pattern)) {
            files.push(root + '/' + stat.name);
          }
          next();
        });

        walker.on('end', function() {
          console.log("Updates from Dir-Sync");
          console.log("===========================================================================================================================");

          if (pattern === '') {
            console.log("There's no pattern defined for filtering files. All the file types will be synchronized");
          } else {
            console.log("Only files which follow the pattern " + pattern + " will be synchronized.");
          }

          var index = 0;

          for (; index < files.length; index++) {
            var srcFile = files[index];
            var destFile = srcFile.replace(source, dest);
            var exists = true;

            try {

              try {
                fs.statSync(destFile)
              } catch (err) {
                exists = false;
              }

              if (!exists) {
                console.info('The source file : ' + srcFile + ' doesnt exists at the target and hence has been copied');
                fsExtra.copySync(srcFile, destFile);
              } else {
                var sourceContent = fs.readFileSync(srcFile, 'utf-8');
                var targetContent = fs.readFileSync(destFile, 'utf-8');

                if (sourceContent != targetContent) {
                  console.info('The source file : ' + srcFile + ' has been updated and is over-riding the content on the target file : ' + destFile);

                  fsExtra.copySync(srcFile, destFile, {
                    clobber: true
                  });
                }
              }

            } catch (e) {
              index--;
            }

          }

          console.log("===========================================================================================================================");
        });
      }

    }

    // if (this.configurations.syncPath['source-path'] && this.configurations.syncPath['destination-path']) {
    //     var res = dircompare.compareSync(this.configurations.syncPath['source-path'], this.configurations.syncPath['destination-path'], {
    //         includeFilter: "navbar.hbs"
    //     });
    //
    //     res.diffSet.forEach(function(entry) {
    //         var state = {
    //             'equal': '==',
    //             'left': '->',
    //             'right': '<-',
    //             'distinct': '<>'
    //         }[entry.state];
    //         var name1 = entry.name1 ? entry.name1 : '';
    //         var name2 = entry.name2 ? entry.name2 : '';
    //
    //         // if (state !== '==') {
    //             console.log(utils.format('%s(%s)%s%s(%s)', name1, entry.type1, state, name2, entry.type2));
    //         // }
    //         // console.log(entry);
    //     });

    // fs.copy(this.configurations.syncPath['source-path'], this.configurations.syncPath['destination-path'], {
    //     force: true
    // });

  },

};
