# About

A sample nodeJS project that uses a C++ addon which inteprets and runs an embedded Python module. The main.js file, on every HTTP request, will generate two random numbers and pass them to the Python module through the addon. The python module will multiply the random numbers and return the results for main.js to return as a response.


# Prerequisites

- Python 3.x
- nodeJS
- npm

Development prerequisites:
- node-gyp

## 

The file explorer is accessible using the button in left corner of the navigation bar. You can create a new file by clicking the **New file** button in the file explorer. You can also create folders by clicking the **New folder** button.

## Installation

Run the installation script, `build.sh`, while in the root directory. The module will be built and installed with the necessary dependencies.

## Usage

The addon can be tested through the `testing.sh` script to ensure its functionality is working properly.

Run the `execute.sh` script to start up the nodeJS server. Alternatively, run `execute_cluster.sh` to run the server in cluster mode.

The multiplication output can be seen by accessing `http://localhost:8080`

Run `load_test.sh` to initiate a sustained load test on the server.
