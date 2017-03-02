import AWS from 'aws-sdk';
import uuidV4 from 'uuid/v4';

AWS.config.update({ region: 'us-west-2' });
const db = new AWS.DynamoDB({ apiVersion: '2012-08-10' });
const dbDocClient = new AWS.DynamoDB.DocumentClient();
const table = 'alert';

/* Get an alert from DynamoDB */
const getUsersAlerts = function getUsersAlerts(username) {
  return new Promise((resolve, reject) => {
    const params = {
      TableName: table,
      IndexName: 'username-index',
      KeyConditionExpression: 'username = :username',
      ExpressionAttributeValues: {
        ':username': username,
      },
    };

    dbDocClient.query(params, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
};

/* Create an alert in DynamoDB */
const createAlert = function createAlert(itemData) {
  return new Promise((resolve, reject) => {
    const data = itemData;
    data.id = uuidV4();

    const params = {
      TableName: table,
      Item: data,
    };

    console.log('Adding a new item...');
    dbDocClient.put(params, (err) => {
      if (err) reject(err);
      resolve('success');
    });
  });
};

export { db, dbDocClient, createAlert, getUsersAlerts };
