1. clone repo 
    ```bash
    git clone https://github.com/wilkensonio/soccerms.git
    ```
2. Load the sql file in mysql-workbench and execute it, verify that the database playerdb and the tables were created and have data except for the transfer table (tansfer table should be empty unless a transfer transaction happened). 
    ```bash 
    exec soccermstablequeeries.sql
    ```
    the file above should be execute in mysql workbench using a mysql db server

3. navigate the folders in the project and look for a folder name config inside there is a file name `db.js`  with the configuration below
    ```javascript
    // replace the user and password with your own mysql user and password, keep the quotations

    const mysql = require('mysql2');

    const db = mysql.createConnection({
        host: 'localhost',
        user: '',
        password: '',
        database: 'playerdb'
    });

    db.connect(err => {
        if (err) throw err;
        console.log('MySQL Connected...');
    });

    module.exports = db;
    
    ```

4. Open your terminal or the vscode termninal and navigate to the root of the project. 
    ```bash 
    This command pwd will show your current location
    e.g. /Users/wilkenson/Downloads/player-dashboard
    the command ls will show the content of the folder that you are in
    e.g. /Users/wilkenson/Downloads/player-dashboard

    BookPro:player-dashboard wilkenson$  => ls
    README.md                       node_modules                    package.json                    routes                          server.js
    config                          package-lock.json               public                          server-not-in-use               soccermstablequeries.sql
    BookPro:player-dashboard wilkenson$  => 
    ```
5. From the root folder 
    ```bash 
    run the command npm install, that will istall all the dependencies

    when done run command npm run dev, this will run the program using nodemon to keep track of server changes. 
    ``` 
   

