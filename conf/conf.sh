#!/bin/bash
parent_path=$( cd "$(dirname "${BASH_SOURCE}")" ; pwd -P )

sqlite3 $parent_path/../dashboard.db < $parent_path/DatabaseInit.sql