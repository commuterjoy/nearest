mocha:
	mocha -R spec
publish:
	npm publish
package:
	browserify nearest.js | uglifyjs > nearest.min.js
	browserify examples/example.js | uglifyjs > examples/example.min.js
