import sqlite3 from 'sqlite3'
const db = new sqlite3.Database('./db.sqlite')

db.serialize (function() {
    db.run('DROP TABLE IF EXISTS Records')
    db.run('CREATE TABLE IF NOT EXISTS `Records` ( ' +
    '`id` TEXT NOT NULL, ' +
    '`event` TEXT ,  ' +
    ' `startTime` TEXT , ' +
    ' `endTime` TEXT , ' +
    ' `calendar` TEXT , ' +
    ' `description` TEXT , ' +
    ' `duration` TEXT , ' +
    ' `weekNum` TEXT , ' +
    ' `monthNum` TEXT , ' +
    // ' `username` TEXT NOT NULL, ' +
    ' PRIMARY KEY (`id`) )' );

    db.run('DROP TABLE IF EXISTS users')
    db.run('CREATE TABLE IF NOT EXISTS `Users` ( ' +
    '`id` INTEGER, ' +
    '`username` TEXT UNIQUE,  ' +
    ' `password` TEXT NOT NULL, ' +
    ' `email` TEXT, ' +
    ' PRIMARY KEY (`id`) )' );
    
    
});
