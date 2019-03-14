sudo -u postgres psql -c "CREATE ROLE dev1 WITH LOGIN;"
sudo -u postgres psql -c "CREATE DATABASE dev1;"
sudo -u postgres psql -c "ALTER DATABASE dev1 OWNER TO dev1;"
sudo -u dev1 psql -c "CREATE SCHEMA trash;" dev1

sudo -u postgres psql -c "CREATE ROLE dev2 WITH LOGIN PASSWORD 'test';"
sudo -u postgres psql -c "CREATE DATABASE dev2;"
sudo -u postgres psql -c "ALTER DATABASE dev2 OWNER TO dev2;"
sudo -u postgres psql -c "CREATE SCHEMA trash;" dev2

sudo -u postgres psql -c "GRANT CONNECT ON DATABASE dev1 TO dev2;"
sudo -u postgres psql -c "GRANT USAGE ON SCHEMA trash TO dev2;" dev1
sudo -u postgres psql -c "GRANT SELECT ON ALL TABLES IN SCHEMA public TO dev2;" dev1
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA trash TO dev2;" dev1

sudo -u postgres psql -c "GRANT CONNECT ON DATABASE dev2 TO dev1;"
sudo -u postgres psql -c "GRANT USAGE ON SCHEMA trash TO dev1;" dev2
sudo -u postgres psql -c "GRANT SELECT ON ALL TABLES IN SCHEMA public TO dev1;" dev2
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA trash TO dev1;" dev2
