#include <Python.h>
#include <string>
#include <iostream>

int runPy(int x, int y, std::string filepath) {
    std::string attr = "multiply";
    const char* ATTRIBUTE = attr.c_str();
    std::string DEFAULT_DIRECTORY = "py/";
    int numberOfArguments = 2;
    int result = 0;

    PyObject* pName, *pModule, * pFunc;
    PyObject* pArgs, * pValue;

    std::string path;
    size_t idx = filepath.find_last_of('/');
    if (idx == 0 || -1) {   //only specifies file
        path = DEFAULT_DIRECTORY;
    } else {
        std::string path = filepath.substr(0,idx+1);
        if (path.find_first_of('/') == 0) {     //cleanup string input
            path = path.substr(1);
        }
    }
    size_t idx_extension = filepath.find_last_of(".");
    std::string file = filepath.substr(idx+1, idx_extension - idx - 1);

    const char* c_file = file.c_str();
    const char* c_path = path.c_str();

    Py_Initialize();
    PyObject* sys = PyImport_ImportModule("sys");
    PyObject* syspath = PyObject_GetAttrString(sys, "path");
    PyList_Append(syspath, PyUnicode_FromString(c_path));
    PyList_Append(syspath, PyUnicode_FromString("."));
  
    pName = PyUnicode_FromString(c_file);
    pModule = PyImport_Import(pName);
    Py_DECREF(pName);

    if (pModule != NULL) {
        pFunc = PyObject_GetAttrString(pModule, ATTRIBUTE);

        if (pFunc && PyCallable_Check(pFunc)) {
            pArgs = PyTuple_New(numberOfArguments);

            pValue = PyLong_FromLong(x);
            if (!pValue) {
                Py_DECREF(pArgs);
                Py_DECREF(pModule);
                fprintf(stderr, "Cannot convert argument\n");
                return 1;
            }
            PyTuple_SetItem(pArgs, 0, pValue);

            pValue = PyLong_FromLong(y);
            if (!pValue) {
                Py_DECREF(pArgs);
                Py_DECREF(pModule);
                fprintf(stderr, "Cannot convert argument\n");
                return 1;
            }
            PyTuple_SetItem(pArgs, 1, pValue);

            pValue = PyObject_CallObject(pFunc, pArgs);
            Py_DECREF(pArgs);
            if (pValue != NULL) {
                result = PyLong_AsLong(pValue);
                printf("Inputs received. Result is: %i\n", result);
                Py_DECREF(pValue);
            }
            else {
                Py_DECREF(pFunc);
                Py_DECREF(pModule);
                PyErr_Print();
                fprintf(stderr, "Call failed\n");
                return 1;
            }
        }
        else {
            if (PyErr_Occurred()) {
                PyErr_Print();
            }
            fprintf(stderr, "Cannot find function \"%s\"\n", ATTRIBUTE);
        }
        Py_XDECREF(pFunc);
        Py_DECREF(pModule);
    }
    else {
        PyErr_Print();
        fprintf(stderr, "Failed to load \"%s\"\n", c_file);
    }

    Py_Finalize();

    return result;
}