#!/bin/bash

rm -rf example/dist
cp -rf dist example/dist

rm -rf docs/example
cp -rf example docs/example

rm docs/cover.png
cp cover.png docs/cover.png