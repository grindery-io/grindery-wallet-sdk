#!/bin/bash

rm -rf docs/example/dist
cp -rf dist docs/example/dist

rm docs/README.md
cp README.md docs/README.md

rm docs/DEVELOPMENT.md
cp DEVELOPMENT.md docs/DEVELOPMENT.md