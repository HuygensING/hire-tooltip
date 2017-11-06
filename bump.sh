#!/usr/bin/env bash

if [ "$1" != "patch" ] && [ "$1" != "minor" ] && [ "$1" != "major" ]; then
	echo "Error. Parameter should be patch | minor | major."
	exit 1
fi

npm version $1 -m "v%s tagged"
npm publish

git push && git push --tags
