##!/usr/bin/env bash
#!/bin/bash

echo 'start api server'
. ~/venv3/bin/activate
pip install -r requirement.txt
python app.py