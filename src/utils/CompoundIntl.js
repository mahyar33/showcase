const fs = require('fs');
const globSync = require('glob');
const mkdirpSync = require('mkdirp');



const MESSAGES_PATTERN = {  en:'./src/**/en.json',fa:'./src/**/fa.json'};
const LANG_DIR         = './src/assets/translations/';

// Aggregates the default messages that were extracted from the example app's
// React components via the React Intl Babel plugin. An error will be thrown if
// there are messages in different components that use the same `id`. The result
// is a flat collection of `id: message` pairs for the app's default locale.
Object.keys(MESSAGES_PATTERN).map(function(key, index)  {
    let defaultMessages = globSync.sync(MESSAGES_PATTERN[key])
        .map((filename) => fs.readFileSync(filename, 'utf8'))
        .map((file) => JSON.parse(file))
        .reduce((collection, descriptors) => {
            descriptors.forEach(({id, defaultMessage}) => {
                if (collection.hasOwnProperty(id)) {
                    throw new Error(`Duplicate message id: ${id}`);
                }

                collection[id] = defaultMessage;
            });

            return collection;
        }, {});


    mkdirpSync.sync(LANG_DIR);
    fs.writeFileSync(LANG_DIR +'main-'+ key+'.json', JSON.stringify(defaultMessages, null, 2));
    console.log('<---- Translation file merged --->');
})