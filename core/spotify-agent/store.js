const HandyStorage = require('handy-storage');
 
const storage = new HandyStorage({
    beautify: true
});
 
storage.connect('./.data.json');

module.exports = storage