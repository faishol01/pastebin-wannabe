#!/usr/bin/env sh

npx db-migrate up -e prod
npm start