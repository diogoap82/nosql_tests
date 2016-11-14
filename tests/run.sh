#!/bin/bash
echo "Starting to run the tests..."

#Changing directory
cd /
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


echo
echo "Done! Exiting..."
echo