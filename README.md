# Dir-sync

This is an ember addon that can be used to synchronize two directories.. Add this addon to your project and provide some simple configurations and you're good to go.

You can provide the file type, which are to synchronized between the folders. By default, the addon will check for updated files on every 10th build of your app. However, you can change this behavior by simply modifying the build-counter param.

* Please note that once you change the config parameter build-counter, you must restart ember server..
* This updates are one-way, that means the updates are always migrated from source to target.

## Installation

* `npm install` dir-sync
* `ember install` dir-sync

## Configurations

Add this snippet in the config/environment.js file :

      syncPath: {
          'source-path': 'Complete-path-to-your-source-directory',
          'destination-path': 'Complete-path-to-your-target-directory',
          'filter' : 'extension of the file type to be filtered',
          'build-counter' : true
      },

For e.g. :

      var ENV = {
        syncPath: {
            'source-path': '/home/manish/dev/ember - 1/templates',
            'destination-path': '/home/manish/dev/ember - 2/app/templates',
            'filter' : '.css',
            'build-counter' : 50,
        },

The execution will be done in the following manner :

* If the file doesn't exists, it will create. This includes all the parent directories as well.
* If the file exists at the target as well, the content of both the files will be compared and if updates encountered, the source file will be copied to the target location.


## Further Development

This addon was developed for a totally inhouse purpose. However, if you find some feature worth adding in this plugin, raise an issue and i would be more than glad to help..

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
