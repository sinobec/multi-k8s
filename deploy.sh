docker build -t fourt/multi-client:latest -t fourt/multi-client:$GIT_SHA -f ./client/Dockerfile ./client
docker build -t fourt/multi-server:latest -t fourt/multi-server:$GIT_SHA -f ./server/Dockerfile ./server
docker build -t fourt/multi-worker:latest -t fourt/multi-worker:$GIT_SHA -f ./worker/Dockerfile ./worker

docker push fourt/multi-client:latest
docker push fourt/multi-server:latest
docker push fourt/multi-worker:latest

docker push fourt/multi-client:$GIT_SHA
docker push fourt/multi-server:$GIT_SHA
docker push fourt/multi-worker:$GIT_SHA

kubectl apply -f k8s
kubectl set image deployments/server-deployment server=fourt/multi-server:$GIT_SHA
kubectl set image deployments/client-deployment client=fourt/multi-server:$GIT_SHA
kubectl set image deployments/worker-deployment worker=fourt/multi-server:$GIT_SHA