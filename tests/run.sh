#!/bin/bash

echo "Starting process..."

cd /home/diogoap82/api/nosql_tests/
echo "Git checkout..."
git checkout .
echo "Git pull..."
git pull

echo "Stoping MongoDB database process..."
sudo service mongod stop
echo "Stoping RethinkDB database process..."
sudo service rethinkdb stop
echo "Stoping Couchbase database process..."
sudo service couchbase-server stop

echo "Starting MongoDB database process..."
sudo service mongod start
echo "Starting RethinkDB database process..."
sudo service rethinkdb start
echo "Starting Couchbase database process..."
sudo service couchbase-server start

echo "Waiting for all databases initialization..."
sleep 5

echo "Configuring node.js"
export HOST="localhost"

echo "Stoping node server.js with forever..."
cd /home/diogoap82/api/nosql_tests/
forever stop server.js
echo "Starting node server.js with forever..."
forever start server.js

echo "Deleting all records at Couchbase..."
curl -X DELETE "http://localhost:3000/api/couchbase/" 
echo "Deleting all records at MongoDB..."
curl -X DELETE "http://localhost:3000/api/mongodb/"
echo "Deleting all records at RethinkDB..."
curl -X DELETE "http://localhost:3000/api/rethinkdb/"

echo "Starting to run the tests..."
dest_dir="/home/diogoap82/api/nosql_tests/tests/"


#POST tests
test_file="requests_post.jmx"
test_result="results_post.jtl"

echo "Running POST tests..."
rm $dest_dir$test_result
/home/diogoap82/apache-jmeter-3.0/bin/./jmeter -n -t $dest_dir$test_file -l $dest_dir$test_result
echo "POST tests fineshed!"


#PATCH tests
test_file="requests_patch.jmx"
test_result="results_patch.jtl"

echo "Running PATCH tests..."
rm $dest_dir$test_result
/home/diogoap82/apache-jmeter-3.0/bin/./jmeter -n -t $dest_dir$test_file -l $dest_dir$test_result
echo "PATCH tests fineshed!"


#GET by ID tests
test_file="requests_get_by_id.jmx"
test_result="results_get_by_id.jtl"

echo "Running GET by ID tests..."
rm $dest_dir$test_result
/home/diogoap82/apache-jmeter-3.0/bin/./jmeter -n -t $dest_dir$test_file -l $dest_dir$test_result
echo "GET by ID tests fineshed!"


#GET tests
test_file="requests_get.jmx"
test_result="results_get.jtl"

echo "Running GET tests..."
rm $dest_dir$test_result
/home/diogoap82/apache-jmeter-3.0/bin/./jmeter -n -t $dest_dir$test_file -l $dest_dir$test_result
echo "GET tests fineshed!"


#DELETE tests
test_file="requests_delete.jmx"
test_result="results_delete.jtl"

echo "Running DELETE tests..."
rm $dest_dir$test_result
/home/diogoap82/apache-jmeter-3.0/bin/./jmeter -n -t $dest_dir$test_file -l $dest_dir$test_result
echo "DELETE tests fineshed!"

echo "Pushing new reports to git..."
git config --global push.default simple
git add .
git commit -m "Auto commit - Test results update"
git push
echo "Pushing done..."

echo
echo "Done! Exiting..."
echo