install:
	npm install

prepublish: 
	npm publish --dry-run

publish:
	npm publish

lint:
	npx eslint .

gendiff:
	npx babel-node src/bin/gendiff -h