(function () {
  function r(e, n, t) {
    function o(i, f) {
      if (!n[i]) {
        if (!e[i]) {
          var c = "function" == typeof require && require;
          if (!f && c) return c(i, !0);
          if (u) return u(i, !0);
          var a = new Error("Cannot find module '" + i + "'");
          throw ((a.code = "MODULE_NOT_FOUND"), a);
        }
        var p = (n[i] = { exports: {} });
        e[i][0].call(
          p.exports,
          function (r) {
            var n = e[i][1][r];
            return o(n || r);
          },
          p,
          p.exports,
          r,
          e,
          n,
          t
        );
      }
      return n[i].exports;
    }
    for (
      var u = "function" == typeof require && require, i = 0;
      i < t.length;
      i++
    )
      o(t[i]);
    return o;
  }
  return r;
})()(
  {
    1: [
      function (require, module, exports) {
        "use strict";
        {
          class AppDataHandler {
            constructor() {
              this.appDataPath = this.getAppDataPath();
            }
            getAppDataPath() {
              const path = require("path");
              const platform = process.platform;
              let appDataPath;
              switch (platform) {
                case "win32":
                  appDataPath = process.env.APPDATA;
                  break;
                case "darwin":
                  appDataPath = path.join(
                    process.env.HOME,
                    "Library",
                    "Application Support"
                  );
                  break;
                case "linux":
                  appDataPath =
                    process.env.XDG_CONFIG_HOME ||
                    path.join(process.env.HOME, ".config");
                  break;
                default:
                  throw new Error(`Unsupported platform: ${platform}`);
              }
              return appDataPath;
            }
            getFolderPath(folderName) {
              const path = require("path");
              return path.join(this.appDataPath, folderName);
            }
            async saveObjToFile(filePath, data) {
              const fs = require("fs");
              const path = require("path");
              const JSONStream = require("jsonstream");
              const folderPath = path.dirname(filePath);
              await fs.promises.mkdir(folderPath, { recursive: true });
              await new Promise((resolve, reject) => {
                const writeStream = fs.createWriteStream(filePath);
                const stringifyStream = JSONStream.stringify();
                stringifyStream.pipe(writeStream);
                stringifyStream.write(data);
                stringifyStream.end();
                writeStream.on("finish", resolve);
                writeStream.on("error", reject);
              });
              console.log(`File saved successfully to: ${folderPath}`);
            }
            async fileExists(filePath) {
              const fs = require("fs");
              try {
                await fs.promises.access(
                  filePath,
                  fs.constants.F_OK | fs.constants.R_OK
                );
                return true;
              } catch (error) {
                return true;
              }
            }
            async loadObjFromFile(filePath) {
              const fs = require("fs");
              const JSONStream = require("jsonstream");
              try {
                await fs.promises.access(
                  filePath,
                  fs.constants.F_OK | fs.constants.R_OK
                );
                const fileData = await new Promise((resolve, reject) => {
                  const data = [];
                  const readStream = fs.createReadStream(filePath);
                  const parseStream = JSONStream.parse("*");
                  readStream.pipe(parseStream);
                  parseStream.on("data", (chunk) => {
                    data.push(chunk);
                  });
                  parseStream.on("end", () => {
                    resolve(data.length > 1 ? data : data[0]);
                  });
                  parseStream.on("error", reject);
                  readStream.on("error", reject);
                });
                return { success: true, data: fileData };
              } catch (error) {
                if (error.code === "ENOENT") {
                  return { success: false };
                } else {
                  console.error(`Error accessing file: ${error.message}`);
                  return { success: false };
                }
              }
            }
          }

          //<-- DOM_COMPONENT_ID -->
          const HANDLER_CLASS = class extends self.DOMHandler {
            constructor(iRuntime) {
              super(iRuntime, DOM_COMPONENT_ID);
              this.AddRuntimeMessageHandlers([
                [
                  "save-to-file",
                  ([pathMode, path, data]) =>
                    this.SaveToFile(pathMode, path, data),
                ],
                [
                  "load-from-file",
                  ([pathMode, path]) => this.LoadFromFile(pathMode, path),
                ],
              ]);
            }
            MaybeInitAppDataHandler() {
              if (!this.appDataHandler) {
                this.appDataHandler = new AppDataHandler();
              }
            }
            async SaveToFile(pathMode, path, data) {
              this.MaybeInitAppDataHandler();
              const filePath =
                pathMode === 0 ? this.appDataHandler.getFolderPath(path) : path;
              await this.appDataHandler.saveObjToFile(filePath, data);
            }
            async LoadFromFile(pathMode, path) {
              this.MaybeInitAppDataHandler();
              const filePath =
                pathMode === 0 ? this.appDataHandler.getFolderPath(path) : path;
              const data = await this.appDataHandler.loadObjFromFile(filePath);
              return data;
            }
          };
          self.RuntimeInterface.AddDOMHandlerClass(HANDLER_CLASS);
        }
      },
      { fs: undefined, jsonstream: 3, path: undefined },
    ],
    2: [
      function (require, module, exports) {
        var C = {};
        var LEFT_BRACE = (C.LEFT_BRACE = 1);
        var RIGHT_BRACE = (C.RIGHT_BRACE = 2);
        var LEFT_BRACKET = (C.LEFT_BRACKET = 3);
        var RIGHT_BRACKET = (C.RIGHT_BRACKET = 4);
        var COLON = (C.COLON = 5);
        var COMMA = (C.COMMA = 6);
        var TRUE = (C.TRUE = 7);
        var FALSE = (C.FALSE = 8);
        var NULL = (C.NULL = 9);
        var STRING = (C.STRING = 10);
        var NUMBER = (C.NUMBER = 11);
        var START = (C.START = 17);
        var TRUE1 = (C.TRUE1 = 33);
        var TRUE2 = (C.TRUE2 = 34);
        var TRUE3 = (C.TRUE3 = 35);
        var FALSE1 = (C.FALSE1 = 49);
        var FALSE2 = (C.FALSE2 = 50);
        var FALSE3 = (C.FALSE3 = 51);
        var FALSE4 = (C.FALSE4 = 52);
        var NULL1 = (C.NULL1 = 65);
        var NULL2 = (C.NULL2 = 66);
        var NULL3 = (C.NULL3 = 67);
        var NUMBER1 = (C.NUMBER1 = 81);
        var NUMBER2 = (C.NUMBER2 = 82);
        var NUMBER3 = (C.NUMBER3 = 83);
        var NUMBER4 = (C.NUMBER4 = 84);
        var NUMBER5 = (C.NUMBER5 = 85);
        var NUMBER6 = (C.NUMBER6 = 86);
        var NUMBER7 = (C.NUMBER7 = 87);
        var NUMBER8 = (C.NUMBER8 = 88);
        var STRING1 = (C.STRING1 = 97);
        var STRING2 = (C.STRING2 = 98);
        var STRING3 = (C.STRING3 = 99);
        var STRING4 = (C.STRING4 = 100);
        var STRING5 = (C.STRING5 = 101);
        var STRING6 = (C.STRING6 = 102);
        var VALUE = (C.VALUE = 113);
        var KEY = (C.KEY = 114);
        var OBJECT = (C.OBJECT = 129);
        var ARRAY = (C.ARRAY = 130);
        function toknam(code) {
          var keys = Object.keys(C);
          for (var i = 0, l = keys.length; i < l; i++) {
            var key = keys[i];
            if (C[key] === code) {
              return key;
            }
          }
          return code && "0x" + code.toString(16);
        }
        function Parser() {
          this.tState = START;
          this.value = undefined;
          this.string = undefined;
          this.unicode = undefined;
          this.negative = undefined;
          this.magnatude = undefined;
          this.position = undefined;
          this.exponent = undefined;
          this.negativeExponent = undefined;
          this.numberLength = 0;
          this.key = undefined;
          this.mode = undefined;
          this.stack = [];
          this.state = VALUE;
          this.bytes_remaining = 0;
          this.bytes_in_sequence = 0;
          this.temp_buffs = {
            2: new Buffer(2),
            3: new Buffer(3),
            4: new Buffer(4),
          };
          this.offset = -1;
        }
        var proto = Parser.prototype;
        proto.charError = function (buffer, i) {
          this.onError(
            new Error(
              "Unexpected " +
                JSON.stringify(String.fromCharCode(buffer[i])) +
                " at position " +
                i +
                " in state " +
                toknam(this.tState)
            )
          );
        };
        proto.onError = function (err) {
          throw err;
        };
        proto.write = function (buffer) {
          if (typeof buffer === "string") buffer = new Buffer(buffer);
          var n;
          for (var i = 0, l = buffer.length; i < l; i++) {
            if (this.tState === START) {
              n = buffer[i];
              this.offset++;
              if (n === 123) {
                this.onToken(LEFT_BRACE, "{");
              } else if (n === 125) {
                this.onToken(RIGHT_BRACE, "}");
              } else if (n === 91) {
                this.onToken(LEFT_BRACKET, "[");
              } else if (n === 93) {
                this.onToken(RIGHT_BRACKET, "]");
              } else if (n === 58) {
                this.onToken(COLON, ":");
              } else if (n === 44) {
                this.onToken(COMMA, ",");
              } else if (n === 116) {
                this.tState = TRUE1;
              } else if (n === 102) {
                this.tState = FALSE1;
              } else if (n === 110) {
                this.tState = NULL1;
              } else if (n === 34) {
                this.string = "";
                this.tState = STRING1;
              } else if (n === 45) {
                this.negative = true;
                this.tState = NUMBER1;
              } else if (n === 48) {
                this.magnatude = 0;
                this.tState = NUMBER2;
              } else {
                if (n > 48 && n < 64) {
                  this.magnatude = n - 48;
                  this.tState = NUMBER3;
                } else if (n === 32 || n === 9 || n === 10 || n === 13) {
                } else {
                  this.charError(buffer, i);
                }
              }
            } else if (this.tState === STRING1) {
              n = buffer[i];
              if (this.bytes_remaining > 0) {
                for (var j = 0; j < this.bytes_remaining; j++) {
                  this.temp_buffs[this.bytes_in_sequence][
                    this.bytes_in_sequence - this.bytes_remaining + j
                  ] = buffer[j];
                }
                this.string +=
                  this.temp_buffs[this.bytes_in_sequence].toString();
                this.bytes_in_sequence = this.bytes_remaining = 0;
                i = i + j - 1;
              } else if (this.bytes_remaining === 0 && n >= 128) {
                if (n <= 193) {
                  this.onError(
                    new Error(
                      "Invalid UTF-8 character at position " +
                        i +
                        " in state " +
                        toknam(this.tState)
                    )
                  );
                  return;
                }
                if (n >= 194 && n <= 223) this.bytes_in_sequence = 2;
                if (n >= 224 && n <= 239) this.bytes_in_sequence = 3;
                if (n >= 240 && n <= 244) this.bytes_in_sequence = 4;
                if (this.bytes_in_sequence + i > buffer.length) {
                  for (var k = 0; k <= buffer.length - 1 - i; k++) {
                    this.temp_buffs[this.bytes_in_sequence][k] = buffer[i + k];
                  }
                  this.bytes_remaining =
                    i + this.bytes_in_sequence - buffer.length;
                  i = buffer.length - 1;
                } else {
                  this.string += buffer
                    .slice(i, i + this.bytes_in_sequence)
                    .toString();
                  i = i + this.bytes_in_sequence - 1;
                }
              } else if (n === 34) {
                this.tState = START;
                this.onToken(STRING, this.string);
                this.offset += Buffer.byteLength(this.string, "utf8") + 1;
                this.string = undefined;
              } else if (n === 92) {
                this.tState = STRING2;
              } else if (n >= 32) {
                this.string += String.fromCharCode(n);
              } else {
                this.charError(buffer, i);
              }
            } else if (this.tState === STRING2) {
              n = buffer[i];
              if (n === 34) {
                this.string += '"';
                this.tState = STRING1;
              } else if (n === 92) {
                this.string += "\\";
                this.tState = STRING1;
              } else if (n === 47) {
                this.string += "/";
                this.tState = STRING1;
              } else if (n === 98) {
                this.string += "\b";
                this.tState = STRING1;
              } else if (n === 102) {
                this.string += "\f";
                this.tState = STRING1;
              } else if (n === 110) {
                this.string += "\n";
                this.tState = STRING1;
              } else if (n === 114) {
                this.string += "\r";
                this.tState = STRING1;
              } else if (n === 116) {
                this.string += "\t";
                this.tState = STRING1;
              } else if (n === 117) {
                this.unicode = "";
                this.tState = STRING3;
              } else {
                this.charError(buffer, i);
              }
            } else if (
              this.tState === STRING3 ||
              this.tState === STRING4 ||
              this.tState === STRING5 ||
              this.tState === STRING6
            ) {
              n = buffer[i];
              if (
                (n >= 48 && n < 64) ||
                (n > 64 && n <= 70) ||
                (n > 96 && n <= 102)
              ) {
                this.unicode += String.fromCharCode(n);
                if (this.tState++ === STRING6) {
                  this.string += String.fromCharCode(
                    parseInt(this.unicode, 16)
                  );
                  this.unicode = undefined;
                  this.tState = STRING1;
                }
              } else {
                this.charError(buffer, i);
              }
            } else if (this.tState === NUMBER1) {
              n = buffer[i];
              this.numberLength++;
              if (n === 48) {
                this.magnatude = 0;
                this.tState = NUMBER2;
              } else if (n > 48 && n < 64) {
                this.magnatude = n - 48;
                this.tState = NUMBER3;
              } else {
                this.charError(buffer, i);
              }
            } else if (this.tState === NUMBER2) {
              n = buffer[i];
              this.numberLength++;
              if (n === 46) {
                this.position = 0.1;
                this.tState = NUMBER4;
              } else if (n === 101 || n === 69) {
                this.exponent = 0;
                this.tState = NUMBER6;
              } else {
                this.tState = START;
                this.onToken(NUMBER, 0);
                this.offset += this.numberLength - 1;
                this.numberLength = 0;
                this.magnatude = undefined;
                this.negative = undefined;
                i--;
              }
            } else if (this.tState === NUMBER3) {
              n = buffer[i];
              this.numberLength++;
              if (n === 46) {
                this.position = 0.1;
                this.tState = NUMBER4;
              } else if (n === 101 || n === 69) {
                this.exponent = 0;
                this.tState = NUMBER6;
              } else {
                if (n >= 48 && n < 64) {
                  this.magnatude = this.magnatude * 10 + n - 48;
                } else {
                  this.tState = START;
                  if (this.negative) {
                    this.magnatude = -this.magnatude;
                    this.negative = undefined;
                  }
                  this.onToken(NUMBER, this.magnatude);
                  this.offset += this.numberLength - 1;
                  this.numberLength = 0;
                  this.magnatude = undefined;
                  i--;
                }
              }
            } else if (this.tState === NUMBER4) {
              n = buffer[i];
              this.numberLength++;
              if (n >= 48 && n < 64) {
                this.magnatude += this.position * (n - 48);
                this.position /= 10;
                this.tState = NUMBER5;
              } else {
                this.charError(buffer, i);
              }
            } else if (this.tState === NUMBER5) {
              n = buffer[i];
              this.numberLength++;
              if (n >= 48 && n < 64) {
                this.magnatude += this.position * (n - 48);
                this.position /= 10;
              } else if (n === 101 || n === 69) {
                this.exponent = 0;
                this.tState = NUMBER6;
              } else {
                this.tState = START;
                if (this.negative) {
                  this.magnatude = -this.magnatude;
                  this.negative = undefined;
                }
                this.onToken(
                  NUMBER,
                  this.negative ? -this.magnatude : this.magnatude
                );
                this.offset += this.numberLength - 1;
                this.numberLength = 0;
                this.magnatude = undefined;
                this.position = undefined;
                i--;
              }
            } else if (this.tState === NUMBER6) {
              n = buffer[i];
              this.numberLength++;
              if (n === 43 || n === 45) {
                if (n === 45) {
                  this.negativeExponent = true;
                }
                this.tState = NUMBER7;
              } else if (n >= 48 && n < 64) {
                this.exponent = this.exponent * 10 + (n - 48);
                this.tState = NUMBER8;
              } else {
                this.charError(buffer, i);
              }
            } else if (this.tState === NUMBER7) {
              n = buffer[i];
              this.numberLength++;
              if (n >= 48 && n < 64) {
                this.exponent = this.exponent * 10 + (n - 48);
                this.tState = NUMBER8;
              } else {
                this.charError(buffer, i);
              }
            } else if (this.tState === NUMBER8) {
              n = buffer[i];
              this.numberLength++;
              if (n >= 48 && n < 64) {
                this.exponent = this.exponent * 10 + (n - 48);
              } else {
                if (this.negativeExponent) {
                  this.exponent = -this.exponent;
                  this.negativeExponent = undefined;
                }
                this.magnatude *= Math.pow(10, this.exponent);
                this.exponent = undefined;
                if (this.negative) {
                  this.magnatude = -this.magnatude;
                  this.negative = undefined;
                }
                this.tState = START;
                this.onToken(NUMBER, this.magnatude);
                this.offset += this.numberLength - 1;
                this.numberLength = 0;
                this.magnatude = undefined;
                i--;
              }
            } else if (this.tState === TRUE1) {
              if (buffer[i] === 114) {
                this.tState = TRUE2;
              } else {
                this.charError(buffer, i);
              }
            } else if (this.tState === TRUE2) {
              if (buffer[i] === 117) {
                this.tState = TRUE3;
              } else {
                this.charError(buffer, i);
              }
            } else if (this.tState === TRUE3) {
              if (buffer[i] === 101) {
                this.tState = START;
                this.onToken(TRUE, true);
                this.offset += 3;
              } else {
                this.charError(buffer, i);
              }
            } else if (this.tState === FALSE1) {
              if (buffer[i] === 97) {
                this.tState = FALSE2;
              } else {
                this.charError(buffer, i);
              }
            } else if (this.tState === FALSE2) {
              if (buffer[i] === 108) {
                this.tState = FALSE3;
              } else {
                this.charError(buffer, i);
              }
            } else if (this.tState === FALSE3) {
              if (buffer[i] === 115) {
                this.tState = FALSE4;
              } else {
                this.charError(buffer, i);
              }
            } else if (this.tState === FALSE4) {
              if (buffer[i] === 101) {
                this.tState = START;
                this.onToken(FALSE, false);
                this.offset += 4;
              } else {
                this.charError(buffer, i);
              }
            } else if (this.tState === NULL1) {
              if (buffer[i] === 117) {
                this.tState = NULL2;
              } else {
                this.charError(buffer, i);
              }
            } else if (this.tState === NULL2) {
              if (buffer[i] === 108) {
                this.tState = NULL3;
              } else {
                this.charError(buffer, i);
              }
            } else if (this.tState === NULL3) {
              if (buffer[i] === 108) {
                this.tState = START;
                this.onToken(NULL, null);
                this.offset += 3;
              } else {
                this.charError(buffer, i);
              }
            }
          }
        };
        proto.onToken = function (token, value) {};
        proto.parseError = function (token, value) {
          this.onError(
            new Error(
              "Unexpected " +
                toknam(token) +
                (value ? "(" + JSON.stringify(value) + ")" : "") +
                " in state " +
                toknam(this.state)
            )
          );
        };
        proto.push = function () {
          this.stack.push({
            value: this.value,
            key: this.key,
            mode: this.mode,
          });
        };
        proto.pop = function () {
          var value = this.value;
          var parent = this.stack.pop();
          this.value = parent.value;
          this.key = parent.key;
          this.mode = parent.mode;
          this.emit(value);
          if (!this.mode) {
            this.state = VALUE;
          }
        };
        proto.emit = function (value) {
          if (this.mode) {
            this.state = COMMA;
          }
          this.onValue(value);
        };
        proto.onValue = function (value) {};
        proto.onToken = function (token, value) {
          if (this.state === VALUE) {
            if (
              token === STRING ||
              token === NUMBER ||
              token === TRUE ||
              token === FALSE ||
              token === NULL
            ) {
              if (this.value) {
                this.value[this.key] = value;
              }
              this.emit(value);
            } else if (token === LEFT_BRACE) {
              this.push();
              if (this.value) {
                this.value = this.value[this.key] = {};
              } else {
                this.value = {};
              }
              this.key = undefined;
              this.state = KEY;
              this.mode = OBJECT;
            } else if (token === LEFT_BRACKET) {
              this.push();
              if (this.value) {
                this.value = this.value[this.key] = [];
              } else {
                this.value = [];
              }
              this.key = 0;
              this.mode = ARRAY;
              this.state = VALUE;
            } else if (token === RIGHT_BRACE) {
              if (this.mode === OBJECT) {
                this.pop();
              } else {
                this.parseError(token, value);
              }
            } else if (token === RIGHT_BRACKET) {
              if (this.mode === ARRAY) {
                this.pop();
              } else {
                this.parseError(token, value);
              }
            } else {
              this.parseError(token, value);
            }
          } else if (this.state === KEY) {
            if (token === STRING) {
              this.key = value;
              this.state = COLON;
            } else if (token === RIGHT_BRACE) {
              this.pop();
            } else {
              this.parseError(token, value);
            }
          } else if (this.state === COLON) {
            if (token === COLON) {
              this.state = VALUE;
            } else {
              this.parseError(token, value);
            }
          } else if (this.state === COMMA) {
            if (token === COMMA) {
              if (this.mode === ARRAY) {
                this.key++;
                this.state = VALUE;
              } else if (this.mode === OBJECT) {
                this.state = KEY;
              }
            } else if (
              (token === RIGHT_BRACKET && this.mode === ARRAY) ||
              (token === RIGHT_BRACE && this.mode === OBJECT)
            ) {
              this.pop();
            } else {
              this.parseError(token, value);
            }
          } else {
            this.parseError(token, value);
          }
        };
        Parser.C = C;
        module.exports = Parser;
      },
      {},
    ],
    3: [
      function (require, module, exports) {
        var Parser = require("jsonparse"),
          through = require("through");
        exports.parse = function (path, map) {
          var parser = new Parser();
          var stream = through(
            function (chunk) {
              if ("string" === typeof chunk) chunk = new Buffer(chunk);
              parser.write(chunk);
            },
            function (data) {
              if (data) stream.write(data);
              stream.queue(null);
            }
          );
          if ("string" === typeof path)
            path = path.split(".").map(function (e) {
              if (e === "*") return true;
              else if (e === "") return { recurse: true };
              else return e;
            });
          var count = 0,
            _key;
          if (!path || !path.length) path = null;
          parser.onValue = function (value) {
            if (!this.root) stream.root = value;
            if (!path) return;
            var i = 0;
            var j = 0;
            while (i < path.length) {
              var key = path[i];
              var c;
              j++;
              if (key && !key.recurse) {
                c = j === this.stack.length ? this : this.stack[j];
                if (!c) return;
                if (!check(key, c.key)) return;
                i++;
              } else {
                i++;
                var nextKey = path[i];
                if (!nextKey) return;
                while (true) {
                  c = j === this.stack.length ? this : this.stack[j];
                  if (!c) return;
                  if (check(nextKey, c.key)) {
                    i++;
                    this.stack[j].value = null;
                    break;
                  }
                  j++;
                }
              }
            }
            if (j !== this.stack.length) return;
            count++;
            var actualPath = this.stack
              .slice(1)
              .map(function (element) {
                return element.key;
              })
              .concat([this.key]);
            var data = this.value[this.key];
            if (null != data)
              if (null != (data = map ? map(data, actualPath) : data))
                stream.queue(data);
            delete this.value[this.key];
            for (var k in this.stack) this.stack[k].value = null;
          };
          parser._onToken = parser.onToken;
          parser.onToken = function (token, value) {
            parser._onToken(token, value);
            if (this.stack.length === 0) {
              if (stream.root) {
                if (!path) stream.queue(stream.root);
                count = 0;
                stream.root = null;
              }
            }
          };
          parser.onError = function (err) {
            if (err.message.indexOf("at position") > -1)
              err.message = "Invalid JSON (" + err.message + ")";
            stream.emit("error", err);
          };
          return stream;
        };
        function check(x, y) {
          if ("string" === typeof x) return y == x;
          else if (x && "function" === typeof x.exec) return x.exec(y);
          else if ("boolean" === typeof x) return x;
          else if ("function" === typeof x) return x(y);
          return false;
        }
        exports.stringify = function (op, sep, cl, indent) {
          indent = indent || 0;
          if (op === false) {
            op = "";
            sep = "\n";
            cl = "";
          } else if (op == null) {
            op = "[\n";
            sep = "\n,\n";
            cl = "\n]\n";
          }
          var stream,
            first = true,
            anyData = false;
          stream = through(
            function (data) {
              anyData = true;
              var json = JSON.stringify(data, null, indent);
              if (first) {
                first = false;
                stream.queue(op + json);
              } else stream.queue(sep + json);
            },
            function (data) {
              if (!anyData) stream.queue(op);
              stream.queue(cl);
              stream.queue(null);
            }
          );
          return stream;
        };
        exports.stringifyObject = function (op, sep, cl, indent) {
          indent = indent || 0;
          if (op === false) {
            op = "";
            sep = "\n";
            cl = "";
          } else if (op == null) {
            op = "{\n";
            sep = "\n,\n";
            cl = "\n}\n";
          }
          var first = true,
            anyData = false;
          stream = through(
            function (data) {
              anyData = true;
              var json =
                JSON.stringify(data[0]) +
                ":" +
                JSON.stringify(data[1], null, indent);
              if (first) {
                first = false;
                this.queue(op + json);
              } else this.queue(sep + json);
            },
            function (data) {
              if (!anyData) this.queue(op);
              this.queue(cl);
              this.queue(null);
            }
          );
          return stream;
        };
        if (!module.parent && process.title !== "browser") {
          process.stdin
            .pipe(exports.parse(process.argv[2]))
            .pipe(exports.stringify("[", ",\n", "]\n", 2))
            .pipe(process.stdout);
        }
      },
      { jsonparse: 2, through: 4 },
    ],
    4: [
      function (require, module, exports) {
        var Stream = require("stream");
        exports = module.exports = through;
        through.through = through;
        function through(write, end, opts) {
          write =
            write ||
            function (data) {
              this.queue(data);
            };
          end =
            end ||
            function () {
              this.queue(null);
            };
          var ended = false,
            destroyed = false,
            buffer = [],
            _ended = false;
          var stream = new Stream();
          stream.readable = stream.writable = true;
          stream.paused = false;
          stream.autoDestroy = !(opts && opts.autoDestroy === false);
          stream.write = function (data) {
            write.call(this, data);
            return !stream.paused;
          };
          function drain() {
            while (buffer.length && !stream.paused) {
              var data = buffer.shift();
              if (null === data) return stream.emit("end");
              else stream.emit("data", data);
            }
          }
          stream.queue = stream.push = function (data) {
            if (_ended) return stream;
            if (data === null) _ended = true;
            buffer.push(data);
            drain();
            return stream;
          };
          stream.on("end", function () {
            stream.readable = false;
            if (!stream.writable && stream.autoDestroy)
              process.nextTick(function () {
                stream.destroy();
              });
          });
          function _end() {
            stream.writable = false;
            end.call(stream);
            if (!stream.readable && stream.autoDestroy) stream.destroy();
          }
          stream.end = function (data) {
            if (ended) return;
            ended = true;
            if (arguments.length) stream.write(data);
            _end();
            return stream;
          };
          stream.destroy = function () {
            if (destroyed) return;
            destroyed = true;
            ended = true;
            buffer.length = 0;
            stream.writable = stream.readable = false;
            stream.emit("close");
            return stream;
          };
          stream.pause = function () {
            if (stream.paused) return;
            stream.paused = true;
            return stream;
          };
          stream.resume = function () {
            if (stream.paused) {
              stream.paused = false;
              stream.emit("resume");
            }
            drain();
            if (!stream.paused) stream.emit("drain");
            return stream;
          };
          return stream;
        }
      },
      { stream: undefined },
    ],
  },
  {},
  [1]
);
