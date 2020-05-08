{
  "targets": [
    {
      "target_name": "myaddon",
      "cflags!": [ "-fno-exceptions" ],
      "cflags_cc!": [ "-fno-exceptions" ],
      "sources": [
        "./src/myAddon.cpp",
        "./src/index.cpp"
      ],
      "libraries": [],
      "include_dirs": [
        "<!@(node -p \"require('node-addon-api').include\")",
        "<!(python -c \"from sysconfig import get_paths as gp; print(gp()['include'])\")"
      ],
      "dependencies": [
          "<!(node -p \"require('node-addon-api').gyp\")"
        ],
      'defines': [ 'NAPI_DISABLE_CPP_EXCEPTIONS' ],
    }
  ]
}