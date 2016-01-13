# Dir-sync

This is an ember addon that can be used to synchronize two directories.. Add this addon to your project and provide some simple configurations and you're good to go.

This updates are one-way, that means the updates are always migrated from source to target.

## Installation

* `npm install` dir-sync
* `ember install` dir-sync

## Configurations

Add this snippet in the config/environment.js file :

      syncPath: {
          'source-path': 'Complete-path-to-your-source-directory',
          'destination-path': 'Complete-path-to-your-target-directory',
          'filter' : 'extension of the file type to be filtered'
      },

For e.g. :

      var ENV = {
        syncPath: {
            'source-path': '/home/manish/dev/ember - 1/templates',
            'destination-path': '/home/manish/dev/ember - 2/app/templates',
            'filter' : '.css'
        },

The execution will be done in the following manner :

* If the file doesn't exists, it will create. This includes all the parent directories as well.
* If the file exists at the target as well, the content of both the files will be compared and if updates encountered, the source file will be copied to the target location.


## Further Development

This addon was developed for a totally inhouse purpose. However, if you find some feature worth adding in this plugin, raise an issue and i would be more than glad to help..

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
