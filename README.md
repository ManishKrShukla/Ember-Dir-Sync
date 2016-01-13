# Dir-sync

This is an ember addon that can be used to synchronize two directories.. Add this addon to your project and provide some simple configurations and you're good to go.

This updates are one-way, that means the updates are always migrated from source to target.

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Configurations

Add this snippet in the config/environment.js file : 

      syncPath: {
          'source-path': 'Complete-path-to-your-source-directory',
          'destination-path': 'Complete-path-to-your-target-directory'
      },
      
For e.g. : 

      var ENV = {
        syncPath: {
            'source-path': '/home/manish/dev/ember - 1/templates',
            'destination-path': '/home/manish/dev/ember - 2/app/templates'
        },

The execution will be done in the following manner : 

* If the file doesn't exists, it will create. This includes all the parent directories as well.
* If the file exists at the target as well, the content of both the files will be compared and if updates encountered, the source file will be copied to the target location.


## Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
