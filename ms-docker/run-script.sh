#!/bin/bash
docker network create backend-net
docker network create frontend-net
docker-compose -f docker-compose-rabbit.yml up -d 
docker-compose -f docker-compose-graylog.yml up -d 
docker-compose -f docker-compose-zipin.yml up -d 
docker-compose -f docker-compose-perf.yml up -d
