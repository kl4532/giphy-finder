# upContainer.sh <container-name> <image-name> <repo-name>

docker stop $1
docker rm $1
#docker image prune -a
# image need to be deleted, pull doesnt work
# run docker rmi <imgId>
docker pull $3/$2
docker run -p 8080:80 --name $1 $3/$2
