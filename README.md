# About

A sample nodeJS project that uses a C++ addon which inteprets and runs an embedded Python module. The main.js file, on every HTTP request, will generate two random numbers and pass them to the Python module through the addon. The python module will multiply the random numbers and return the results for main.js to return as a response.


# Prerequisites

- C++ compiler
- Python 3.x
- nodeJS
- npm

- [CMake](https://cmake.org/download/)

## Installation

CMake is needed to build the addon. After installation of CMake, the environment variable for CMake should be set

`PATH = installedfolder\CMake\bin`

`cmake = installedfolder\CMake\bin\cmake.exe`

This is to ensure cmake-js can find and access it.

Run the installation script, `build.sh`, while in the root directory. The module will be built and installed with the necessary dependencies.

## Usage

The addon can be tested through the `testing.sh` script to ensure its functionality is working properly.

Run the `execute.sh` script to start up the nodeJS server. Alternatively, run `execute_cluster.sh` to run the server in cluster mode.

The nodeJS server will multiply two integers from the query part of the URL in the following format below. Replace the placeholders in the angle brackets with the chosen numbers. 

`http://localhost:8080/py/mult.py?x=<your_number>&y=<your_number>`

Sample input

`http://localhost:8080/py/mult.py?x=5&y=25`

The multiplication output will then be outputted after entering the above URL.

Run `load_test.sh` on another console window to initiate a sustained load test on the server.

## Sample Output

On a browser that is accessing the server, the browser will receive the following output from the sample input

`Result:125`

On the CLI window running the script, the output will be shown in the following format

`Inputs received. Result is: 125`
