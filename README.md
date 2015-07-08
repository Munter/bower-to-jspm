bower-to-jspm
=============
[![NPM version](https://badge.fury.io/js/bower-to-jspm.svg)](http://badge.fury.io/js/bower-to-jspm)
[![Dependency Status](https://david-dm.org/Munter/bower-to-jspm.svg)](https://david-dm.org/Munter/bower-to-jspm)

I needed a tool to help me look up packages for jspm. I had a bower config, now I just needed a quick way to look up where that package exists for jspm.

This tool solves that problem.


Usage
-----

```
npm install -g bower-to-jspm
cd path/to/your/bower/project
bower-to-jspm
```

Now your `bower.json` will be analyzed, the packages will be found on either npm or github and the corresponding result will look something like this:

```
unexpected-sinon
  jspm install npm:unexpected-sinon@5.1.2
  jspm install unexpected-sinon=github:sunesimonsen/unexpected-sinon@5.1.2
unexpected-dom
  jspm install npm:unexpected-dom@0.4.2
  jspm install unexpected-dom=github:Munter/unexpected-dom@0.4.2
react-simpletabs
  jspm install npm:react-simpletabs@0.6.1
  jspm install react-simpletabs=github:pedronauck/react-simpletabs@0.6.1
Keypress
  jspm install Keypress=github:dmauro/Keypress@2.1.0
unexpected
  jspm install npm:unexpected@6.4.0
  jspm install unexpected=github:sunesimonsen/unexpected@6.4.0
unexpected-react
  jspm install npm:unexpected-react@0.2.1
  jspm install unexpected-react=github:podio/unexpected-react@0.2.1
flux
  jspm install npm:flux@2.0.3
  jspm install flux=github:facebook/flux@2.0.2

```

Copy/paste the command line corresponding to the package endpoint you'd like to use.


License
-------
(The MIT License)

Copyright (c) 2015 Peter Müller <munter@fumle.dk>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
