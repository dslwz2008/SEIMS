#!/bin/sh

set -e
brew update
# Check if GDAL is already installed
brew list gdal &>/dev/null || brew install gdal
echo "Installing and starting mongodb"
# The follow dependencies will be automatically installed by mongodb
# brew install automake autoconf libtool openssl
brew install mongodb
# install mpich2, be aware, mpich2 got error on macOS!
#brew install mpich2
brew list openmpi &>/dev/null || brew install openmpi
# create a folder for mongodb to prevent an error on mac osx
sudo mkdir -p /data/db
brew services start mongodb
# download mongo-c-driver from github, and compile and install
cd ..
MONGOC_VERSION=1.6.1
wget -q https://github.com/mongodb/mongo-c-driver/releases/download/$MONGOC_VERSION/mongo-c-driver-$MONGOC_VERSION.tar.gz
tar xzf mongo-c-driver-$MONGOC_VERSION.tar.gz
cd mongo-c-driver-$MONGOC_VERSION
export LDFLAGS="-L/usr/local/opt/openssl/lib"
export CPPFLAGS="-I/usr/local/opt/openssl/include"
./configure --disable-automatic-init-and-cleanup
make -j4
sudo make install