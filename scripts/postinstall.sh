#!/bin/sh

if [ -z $CI ] && [ -d .git ]; then
    echo "npm run lint && npm test" > .git/hooks/pre-commit
    chmod +x .git/hooks/pre-commit
fi
