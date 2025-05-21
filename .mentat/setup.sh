#!/bin/bash

# Install dependencies for both client and server
# The root package.json has an install script that handles this
npm install
apt-get update
apt-get install -y lsof
apt-get install -y iptables
apt-get install -y socat
