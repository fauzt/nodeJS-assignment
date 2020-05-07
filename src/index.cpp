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

Napi::Object Init(Napi::Env env, Napi::Object exports) {
    exports.Set(
        Napi::String::New(env,"pyWrapped"),
        Napi::Function::New(env, pyWrapped)
    );

    return exports;
}

NODE_API_MODULE(myaddon, Init)