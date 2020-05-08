#include <napi.h>
#include <string.h>
#include "myAddon.h"

Napi::Number pyWrapped(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();

    int x = info[0].As<Napi::Number>().Int32Value();
    int y = info[1].As<Napi::Number>().Int32Value();
    std::string filepath = (std::string) info[2].ToString();
    Napi::Number returnValue = Napi::Number::New(env, runPy(x, y, filepath));

    return returnValue; 
}

void initPy(const Napi::CallbackInfo& info) {
    initPyInterpreter();
}

void finalisePy(const Napi::CallbackInfo& info) {
    finalisePyInterpreter();
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
    exports.Set(
        Napi::String::New(env,"pyWrapped"),
        Napi::Function::New(env, pyWrapped)
    );
    exports.Set(
        Napi::String::New(env,"initPy"),
        Napi::Function::New(env, initPy)
    );
    exports.Set(
        Napi::String::New(env,"finalisePy"),
        Napi::Function::New(env, finalisePy)
    );

    return exports;
}

NODE_API_MODULE(myaddon, Init)