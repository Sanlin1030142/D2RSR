cd ~
apt install apache2
ufw app list
ufw allow in "Apache Full"
apt-get install ros-melodic-rosbridge-server
rm -rf /var/www
cd /var
ln -s ~/D2RSR/D2RSR_panel www