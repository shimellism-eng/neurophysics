#!/bin/bash
cd /Users/mamo/neurophysics
export PATH="/opt/homebrew/bin:$PATH"
exec node node_modules/.bin/vite "$@"
