#!/bin/bash

service postgresql start
redis-server --daemonize yes
/bin/bash
